export interface ServerConfig {
  readonly redis?: {
    host: string
    db: number
    port: number
  }
}
