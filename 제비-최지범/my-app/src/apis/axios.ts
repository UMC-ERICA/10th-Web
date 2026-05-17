import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { ResponseRefreshDto } from "../types/auth";
import { getAuthSync } from "./authSync";
import {
  clearStoredAuthTokens,
  getStoredAccessToken,
  getStoredRefreshToken,
  setStoredAuthTokens,
} from "../utils/authStorage";
import { shouldRefreshAccessTokenBeforeRequest } from "../utils/jwt";

const baseURL = import.meta.env.VITE_SERVER_API_URL as string;

const ACCESS_TOKEN_REFRESH_LEEWAY_CAP_MS = (() => {
  const v = import.meta.env.VITE_ACCESS_TOKEN_REFRESH_LEEWAY_MS;
  if (v == null || v === "") return 15_000;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 15_000;
})();

const MAX_AUTH_RETRY_AFTER_REFRESH = 1;

export const axiosinstance = axios.create({ baseURL });

const refreshClient = axios.create({ baseURL });

type RetryableRequest = InternalAxiosRequestConfig & {
  _retry?: boolean;

  _authRetryCount?: number;
};

const getAuthorizationHeader = (
  config: InternalAxiosRequestConfig,
): string | undefined => {
  const h = config.headers;
  if (!h) return undefined;
  const raw =
    typeof h.get === "function"
      ? h.get("Authorization")
      : ((h as unknown as Record<string, unknown>).Authorization ??
        (h as unknown as Record<string, unknown>).authorization);
  return typeof raw === "string" && raw.length > 0 ? raw : undefined;
};

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getStoredRefreshToken();
  if (!refreshToken) {
    throw new Error("NO_REFRESH_TOKEN");
  }

  const { data } = await refreshClient.post<ResponseRefreshDto>(
    "/v1/auth/refresh",
    { refresh: refreshToken },
  );

  const { accessToken, refreshToken: nextRefresh } = data.data;
  setStoredAuthTokens(accessToken, nextRefresh);
  getAuthSync()?.onTokensUpdated(accessToken, nextRefresh);
  return accessToken;
};

/** 만료 임밑·만료 시 액세스 토큰 선제 갱신 (응답 401 전에 끊김 줄임) */
const ensureFreshAccessToken = async (): Promise<void> => {
  const token = getStoredAccessToken();
  if (!token) return;

  if (
    !shouldRefreshAccessTokenBeforeRequest(
      token,
      ACCESS_TOKEN_REFRESH_LEEWAY_CAP_MS,
    )
  ) {
    return;
  }

  try {
    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }
    await refreshPromise;
  } catch {
    /* 선제 갱신 실패 시 그대로 전송 → 401이면 응답 인터셉터에서 재시도 */
  }
};

const isPublicAuthPath = (url: string) =>
  url.includes("/auth/signin") ||
  url.includes("/auth/signup") ||
  url.includes("/auth/refresh");

axiosinstance.interceptors.request.use(async (config) => {
  const url = config.url ?? "";
  if (isPublicAuthPath(url)) {
    return config;
  }

  await ensureFreshAccessToken();

  const token = getStoredAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosinstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config as RetryableRequest | undefined;

    if (!originalConfig || !axios.isAxiosError(error)) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (!getAuthorizationHeader(originalConfig)) {
      return Promise.reject(error);
    }

    const url = originalConfig.url ?? "";
    if (isPublicAuthPath(url)) {
      return Promise.reject(error);
    }

    const authRetryCount = originalConfig._authRetryCount ?? 0;
    if (
      originalConfig._retry ||
      authRetryCount >= MAX_AUTH_RETRY_AFTER_REFRESH
    ) {
      return Promise.reject(error);
    }

    originalConfig._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }
      const newAccess = await refreshPromise;

      originalConfig._authRetryCount = authRetryCount + 1;
      originalConfig.headers.Authorization = `Bearer ${newAccess}`;
      return axiosinstance(originalConfig);
    } catch {
      delete originalConfig._retry;
      delete originalConfig._authRetryCount;
      clearStoredAuthTokens();
      getAuthSync()?.onSessionExpired();
      return Promise.reject(error);
    }
  },
);
