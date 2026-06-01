/**
 * JWT payload의 exp(ms)를 읽습니다. JWT가 아니거나 exp가 없으면 null.
 * (클라이언트 검증 없음 — 만료 임밑 판단용)
 */
export const getJwtExpiryMs = (accessToken: string): number | null => {
  try {
    const parts = accessToken.split(".");
    if (parts.length < 2) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padLen = (4 - (base64.length % 4)) % 4;
    const padded = base64 + "=".repeat(padLen);
    const payload = JSON.parse(atob(padded)) as { exp?: unknown };
    if (typeof payload.exp !== "number") return null;
    return payload.exp * 1000;
  } catch {
    return null;
  }
};

/**
 * 만료 전에 미리 갱신할지 여부.
 * - 남은 시간이 짧을수록 임계값을 줄여 TTL이 몇 초여도 과도한 선제 갱신을 피함.
 * - leewayCapMs는 상한(기본은 env 또는 15초).
 */
export const shouldRefreshAccessTokenBeforeRequest = (
  accessToken: string,
  leewayCapMs: number,
): boolean => {
  const expMs = getJwtExpiryMs(accessToken);
  if (expMs === null) return false;

  const remaining = expMs - Date.now();
  if (remaining <= 0) return true;

  const adaptive = Math.max(2_000, Math.floor(remaining * 0.35));
  const thresholdMs = Math.min(leewayCapMs, adaptive);
  return remaining <= thresholdMs;
};
