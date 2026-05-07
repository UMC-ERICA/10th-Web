interface ImportMetaEnv {
  readonly VITE_SERVER_API_URL: string;
  readonly VITE_ACCESS_TOKEN_REFRESH_LEEWAY_MS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
