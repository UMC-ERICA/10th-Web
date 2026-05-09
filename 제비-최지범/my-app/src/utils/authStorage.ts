import {
  GOOGLE_OAUTH_SESSION_STORAGE_PREFIX,
  LOCAL_STORAGE_KEY,
} from "../constants/key";

const parseStoredString = (key: string): string | null => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;
    const parsed: unknown = JSON.parse(item);
    if (typeof parsed !== "string" || !parsed.trim()) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const getStoredAccessToken = (): string | null =>
  parseStoredString(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

export const getStoredRefreshToken = (): string | null =>
  parseStoredString(LOCAL_STORAGE_KEY.REFRESH_TOKEN);

export const setStoredAuthTokens = (
  accessToken: string,
  refreshToken: string,
) => {
  localStorage.setItem(
    LOCAL_STORAGE_KEY.ACCESS_TOKEN,
    JSON.stringify(accessToken),
  );
  localStorage.setItem(
    LOCAL_STORAGE_KEY.REFRESH_TOKEN,
    JSON.stringify(refreshToken),
  );
};

export const clearGoogleOAuthSessionDedupeKeys = () => {
  try {
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const key = sessionStorage.key(i);
      if (key?.startsWith(GOOGLE_OAUTH_SESSION_STORAGE_PREFIX)) {
        sessionStorage.removeItem(key);
      }
    }
  } catch {
    /* ignore */
  }
};

export const clearStoredAuthTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  localStorage.removeItem(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
  clearGoogleOAuthSessionDedupeKeys();
};
