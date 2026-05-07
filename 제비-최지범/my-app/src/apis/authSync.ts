export type AuthSyncHandlers = {
  onTokensUpdated: (accessToken: string, refreshToken: string) => void;
  onSessionExpired: () => void;
};

let handlers: AuthSyncHandlers | null = null;

export const registerAuthSync = (next: AuthSyncHandlers) => {
  handlers = next;
  return () => {
    handlers = null;
  };
};

export const getAuthSync = () => handlers;
