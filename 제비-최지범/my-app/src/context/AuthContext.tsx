import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { registerAuthSync } from "../apis/authSync";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import {
  clearGoogleOAuthSessionDedupeKeys,
  getStoredAccessToken,
  getStoredRefreshToken,
} from "../utils/authStorage";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  /** OAuth 등 서버에서 발급한 토큰을 그대로 세션에 반영 */
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  setTokens: () => {},
  logout: () => {},
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

  const setTokens = useCallback(
    (nextAccess: string, nextRefresh: string) => {
      setAccessToken(nextAccess);
      setRefreshToken(nextRefresh);
      setAccessTokenInStorage(nextAccess);
      setRefreshTokenInStorage(nextRefresh);
    },
    [setAccessTokenInStorage, setRefreshTokenInStorage],
  );

  const logout = useCallback(() => {
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
      setTokens,
      logout,
    }),
    [accessToken, refreshToken, setTokens, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
