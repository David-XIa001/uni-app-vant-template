<template>
  <view class="container">
    <view class="logo mb20">
      <image :src="logo" class="logo-image" />
    </view>
    <view class="fllg c3 mb10">xxxx小程序</view>
    <view class="fsm c6">干啥都用小程序</view>
    <van-button
      color="#02c05e"
      :disabled="checked !== '1'"
      open-type="getPhoneNumber"
      round
      class="button-div"
      type="primary"
      size="large"
      @getphonenumber="onGetPhoneNumber"
    ><text class="iconfont icon-weixin mr20" /> 微信快捷登录</van-button>
    <van-radio-group
      class="fsm mt20"
      :value="checked"
      @change="checked = checked === '1' ? '' : '1'"
    >
      <van-radio
        class="me-radio"
        checked-color="#02c05e"
        name="1"
        label-disabled
      >同意
        <text
          class="cm"
          @tap="() => goToPage('conceal')"
        >《用户服务协议》</text>
        和
        <text
          class="cm"
          @tap="() => goToPage('conceal')"
        >《用户隐私协议》</text></van-radio>
    </van-radio-group>
    <van-toast id="van-toast" />
  </view>
</template>

<script>
import { login } from '@/api/user'
import logo from '@/static/logo.js'
import Toast from '@/wxcomponents/vant/toast/toast'
export default {
  data() {
    return {
      logo: logo.logo,
      checked: ''
    }
  },
  methods: {
    goToPage(route) {
      uni.navigateTo({
        url: `/pages/${route}/index`
      })
    },
    // 授权手机号需花300认证小程序
    onGetPhoneNumber(e) {
      if (e.detail.errMsg === 'getPhoneNumber:fail user deny') {
        // 用户拒绝授权
        Toast('请授权手机号!')
      } else {
        if (this.checked === '') {
          Toast('需要您同意 《用户服务协议》 和 《用户隐私协议》')
          return
        }
        // 允许授权
        console.log('e =', e)
        console.log(e.detail.encryptedData)
        e.detail.encryptedData // 加密的用户信息
        e.detail.iv // 加密算法的初始向量  时要用到
        const phoneCode = e.detail.code
        uni.login({
          provider: 'weixin',
          success: (result) => {
            if (result && result.code) {
              login({ code: result.code, phoneCode: phoneCode }).then((res) => {
                uni.setStorageSync('openid', res.data.openid)
                uni.setStorageSync('userInfo', {
                  nickname: res.data.nickname,
                  avatar: res.data.avatar
                })
                Toast({
                  type: 'success',
                  message: '登录成功',
                  duration: 800,
                  onClose: () => {
                    uni.navigateBack()
                  }
                })
              })
            }
          },
          fail: (result) => {
            Toast.fail('出错了,请重试!')
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  .logo {
    width: 100rpx;
    height: 100rpx;
    margin-top: 300rpx;
    border-radius: 50%;
    box-shadow: 0px 0rpx 10rpx #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    .logo-image {
      width: 100rpx;
      height: 100rpx;
    }
  }
  .button-div {
    width: 600rpx;
    margin-top: 80rpx;
  }
  .me-radio {
    .van-radio__icon {
      width: 32rpx;
      height: 32rpx;
    }
    .van-radio__label {
      margin-left: 10rpx;
      line-height: 32rpx;
    }
  }
}
</style>
