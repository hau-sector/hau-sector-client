interface ImportMetaEnv {
  API_URL: string
}

interface ImportMeta {
  readonly env: Readonly<ImportMetaEnv>
}
