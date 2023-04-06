<template>
  <view class="container">
    <view class="all c3 fsm">
      <view>积分总额</view>
      <view class="fllg fw600 cm">0.00</view>
    </view>
    <view class="content">
      <view class="top cm">
        <view
          class="time"
          @tap="getTime"
        >{{ transformDate(currentDate, "local", "YYYY-MM") }}
          <view class="icon-play"><van-icon name="play" /></view></view>
        <view class="info cm">
          <text>-0</text>
        </view>
      </view>
      <view class="detail fsm c9"> - 暂无相关明细 - </view>
    </view>

    <van-popup
      round
      :show="show"
      custom-style="height: 40%"
      position="bottom"
      @close="onClose"
    >
      <van-datetime-picker
        type="year-month"
        :value="currentDate"
        :max-date="maxDate"
        @confirm="setTime"
        @cancel="onClose"
      />
    </van-popup>
  </view>
</template>

<script>
import { transformDate, fixed } from '@/utils'
export default {
  data() {
    return {
      currentDate: new Date().getTime(),
      maxDate: new Date().getTime(),
      show: false
    }
  },

  methods: {
    transformDate,
    setTime(event) {
      this.currentDate = event.detail
      this.onClose()
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
  .all {
    margin: 20rpx;
    height: 100rpx;
    padding: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
    text-align: center;
  }
  .content {
    margin: 0 20rpx 20rpx;
    padding: 20rpx;
    flex-grow: 1;
    border-radius: 10rpx;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    .top {
      display: flex;
      justify-content: space-between;
      .time {
        display: flex;
        .icon-play {
          transform: rotate(90deg);
        }
      }
    }
    .detail{
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
