import { defineStore } from 'pinia'

export default defineStore('context', {
  state: () => {
    return {
      language: 'en',
      ip: '',
      country: 'US',
      platform: 'mobile',
      webp: false,
      isApp: false,
      isIOS: false,
      isBot: false,
      host: ''
    }
  }
})
