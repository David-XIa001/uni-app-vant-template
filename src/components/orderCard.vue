<template>
  <view class="card" @tap="goToOrderDetail(info)">
    <view class="left">
      <view class="title fnm  ellipsis">{{ info.stationName || '' }}</view>
      <view class="time c6 mt10 fsm">
        {{ info.createTime && transformDate(info.createTime,'local') }}
      </view>
    </view>
    <view class="right flg c3 fw600">￥{{ fixed(info.totalFee,2) }}</view>
    <view :class="'status ' + orderActualObj[info.orderActualStatus]">{{ orderTextObj[info.orderActualStatus] }}</view>
  </view>
</template>
<script>
import { transformDate, fixed } from '@/utils'
import { getOrderInfo } from '@/api/order'

export default {
  name: 'OrderCard',
  props: {
    info: {
      type: Object
    }
  },
  data() {
    return {
      orderActualObj: {
        1: 'doing',
        2: 'wait',
        3: 'over'
      },
      orderTextObj: {
        1: '使用中',
        2: '待支付',
        3: '已支付'
      }
    }
  },
  methods: {
    transformDate,
    fixed,
    goToOrderDetail(info) {
      // getOrderInfo(info.bizId).then(res => {
      //   if (res.data.orderActualStatus === 1) {

      //   } else {

      //   }
      // })
    }
  }
}
</script>
  <style lang="scss" scoped>
  .card {
    height: 100rpx;
    margin: 20rpx;
    padding: 20rpx;
    border-bottom: 1px solid #ccc;
    display: flex;
    position: relative;
    justify-content: space-between;
    .left{
        width: 540rpx;
    }
    .right{
        text-align: right;
        width: 140rpx;
        flex-shrink: 0;
    }
    .status{
      width: 120rpx;
      height: 44rpx;
      position: absolute;
      right: 20rpx;
      bottom: 20rpx;
      border:1px solid #999;
      color: #999;
      border-radius: 22rpx;
      font-size: 24rpx;
      text-align: center;
      line-height: 44rpx;
    }
    .doing{
      color: #ed773a;
      border-color: #ed773a;
    }
    .over{
      color: #999;
      border-color: #999;
    }
    .wait{
      color: #ff8046;
      border-color: #ff8046;
    }
  }
  </style>
