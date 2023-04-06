import { request } from '@/lib/http/index'

export function getOrderList(data) {
  return request({
    url: '/p/operation/wx/v1/orders',
    method: 'get',
    data
  })
}

export function getOrderInfo(bizId) {
  return request({
    url: `/p/operation/wx/v1/orders/${bizId}`,
    method: 'get'
  })
}

export function getOrderAllInfo() {
  return request({
    url: `/p/operation/wx/v1/orders/statistics`,
    method: 'get'
  })
}

