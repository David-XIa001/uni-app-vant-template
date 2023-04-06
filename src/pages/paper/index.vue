<template>
  <view
    class="container flex-center"
  >
    <view class="all c3 fsm">
      <view>红包总额</view>
      <view class="fllg fw600 cm">0.00</view>
    </view>
    <view class="list c6 fsm">
      -- 您还没有相关消费记录 --
    </view>

  </view>
</template>

<script>

export default {
  data() {
    return {
      dataList: []
    }
  },
  methods: {
  }
}
</script>

  <style lang="scss" scoped>
  .container {
    background-color: #f4f4f4;
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    .all {
        margin: 20rpx;
      height: 100rpx;
      padding: 20rpx;
      border-radius: 10rpx;
      background-color: #fff;
      text-align: center;
    }
    .list{
        height: calc(100vh - 180rpx);
        margin: 0 20rpx 20rpx ;
      padding: 20rpx;
      border-radius: 10rpx;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  </style>
