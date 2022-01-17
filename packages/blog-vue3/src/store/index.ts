import { createPinia } from 'pinia'
import { isClient } from '@/utils'
import useUserStore from './user'
import useContextStore from './user'

export default () => {
  const pinia = createPinia()

  if (!isClient) {
    useUserStore(pinia)
    useContextStore(pinia)
  }

  return pinia
}
