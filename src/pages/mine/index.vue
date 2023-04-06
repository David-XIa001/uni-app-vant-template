<template>
  <view class="container">
    <view class="header">
      <view class="user">
        <image class="avatar" :src="avatar" mode="scaleToFill" />
        <text v-if="nickname" class="name">{{ nickname }}</text>
        <text v-else class="name" @tap="() => goToPage('login')">点击登录</text>
      </view>
      <view class="box">
        <!-- <view class="balance" @tap="()=>goToPage('balance')">
          <view class="num">0.00</view>
          <view class="name">余额</view>
          <view class="recharge">去充值</view>
        </view> -->
        <view class="balance" @tap="() => goToPage('paper')">
          <view class="cm">0.00</view>
          <view class="name">红包</view>
        </view>
        <view class="balance" @tap="() => goToPage('card')">
          <view class="cm">0</view>
          <view class="name">卡券</view>
        </view>
        <view class="balance" @tap="() => goToPage('integral')">
          <view class="cm">0</view>
          <view class="name">积分</view>
        </view>
      </view>
    </view>
    <view class="content">
      <van-cell
        icon="balance-list-o"
        title="我的订单"
        is-link
        @tap="() => goToPage('order')"
      />
      <van-cell
        icon="bill-o"
        title="开具发票"
        is-link
        @tap="() => goToAwait()"
      />
      <van-cell
        icon="phone-o"
        title="客服电话"
        is-link
        @tap="onHandlePhone('027-xxxxx')"
      />
      <van-cell title="道路救援" is-link @tap="onHandlePhone('122')">
        <text slot="icon" class="iconfont icon-jinggao mr10" />
      </van-cell>
      <van-cell title="隐私协议" is-link @tap="() => goToPage('conceal')">
        <text slot="icon" class="iconfont icon-yinsixieyi mr10" />
      </van-cell>
      <van-cell title="退出登录" is-link @tap="() => logOut()">
        <text slot="icon" class="iconfont icon-tuichudenglu mr10" />
      </van-cell>
    </view>
    <Tabbar :selected="'mine'" />
    <van-toast id="van-toast" />
    <van-dialog id="van-dialog" />
  </view>
</template>

<script>
import Tabbar from '@/components/tabbar'
import Toast from '@/wxcomponents/vant/toast/toast'
import Dialog from '@/wxcomponents/vant/dialog/dialog'
export default {
  components: { Tabbar },
  data() {
    return {
      nickname: '',
      avatar: ''
    }
  },
  onShow() {
    uni.hideTabBar()
    this.nickname = uni.getStorageSync('userInfo').nickname || ''
    this.avatar = uni.getStorageSync('userInfo').avatar || ''
  },
  methods: {
    logOut() {
      if (this.nickname) {
        Dialog.confirm({
          title: '提示',
          message: '确认退出登录?'
        }).then(() => {
          uni.removeStorageSync('openid')
          uni.removeStorageSync('userInfo')
          uni.reLaunch({
            url: '/pages/mine/index'
          })
        }).catch(() => {})
      } else {
        Toast({
          message: '您未登录!',
          duration: 1000
        })
      }
    },
    onHandlePhone(number) {
      uni.makePhoneCall({
        phoneNumber: number
      })
    },
    goToAwait() {
      Toast({
        message: '敬请期待!',
        duration: 1000
      })
    },
    goToPage(route) {
      uni.navigateTo({
        url: `/pages/${route}/index`
      })
    }
  }
}
</script>

<style lang="scss">
.container {
  background-color: #f4f4f4;
  height: 100vh;
  .header {
    height: 260rpx;
    padding: 40rpx 40rpx 0 40rpx;
    background-color: #fff;
    .user {
      display: flex;
      height: 100rpx;
      align-items: center;
      .avatar {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        margin-right: 40rpx;
        overflow: hidden;
        background-color: #f4f4f4;
        .name {
          display: inline-block;
        }
      }
    }
    .box {
      margin-top: 40rpx;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      .balance {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .name {
        line-height: 60rpx;
        color: #a1a1a1;
        font-size: 28rpx;
      }
      .recharge {
        font-size: 20rpx;
        color: #a1a1a1;
        padding: 6rpx;
        border: 1px solid #a1a1a1;
        border-radius: 10rpx;
      }
    }
  }
  .content {
    margin-top: 20rpx;
  }
}
</style>
