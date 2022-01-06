import fs from 'fs'
import path from 'path'
import maxmind, { Reader, CityResponse } from 'maxmind'
import logger from './logger'

export type Mmdb = Reader<CityResponse>

let mmdb: Mmdb | null = null

async function openMmdb(): Promise<Mmdb> {
  let p = path.resolve('data/Country.mmdb')

  try {
    const cityPath = path.resolve('data/City.mmdb')
    fs.accessSync(cityPath)
    p = cityPath
  } catch (error) {
    logger.warn('Can not read mmdb city path, will use country path!')
  }

  return maxmind.open<CityResponse>(p)
}

export default async function getMmdb(): Promise<Mmdb> {
  if (!mmdb) {
    mmdb = await openMmdb()
  }
  return mmdb
}
