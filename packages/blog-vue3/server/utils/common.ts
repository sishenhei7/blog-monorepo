import chalk from 'chalk'
import { performance } from 'perf_hooks'

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

export function isSearchBot(ua: string = '') {
  return /(Sogou web spider)|(bingbot)|(Googlebot)|(Baiduspider)|(AdsBot)|(TweetmemeBot)|(Slackbot)|(James BOT)|(Applebot)|(Facebot)|(YandexMobileBot)|(AhrefsBot)|(contxbot)|(Livechat OpenGraph Robot)|(Mail.RU_Bot)|(archive.org_bot)|(MojeekBot)|(Discordbot)|(startmebot)/i.test(
    ua
  )
}
