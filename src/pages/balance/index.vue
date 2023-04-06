<template>
  <view class="container">
    <view class="header">
      <view class="top">
        <view class="sum">资产总额</view>
        <view class="num">0.00</view>
      </view>
      <view class="bottom">
        <view class="left">
          <view class="canUse">可用余额</view>
          <view class="num">0.00</view>
        </view>
        <view class="line" />
        <view class="right">
          <view class="frozen">冻结余额</view>
          <view class="num">0.00</view>
        </view>
      </view>
    </view>
    <view class="content">
      <view class="top">
        <view class="time" @tap="getTime">{{ currentDate }} <view class="icon-play"><van-icon name="play" /></view></view>
        <view class="info">
          <text>收入0元</text>
          <text>支出0元</text>
        </view>
      </view>
      <view class="detail">
        暂无相关明细
      </view>
    </view>
    <view class="footer">
      <view class="cash">提现</view>
      <view class="recharge">充值</view>
    </view>
    <van-popup round :show="show" custom-style="height: 40%" position="bottom" @close="onClose">
      <van-datetime-picker
        type="year-month"
        :value="new Date().getTime()"
        :max-date="maxDate"
        @input="onInput"
        @confirm="setTime"
        @cancel="onClose"
      />
    </van-popup>

  </view>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date().getTime(),
      maxDate: new Date().getTime(),
      show: false
    }
  },

  methods: {
    setTime(event) {
      console.log('event.detail =', event.detail)
    },
    onInput(event) {
      console.log('event.detail =', event.detail)
    },
    getTime() {
      this.show = true
    },
    onClose() {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  margin: auto;
  position: relative;
  .header {
    margin: 20rpx;
    padding: 20rpx;
    height: 240rpx;
    border-radius: 10rpx;
    background-color: #fff;
    .top {
      text-align: center;
      padding-bottom: 20rpx;
      border-bottom: 1px solid #ccc;
      font-size: 28rpx;
      .num {
        font-size: 36rpx;
        font-weight: 600;
      }
    }

    .bottom {
      margin-top: 20rpx;
      display: flex;
      justify-content: space-around;
      .left,
      .right {
        color: #a2a1a5;
        font-size: 28rpx;
        text-align: center;
        .num {
          font-size: 28rpx;
          color: #333;
          font-weight: 600;
        }
      }
      .line {
        width: 1px;
        height: 60rpx;
        margin-top: 20rpx;
        background-color: #ccc;
      }
    }
  }
  .content{
    margin: 0 20rpx;
    padding: 20rpx;
    height: 240rpx;
    border-radius: 10rpx;
    background-color: #fff;
    .top{
      display: flex;
      justify-content: space-between;
      .time{
        display: flex;
        .icon-play{
          transform: rotate(90deg);
        }
      }
    }
  }
  .footer{
    width: 100%;
    height: 140rpx;
    position: absolute;
    bottom: 0px;
    display: flex;
    justify-content: space-around;
    border-top: 1px solid #ccc;
    .cash,.recharge{
      margin-top: 20rpx;
      width: 300rpx;
      height: 80rpx;
      border: 1px solid #ff8046;
      border-radius: 80rpx;
      line-height: 80rpx;
      text-align: center;
      font-weight: 600;
      color: #ff8046;
    }
    .recharge{
      background-color: #ff8046 ;
      color: #fff;
    }
  }
}
</style>
