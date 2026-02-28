export {}
declare global {
  // Env variables
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'testing'
      NEXT_PUBLIC_SERVER_URL: string
      NEXT_PUBLIC_AUTH_TOKEN: string
    }
  }
}