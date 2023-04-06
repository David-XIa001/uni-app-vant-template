<template>
  <view class="container flex-center">
    <view class="header flex-center">
      <view class="status fllg">
        <van-icon :class="info.orderActualStatus === 2 ?'.cmb mr10':'c-pri mr10'" :name="info.orderActualStatus === 2 ?'clock':'checked'" />
        <text>{{ info.orderActualStatus === 2 ? '待支付':'支付成功' }}</text>
      </view>
      <view class="header tac">
        <van-button :color="info.orderActualStatus === 2 && '#ff8046'" round size="small" type="primary" @tap="handleBtn">{{ info.orderActualStatus === 2 ? '立即支付':'返回首页' }}</van-button>
      </view>
    </view>
    <view class="price-info">
      <view class="price">
        <view class="fnm">需付</view>
        <view class="fllg fw600 c3">￥{{ fixed(info.totalFee,2) }}</view>
      </view>
      <view class="flex-between">
        <view class="fnm">订单服务费</view>
        <view class="fnm fw600 c3">￥{{ fixed(info.serviceFee,2) }}</view>
      </view>
      <!-- <view class="info fsm c6 tac">费用明细<van-icon name="arrow" /></view> -->
    </view>
    <view v-if="info" class="order-info fsm">
      <view class="item mt10 mb10">
        <view class="lable c9">订单编号</view>
        <view class="value ellipsis c3">{{ info.bizId }}</view>
        <view class="cm" @tap="copy(info.bizId)">复制</view>
      </view>
      <!-- <view class="item mt10 mb10">
        <view class="lable c9">充电枪编号</view>
        <view class="value ellipsis c3">{{ info.gunId }}</view>
      </view> -->
      <view class="item mt10 mb10">
        <view class="lable c9">开始时间</view>
        <view class="value ellipsis c3">{{ transformDate(info.chargingStartTime,'local') }}</view>
      </view>
      <view class="item mt10 mb10">
        <view class="lable c9">结束时间</view>
        <view class="value ellipsis c3">{{ transformDate(info.chargingEndTime,'local') }}</view>
      </view>
      <view class="item mt10 mb10">
        <view class="lable c9">支付方式</view>
        <view class="value ellipsis c3">{{ '微信支付' }}</view>
      </view>
      <view class="item mt10 mb10">
        <view class="lable c9">支付时间</view>
        <view class="value ellipsis c3">{{ transformDate(info.paymentTime,'local') || '-' }}</view>
      </view>
    </view>
    <van-goods-action v-if="info.orderActualStatus === 2">
      <view class="btn">立即支付</view>
    </van-goods-action>
    <van-toast id="van-toast" />
  </view>
</template>

<script>
import { getOrderInfo } from '@/api/order'
import { transformDate, fixed } from '@/utils'

export default {
  data() {
    return {
      orderId: '',
      info: {}
    }
  },
  onLoad(query) {
    this.orderId = query.orderId
    this.getInfo()
  },
  methods: {
    transformDate,
    fixed,
    copy(value) {
      uni.setClipboardData({
        data: value
      })
    },
    handleBtn() {
      if (this.info.orderActualStatus === 2) {
        // 支付
      } else {
        // 回到首页
        uni.switchTab({
          url: '/pages/home/index'
        })
      }
    },
    getInfo() {
      getOrderInfo(this.orderId).then(res => {
        this.info = res.data
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
    padding: 20rpx 0 0 0;
    .status {
      text-align: center;
    }
  }
  .price-info {
    height: 200rpx;
    background-color: #fff;
    border-radius: 20rpx;
    margin: 20rpx;
    padding: 20rpx;
    .price {
      display: flex;
      align-items: center;
      padding-bottom: 20rpx;
      border-bottom: 1px solid #ccc;
    }
  }
  .order-info {
    background-color: #fff;
    border-radius: 20rpx;
    margin: 20rpx;
    padding: 20rpx;
    .item {
      display: flex;
      align-items: center;
      .lable {
        width: 140rpx;
      }
      .value {
        text-align: left;
        width: 480rpx;
      }
    }
  }
  .btn{
    width: 380rpx;
    margin: 20rpx auto;
    height: 80rpx;
    background-color: #ff8046;
    border-radius: 40rpx;
    text-align: center;
    line-height: 80rpx;
    color: #fff;
    font-weight: 600;
  }
}
</style>
