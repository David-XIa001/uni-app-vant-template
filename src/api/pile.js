import { request } from '@/lib/http/index'

export function startCharging(data) {
  return request({
    url: '/p/basic/wx/v1/piles/charging/start',
    method: 'post',
    data: data
  })
}

export function stopCharging(bizId) {
  return request({
    url: '/p/basic/wx/v1/piles/charging/stop/' + bizId,
    method: 'post'
  })
}

