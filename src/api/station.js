import { request } from '@/lib/http/index'

export function getStationList(data) {
  return request({
    url: '/p/basic/wx/v1/stations/list',
    method: 'post',
    data
  })
}

export function getStationInfo(bizId) {
  return request({
    url: `/p/basic/wx/v1/stations/${bizId}`,
    method: 'get'
  })
}

export function getScanInfo(bizId) {
  return request({
    url: `/p/basic/wx/v1/piles/pileScanCheck/${bizId}`,
    method: 'post'
  })
}

export function getRateInfo(gunId) {
  return request({
    url: `/p/basic/wx/v1/guns/${gunId}/chargeRates/current`,
    method: 'get'
  })
}

