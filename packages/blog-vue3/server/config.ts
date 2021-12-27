import { ServerConfig } from '~/types/config.server'

const config: ServerConfig = {
  redis: {
    host: '127.0.0.1',
    db: 3,
    port: 6379
  }
}

export default config
