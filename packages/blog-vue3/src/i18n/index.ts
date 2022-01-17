import { createI18n } from 'vue-i18n'
import useContextStore from '@/store/context'

export default async () => {
  const contextStore = useContextStore()

  let country = contextStore.country.toUpperCase()
  let language = contextStore.language

  // 格式化
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
