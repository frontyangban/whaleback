/// <reference types="vite/client" />

// posts app for blogging
declare module 'posts/App'

interface ImportMetaEnv {
  readonly VITE_APP_REMOTE_FIRST_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
