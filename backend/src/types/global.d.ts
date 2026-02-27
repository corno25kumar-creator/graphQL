export {}
declare global {
  // Env variables
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      // DATABASE
      MONGO_URI: string
      AUTH_TOKEN: string
    }
  }
}