import path from 'path'
import chalk from 'chalk'
import { performance } from 'perf_hooks'

export const resolve = (p: string) => path.resolve(__dirname, p)

export const resolveCwd = (p: string) => path.resolve(process.cwd(), p)

export const isProd = process.env.NODE_ENV === 'production'

export function timeFrom(start: number, subtract = 0): string {
  const time: number | string = performance.now() - start - subtract
  const timeString = (time.toFixed(2) + `ms`).padEnd(5, ' ')
  if (time < 80) {
    return chalk.green(timeString)
  } else if (time < 300) {
    return chalk.yellow(timeString)
  } else {
    return chalk.red(timeString)
  }
}
