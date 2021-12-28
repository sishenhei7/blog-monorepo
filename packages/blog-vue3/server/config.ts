import { ServerConfig } from '~/types/config.server'

const config: ServerConfig = {
  redis: {
    url: 'redis://localhost:6379'
  }
}

export default config
