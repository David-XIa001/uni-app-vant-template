import { request } from '@/lib/http/index'

export function login(data) {
  console.log('sdasd', process.env)
  return request({
    url: '/p/user/pub/wx/v1/login',
    method: 'post',
    data
  })
}

