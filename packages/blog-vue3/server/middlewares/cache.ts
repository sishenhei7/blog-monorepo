import { createClient } from 'redis'
import LRUCache from 'lru-cache'

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
  private lruClient: LRUCache<string, undefined>
  private lruMaxAge: number

  constructor(cacheOptions: CacheOptions, redisOptions: RedisClientOptions) {
    const defaultCacheOptions = new CacheOptions()
    cacheOptions = { ...defaultCacheOptions, ...cacheOptions }

    this.lruMaxAge = cacheOptions.lruMaxAge
    this.redisMaxAge = cacheOptions.redisMaxAge

    this.lruClient = new LRUCache(cacheOptions.lruMax)

    this.redisAvailable = false
    this.redisClient = this.createRedisClient(redisOptions)
  }

  createRedisClient(redisOptions: RedisClientOptions) {
    const redisClient = createClient(redisOptions)

    redisClient.on('error', (error: Error) => {
      this.redisAvailable = false
      console.error(JSON.stringify(error))
    })

    redisClient.on('end', () => {
      this.redisAvailable = false
    })

    redisClient.on('connect', () => {
      this.redisAvailable = true
    })

    return redisClient
  }

  createLRUClient({ lruMax }: CacheOptions) {
    this.lruClient = new LRUCache(lruMax)
  }

  async getRedis(key: string): Promise<any> {
    const value = await this.redisClient.get(key)
    return value
  }

  async setRedis(key: string, value: any) {
    await this.redisClient.set(key, value, {
      EX: this.redisMaxAge
    })
  }

  getLru(key: string) {
    const value = this.lruClient.get(key)
    return value
  }

  setLru(key: string, value: any) {
    this.lruClient.set(key, value, this.lruMaxAge)
  }
}
