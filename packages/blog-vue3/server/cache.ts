import { createClient } from 'redis'
import LRUCache from 'lru-cache'
import logger from '~/server/logger'

class CacheOptions {
  lruMax = 1000
  lruMaxAge = 60
  redisMaxAge = 5 * 60
}

type RedisClientType = ReturnType<typeof createClient>
type RedisClientOptions = Parameters<typeof createClient>[0]

export default class Cache {
  private redisClient: RedisClientType
  private redisAvailable: boolean
  private redisMaxAge: number
  private lruClient: LRUCache<string, unknown>
  private lruMaxAge: number

  constructor(
    redisOptions: RedisClientOptions,
    cacheOptions: CacheOptions = new CacheOptions()
  ) {
    const defaultCacheOptions = new CacheOptions()
    cacheOptions = { ...defaultCacheOptions, ...cacheOptions }

    this.lruMaxAge = cacheOptions.lruMaxAge
    this.redisMaxAge = cacheOptions.redisMaxAge

    this.redisAvailable = false
    this.redisClient = this.createRedisClient(redisOptions)
    this.lruClient = this.createLRUClient(cacheOptions)
  }

  private createRedisClient(redisOptions: RedisClientOptions) {
    const redisClient = createClient(redisOptions)

    redisClient.on('error', (error: Error) => {
      this.redisAvailable = false
      logger.error(JSON.stringify(error))
    })

    redisClient.on('end', () => {
      this.redisAvailable = false
    })

    redisClient.on('connect', () => {
      this.redisAvailable = true
    })

    redisClient.connect()

    return redisClient
  }

  private createLRUClient({ lruMax }: CacheOptions) {
    return new LRUCache<string, unknown>(lruMax)
  }

  public async getRedis(key: string): Promise<any> {
    let value = null
    if (this.redisClient && this.redisAvailable) {
      value = await this.redisClient.get(key)
    }
    return value
  }

  public async setRedis(key: string, value: any) {
    if (this.redisClient && this.redisAvailable) {
      await this.redisClient.set(key, value, {
        EX: this.redisMaxAge
      })
    }
  }

  public async delRedis(key: string) {
    if (this.redisClient && this.redisAvailable) {
      await this.redisClient.del(key)
    }
  }

  public getLru(key: string) {
    const value = this.lruClient.get(key)
    return value
  }

  public setLru(key: string, value: any) {
    this.lruClient.set(key, value, this.lruMaxAge * 1000)
  }

  public delLru(key: string) {
    this.lruClient.del(key)
  }

  public async get(key: string): Promise<any> {
    try {
      if (this.lruClient.has(key)) {
        return this.getLru(key)
      }

      const value = await this.getRedis(key)
      if (value) {
        this.setLru(key, value)
        return value
      }
    } catch (error) {
      logger.error(JSON.stringify(error))
      return null
    }

    return null
  }

  public async set(key: string, value: any) {
    try {
      this.setLru(key, value)
      await this.setRedis(key, value)
      return true
    } catch (error) {
      logger.error(JSON.stringify(error))
      return false
    }
  }

  public async del(key: string) {
    try {
      this.delLru(key)
      await this.delRedis(key)
      return true
    } catch (error) {
      logger.error(JSON.stringify(error))
      return false
    }
  }
}
