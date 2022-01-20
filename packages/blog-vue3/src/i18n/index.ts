import { createI18n } from 'vue-i18n'
import useContextStore from '@/store/context'

export default async () => {
  const contextStore = useContextStore()
  let { country = 'CN', language = 'zh-CN' } = contextStore

  // 格式化
  country = country.toUpperCase()
  country = ['CN', 'UK'].includes(country) ? country : 'CN'
  language = ['en', 'zh-CN'].includes(language) ? language : 'zh-CN'

  const countryFormats = await import(`./formats/${country}.ts`)
  const languageMessages = await import(`./messages/${language}.json`)

  return createI18n({
    legacy: false,
    globalInjection: true,
    locale: language,
    messages: {
      [language]: languageMessages
    },
    numberFormats: {
      [language]: countryFormats.default.numberFormats
    },
    datetimeFormats: {
      [language]: countryFormats.default.datetimeFormats
    }
  })
}
