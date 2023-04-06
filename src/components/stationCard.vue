<template>
  <view class="card" @tap="goToStation">
    <view class="title">
      <text class="ellipsis flg ml20 fw600">title</text>
    </view>
    <view class="location">
      <view class="location-icon" @tap.stop="navigateToStation(info)">
        <text class="icon-daohang1 iconfont " />
      </view>
      <text v-if="info.distance" class="fsm c9">{{ fixed(info.distance/1000,0) + 'km' }}</text>
    </view>
  </view>
</template>

<script>
import { fixed } from '@/utils'

export default {
  name: 'StationCard',
  props: {
    info: {
      type: Object
    }
  },
  data() {
    return {
    }
  },
  methods: {
    fixed,
    goToStation() {
      // 去详情
    },
    // 拉起导航
    navigateToStation(info) {
      uni.openLocation({
        latitude: parseFloat(info.lat), // 目的地的纬度
        longitude: parseFloat(info.lng), // 目的地的经度
        name: info.stationName // 打开后显示的地址名称
      })
    }
  }
}
</script>

<style lang="scss">
.card {
  background-color: #fff;
  height: 240rpx;
  margin: 20rpx;
  border-radius: 10rpx;
  padding: 20rpx;
  position: relative;
  .title {
    display: flex;
    align-items: center;
    width: 80%;
    image {
      width: 40rpx;
      height: 40rpx;
      flex-shrink: 0;
    }
  }
  .location{
    position: absolute;
    right: 0rpx;
    top: 30rpx;
    width: 100rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    .location-icon{
      text-align: center;
      color: #333;
    }

  }
  .tag {
    margin: 10rpx 0;
    display: flex;
  }
  .price {
    margin-top: 10rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    vertical-align: bottom;
    .right {
      font-size: 20rpx;
      min-width: 100rpx;
      text-align: right;
    }
  }
}
</style>
