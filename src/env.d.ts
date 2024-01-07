interface ImportMetaEnv {
  VITE_API_URL: string
  VITE_AUTH0_DOMAIN: string
  VITE_AUTH0_CLIENT_ID: string
  VITE_AUTH0_AUDIENCE: string
}

interface ImportMeta {
  readonly env: Readonly<ImportMetaEnv>
}
