export const countryLanguageMap = {
  DE: 'de',
  BS: 'en',
  AU: 'en-AU',
  CA: 'en-CA',
  GB: 'en-GB',
  IN: 'en-IN',
  MY: 'en-MY',
  NZ: 'en-NZ',
  PH: 'en-PH',
  SG: 'en-SG',
  US: 'en-US',
  ES: 'es',
  FR: 'fr',
  ID: 'id',
  IT: 'it',
  JP: 'ja',
  KR: 'ko',
  RU: 'ru',
  TH: 'th',
  VN: 'vi',
  CN: 'zh-CN',
  HK: 'zh-HK',
  TW: 'zh-TW'
}

export type CountryKey = keyof typeof countryLanguageMap
