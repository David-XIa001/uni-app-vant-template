import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

// 参数从url格式转为object
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach((v) => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

// 参数从object格式转为url
export function objToString(object) {
  let url = ''
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      if (url.indexOf('?') === -1) {
        url += '?' + key + '=' + object[key]
      } else {
        url += '&' + key + '=' + object[key]
      }
    }
  }
  return url
}

// UTC时间与当地时间的转换
export function transformDate(date, type, format = 'YYYY-MM-DD HH:mm:ss') {
  if (type === 'local') {
    // 传入local则将UTC时间转换为本地时间
    return date ? dayjs.utc(date).local().format(format) : ''
  } else if (type === 'UTC') {
    // 传入UTC则将时间转换为UTC时间
    return date ? dayjs(date).utc().format() : ''
  } if (type === 'unix') {
    // 将时间转换为时间戳
    return date ? dayjs(date).unix() * 1000 : ''
  }
}

// 获取小时分钟
export function transformDateToTime(date) {
  return dayjs.utc(date).local().format('HH:mm:ss')
}

// 获取当前时间戳
export function getNowUnix() {
  return dayjs().unix() * 1000
}

// 获取多少分钟之前的时间戳
export function getMinAgoUnix(min) {
  return dayjs().subtract(min, 'm').unix() * 1000
}

// 防抖
export function debounce(fn, delay) {
  let timer = null
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

// 节流
export function throttle(fn, delay) {
  let timer = null
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        fn()
        timer = null
      }, delay)
    }
  }
}

// 数组转对象
export function arrayToObj(array) {
  const result = {}
  for (let i = 0; i < array.length; i++) {
    const item = array[i]
    result[item.value] = item.key
  }
  return result
}

export function loginToast() {
  uni.showToast({
    title: '请登录',
    icon: 'none',
    duration: 1000
  })
  setTimeout(() => {
    uni.navigateTo({
      url: `/pages/login/index`
    })
  }, 1000)
}

export const isIPhoneX = () => {
  const screenHeight = wx.getSystemInfoSync().screenHeight
  const bottom = wx.getSystemInfoSync().safeArea.bottom
  return screenHeight !== bottom
}

export const fixed = (value, num) => {
  if (isNaN(value)) {
    return Number(0).toFixed(num)
  } else {
    return Number(value).toFixed(num)
  }
}
