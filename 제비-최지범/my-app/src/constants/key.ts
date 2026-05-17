export const LOCAL_STORAGE_KEY = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
};

/**
 * Google OAuth 콜백 중복 처리(sessionStorage) 키 접두사.
 * 예전 `google-oauth-${token.slice(0,32)}` 형태까지 로그아웃 시 함께 제거하려고 공통 접두사만 사용합니다.
 */
export const GOOGLE_OAUTH_SESSION_STORAGE_PREFIX = "google-oauth";
