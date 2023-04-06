<template>
  <mescroll-body
    :up="upOption"
    class="container flex-center"
    :sticky="true"
    @init="mescrollInit"
    @down="downCallback"
    @up="upCallback"
  >
    <view class="header flex-between">
      <view class="left">
        <view
          class="num fllg c3 fw600"
        >{{ fixed(totalAmount,2) }}<text class="fnm ml10">元</text></view>
        <view class="info fnm">累计支出</view>
      </view>
      <view class="right">
        <view
          class="num fllg c3 fw600"
        >{{ fixed(totalElectricity,2) }}<text class="fnm ml10">元</text></view>
        <view class="info fnm">今日支出</view>
      </view>
    </view>
    <view class="content">
      <view class="condition">
        <van-button
          v-for="item in btnList"
          :key="item.value"
          size="small"
          :color="active === item.value ?'#ff8046' : ''"
          type="default"
          @tap="changeType(item.value)"
        >{{ item.name }}</van-button>
      </view>
      <view v-if="dataList.length > 0" class="order-list">
        <OrderCard v-for="item in dataList" :key="item.bizId" :info="item" />
      </view>
    </view>
  </mescroll-body>
</template>

<script>
import OrderCard from '@/components/orderCard'
import { getOrderList, getOrderAllInfo } from '@/api/order'
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'
import { fixed } from '@/utils'

export default {
  components: { OrderCard },
  mixins: [MescrollMixin],
  data() {
    return {
      active: '',
      btnList: [
        { name: '全部', value: '' },
        { name: '待支付', value: 2 },
        { name: '使用中', value: 1 },
        { name: '已支付', value: 3 }
      ],
      dataList: [],
      upOption: {
        page: {
          size: 10 // 每页数据的数量,默认10
        },
        noMoreSize: 3 // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
      },
      listQuery: {
        pageSize: 10,
        currentPage: 1
      },
      params: {
        orderActualStatus: ''
      },
      totalElectricity: 0,
      totalAmount: 0
    }
  },
  methods: {
    fixed,
    upCallback(page) {
      this.listQuery.currentPage = page.num
      this.getOrderAllInfo()
      // 获取订单接口
      // getOrderList({ ...this.listQuery, ...this.params })
      //   .then((res) => {
      //     this.mescroll.endBySize(res.data.records.length, res.data.total)
      //     if (page.num === 1) {
      //       this.dataList = []
      //     }
      //     this.dataList = this.dataList.concat(res.data.records)
      //   })
      //   .catch(() => {
      //     this.mescroll.endErr()
      //   })
    },
    downCallback() {
      this.mescroll.resetUpScroll()
    },
    getOrderAllInfo() {
      // 获取金额
      // getOrderAllInfo().then(res => {
      //   this.totalAmount = res.data.totalAmount
      //   this.totalElectricity = res.data.totalElectricity
      // })
    },
    changeType(type) {
      this.active = type
      this.params.orderActualStatus = type
      this.mescroll.scrollTo(0)
      this.mescroll.resetUpScroll()
    }
  }
}
</script>

<style lang="scss">
.container {
  background-color: #fff;
  overflow-anchor: none;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  .header {
    padding: 20rpx 40rpx;
    .left {
      border-right: 1px solid #ccc;
    }
    .left,
    .right {
      width: 50%;
      text-align: center;
    }
  }
  .condition {
    margin: 20rpx 0;
    display: flex;
    justify-content: space-evenly;
    position: sticky;
    padding: 20rpx 0;
    background-color: #fff;
    top: -1rpx;
    z-index: 99;
    border-bottom: 1px solid #ccc;
  }
}
</style>
