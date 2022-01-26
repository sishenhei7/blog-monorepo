import { access, constants } from 'fs'
import merge from 'lodash/merge'
import defaultConfig from './config.default'

const localPath = './config.local.ts'
const env = process.env.NODE_ENV || 'development'
const envConfig = require(`./config.${env}.ts`)

let localConfig
if (env === 'development') {
  access(localPath, constants.F_OK, (err) => {
    if (err) {
      console.error('Config: should provide config.local.ts file')
      process.exit(1)
    } else {
      localConfig = require(localPath)
    }
  })
}

const config = merge(
  defaultConfig,
  envConfig.default,
  localConfig?.default || {}
)

// 把里面的 env 加入到 process.env 里面去
if (config.env && typeof config.env === 'object') {
  Object.keys(config.env).forEach((key) => {
    process.env[key] = config.env[key]
  })
}

export default config
