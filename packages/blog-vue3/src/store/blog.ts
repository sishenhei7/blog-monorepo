import { defineStore } from 'pinia'

export default defineStore('blog', {
  state: () => {
    return {
      blogHomeData: [],
      blogLifeData: []
    }
  }
})
