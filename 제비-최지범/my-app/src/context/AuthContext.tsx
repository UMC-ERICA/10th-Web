import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { RequestSigninDto } from "../types/auth";
import { registerAuthSync } from "../apis/authSync";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postSignin } from "../apis/auth";
import {
  clearGoogleOAuthSessionDedupeKeys,
  getStoredAccessToken,
  getStoredRefreshToken,
} from "../utils/authStorage";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (signinData: RequestSigninDto) => Promise<void>;
  /** OAuth 등 서버에서 발급한 토큰을 그대로 세션에 반영 */
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  setTokens: () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const {
    setitem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  const {
    setitem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.REFRESH_TOKEN);

  const [accessToken, setAccessToken] = useState<string | null>(() =>
    getStoredAccessToken(),
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(() =>
    getStoredRefreshToken(),
  );

  useEffect(() => {
    return registerAuthSync({
      onTokensUpdated: (access, refresh) => {
        setAccessToken(access);
        setRefreshToken(refresh);
      },
      onSessionExpired: () => {
        setAccessToken(null);
        setRefreshToken(null);
        removeAccessTokenFromStorage();
        removeRefreshTokenFromStorage();
        clearGoogleOAuthSessionDedupeKeys();
      },
    });
  }, [removeAccessTokenFromStorage, removeRefreshTokenFromStorage]);

  const login = useCallback(
    async (signinData: RequestSigninDto) => {
      const res = await postSignin(signinData);
      const { accessToken: nextAccess, refreshToken: nextRefresh } = res.data;
      setAccessToken(nextAccess);
      setRefreshToken(nextRefresh);
      setAccessTokenInStorage(nextAccess);
      setRefreshTokenInStorage(nextRefresh);
    },
    [setAccessTokenInStorage, setRefreshTokenInStorage],
  );

  const setTokens = useCallback(
    (nextAccess: string, nextRefresh: string) => {
      setAccessToken(nextAccess);
      setRefreshToken(nextRefresh);
      setAccessTokenInStorage(nextAccess);
      setRefreshTokenInStorage(nextRefresh);
    },
    [setAccessTokenInStorage, setRefreshTokenInStorage],
  );

  const logout = useCallback(async () => {
    setAccessToken(null);
    setRefreshToken(null);
    removeAccessTokenFromStorage();
    removeRefreshTokenFromStorage();
    clearGoogleOAuthSessionDedupeKeys();
  }, [removeAccessTokenFromStorage, removeRefreshTokenFromStorage]);

  const value = useMemo(
    () => ({
      accessToken,
      refreshToken,
      login,
      setTokens,
      logout,
    }),
    [accessToken, refreshToken, login, setTokens, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
