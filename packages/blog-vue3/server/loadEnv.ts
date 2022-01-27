import fs from 'fs'
import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { lookupFile } from '~/server/utils'

const mode = process.env.NODE_ENV || 'development'
const envFiles = [
  /** mode local file */ `.env.${mode}.local`,
  /** mode file */ `.env.${mode}`,
  /** local file */ `.env.local`,
  /** default file */ `.env`
]

for (const file of envFiles) {
  const path = lookupFile(process.cwd(), [file], true)
  if (path) {
    const parsed = dotenv.parse(fs.readFileSync(path))
    dotenvExpand.expand({ parsed })
  }
}
