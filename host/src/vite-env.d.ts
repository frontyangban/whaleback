/// <reference types="vite/client" />

declare module 'first/App'

interface ImportMetaEnv {
  readonly VITE_APP_REMOTE_FIRST_APP_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
