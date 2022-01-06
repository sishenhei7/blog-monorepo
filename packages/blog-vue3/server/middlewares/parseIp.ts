import path from 'path'
import { Context, Next } from 'koa'
import maxmind, { CityResponse, Reader } from 'maxmind'

export interface ipData {
  country: string | undefined
  continent: string | undefined
  postal: string | undefined
  city: string | undefined
  location: CityResponse['location'] | undefined
  subdivision: string | undefined
}

export function getIpData(mmdb: Reader<CityResponse>, ip: string): ipData {
  const res = mmdb.get(ip)
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
  return maxmind.open<CityResponse>(path.resolve('data/GeoIP2-Country.mmdb'))
}
