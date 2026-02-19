/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEDDING_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
