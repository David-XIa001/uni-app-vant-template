import { loginToast } from '@/utils'
// 配置请求
const baseUrl = process.env.VUE_APP_BASE_API

let ajaxTimes = 0
export function request(options = {}) {
  ajaxTimes++
  options.header = {
    openid: uni.getStorageSync('openid') || '',
    timezone: 'Asia/Shanghai' // 默认国内
  }
  uni.showLoading({
    title: '加载中',
    mask: true
  })
  return new Promise((resolve, reject) => {
    uni.request({
      url: baseUrl + options.url || '',
      method: options.method || 'GET',
      data: options.data || {},
      header: options.header || {},
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(res.data)
          switch (res.statusCode) {
            case 401:
              loginToast()
              break
            case 403:
              loginToast()
              break
            // 404请求不存在
            case 404:
              setTimeout(() => {
                uni.showToast({
                  title: '网络请求不存在',
                  icon: 'error',
                  duration: 1500
                })
              }, 0)
              break
            // 其他错误，直接抛出错误提示
            case 500:
              setTimeout(() => {
                uni.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
                })
              }, 0)
              if (options.url.indexOf('pileScanCheck') !== -1) {
                setTimeout(() => {
                  uni.navigateTo({
                    url: `/pages/home/index`
                  })
                }, 2000)
              }
              break
            default:
              return
          }
        }
      },
      fail: (e) => {
        // reject调用后，即可传递到调用方使用catch或者async+await同步方式进行处理逻辑
        reject(e)
      },
      complete: () => {
        ajaxTimes--
        if (ajaxTimes === 0) {
          //  关闭正在等待的图标
          uni.hideLoading()
        }
      }
    })
  })
}
