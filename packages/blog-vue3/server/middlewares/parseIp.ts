import fs from 'fs'
import path from 'path'
import { Context, Next } from 'koa'
import maxmind, { CityResponse, Reader } from 'maxmind'
import { logger } from '~/server/utils'

export interface ipData {
  country: string | undefined
  continent: string | undefined
  postal: string | undefined
  city: string | undefined
  location: CityResponse['location'] | undefined
  subdivision: string | undefined
}

// test: 67.183.57.64
// subdivision: WA
// country: US
// city: Snohomish
// continent: NA
// postal: 98012
// location.latitude: number
// location.longitude: number
export function getIpData(mmdb: Reader<CityResponse>, ip: string): ipData {
  const res = mmdb.get('67.183.57.64')
  return {
    country: res?.country?.iso_code,
    continent: res?.continent?.code,
    postal: res?.postal?.code,
    city: res?.city?.names?.en,
    location: res?.location,
    subdivision: res?.subdivisions?.length
      ? res?.subdivisions[0]?.iso_code
      : undefined
  }
}

export default function parseIpMiddleware(mmdb: Reader<CityResponse>) {
  return async (ctx: Context, next: Next) => {
    ctx.state.ipData = getIpData(mmdb, ctx.ip)
    await next()
  }
}

export async function openMmdb() {
  let p = path.resolve('data/Country.mmdb')

  try {
    const cityPath = path.resolve('data/City.mmdb')
    fs.accessSync(cityPath)
    p = cityPath
  } catch (error) {
    logger.warn('Can not read mmdb city path!')
  }

  return maxmind.open<CityResponse>(p)
}
