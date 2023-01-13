import { api } from 'boot/axios'

export function getGeneratePassword (length, multiple) {
  return api.post('/password', {length, multiple})
}
