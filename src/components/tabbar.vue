<template>
  <van-tabbar fixed :border="false" :placeholder="true">
    <view class="tabbar">
      <view
        :class="
          'item ' + (selected == 'home' ? 'active-color' : 'inactive-color')
        "
        name="home"
        @tap="change('home')"
      >
        <van-icon name="home-o" />
        <text class="fsm">首页</text>
      </view>
      <view class="scan" @tap="scanCode">
        <view class="scan-content">
          <van-icon class="scan-icon" name="scan" />
        </view>
      </view>
      <view
        :class="
          'item ' + (selected == 'mine' ? 'active-color' : 'inactive-color')
        "
        name="mine"
        @tap="change('mine')"
      >
        <van-icon name="friends-o" />
        <text class="fsm">我的</text>
      </view>
    </view>
  </van-tabbar>
</template>

<script>
import { loginToast } from '@/utils'

export default {
  name: 'TabBar',
  props: {
    selected: {
      type: String
    }
  },
  data() {
    return {}
  },
  methods: {
    change(val) {
      uni.switchTab({
        url: `/pages/${val}/index`
      })
    },
    scanCode() {
      if (uni.getStorageSync('openid')) {
        // 允许从相机和相册扫码
        uni.scanCode({
          success: (res) => {
            console.log('条码类型：' + res.scanType)
            console.log('条码内容：' + res.result)
            // 匹配扫码规则
            if (res.result.indexOf('xxxxx') !== -1) {
              //  匹配成功做的事情
            } else {
              uni.showToast({
                title: '二维码不符合规则',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      } else {
        loginToast()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tabbar {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100rpx;
  background-color: #fff;
  .item {
    width: 33.3%;
    display: flex;
    padding-top: 20rpx;
    flex-direction: column;
    align-items: center;
  }
  .inactive-color {
    color: #7d7e80;
  }
  .active-color {
    color: #ff8855;
  }
  .scan {
    flex-grow: 1;
    position: relative;
    .scan-content {
      position: absolute;
      top: -40rpx;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(#ff8868, #ff8855);
      overflow: hidden;
      width: 120rpx;
      height: 120rpx;
      border-radius: 50%;
      text-align: center;
      line-height: 130rpx;
      box-shadow: 0px 0rpx 10rpx #999;
      .scan-icon {
        font-size: 80rpx;
        color: #fff;
      }
    }
  }
}
</style>
