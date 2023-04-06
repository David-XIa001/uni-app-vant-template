<template>
  <view class="container flex-center">
    <view class="header">
      <van-field
        :value="code"
        center
        clearable
        placeholder="请输入卡券兑换码"
        :border="false"
        use-button-slot
      >
        <van-button slot="button" color="#fe8147" size="small" type="primary">
          兑换卡券
        </van-button>
      </van-field>
    </view>
    <view class="condition">
      <view
        :class="active === 0 ? 'info active' : 'info'"
        @tap="active = 0"
      >优惠券(0)</view>
      <view
        :class="active === 1 ? 'info active' : 'info'"
        @tap="active = 1"
      >卡(0)</view>
    </view>
    <view class="condition1">
      <view
        :class="active1 === 0 ? 'info active' : 'info'"
        @tap="active1 = 0"
      >可使用</view>
      <view
        :class="active1 === 1 ? 'info active' : 'info'"
        @tap="active1 = 1"
      >已失效</view>
    </view>
    <view class="content c9 fsm">
      - 暂无优惠券 -
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      code: '',
      active: 0,
      active1: 0
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.container {
  background-color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  .condition {
    display: flex;
    padding: 0 30rpx;
    .info {
      color: #999;
      font-size: 32rpx;
      margin-right: 50rpx;
    }
    .active {
      color: #333;
      position: relative;
      &::after {
        position: absolute;
        content: "";
        width: 50rpx;
        height: 4rpx;
        background-color: #fd8047;
        border-radius: 2rpx;
        overflow: hidden;
        bottom: -10rpx;
        left: 50%;
        transform: translateX(-25rpx);
      }
    }
  }
  .condition1 {
    margin-top: 30rpx;
    display: flex;
    padding: 0 30rpx;
    .info {
      color: #999;
      font-size: 28rpx;
      margin-right: 20rpx;
      width: 120rpx;
      height: 40rpx;
      border-radius: 20rpx;
      text-align: center;
      border: 1rpx solid #999;
    }
    .active {
      color: #fd8047;
      border-color: #fd8047;
    }
  }
  .content{
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
