/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DAPP_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
