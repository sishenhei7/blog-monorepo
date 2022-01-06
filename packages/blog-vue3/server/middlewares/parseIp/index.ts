import { Context, Next } from 'koa'
import maxmind, { CityResponse, Reader, LocationRecord } from 'maxmind'
import { resolve, resolveCwd, isProd } from '~/server/utils'

export interface ipData {
  country: string | undefined
  continent: string | undefined
  postal: string | undefined
  city: string | undefined
  location: LocationRecord | undefined
  subdivision: string | undefined
}

function getIpData(mmdb: Reader<CityResponse>, ip: string): ipData {
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
  const path = isProd
    ? resolveCwd('dist/app/server/GeoIP2-Country.mmdb')
    : resolve('./GeoIP2-Country.mmdb')
  return maxmind.open<CityResponse>(path)
}
