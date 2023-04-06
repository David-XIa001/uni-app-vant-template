
<template>
  <view>
    <mescroll-body
      :up="upOption"
      class="container flex-center"
      :fixed="true"
      :sticky="true"
      @init="mescrollInit"
      @down="downCallback"
      @up="upCallback"
    >
      <view class="banner">
        <swiper
          class="swiper"
          circular
          :autoplay="autoplay"
          :interval="interval"
          :duration="duration"
        >
          <swiper-item v-for="item in banners" :key="item">
            <view class="swiper-item">
              <image :mode="'scaleToFill'" :src="item" />
            </view>
          </swiper-item>
        </swiper>
      </view>
      <view class="search">
        <van-search
          disabled
          :value="value"
          placeholder="搜索xxxx"
          @tap="goToSearch"
        />
      </view>
      <view v-if="dataList.length > 0" class="station-list">
        <StationCard v-for="item in dataList" :key="item.bizId" :info="item" />
      </view>
    </mescroll-body>
    <Tabbar :selected="'home'" />
  </view>
</template>

<script>
import { getStationList } from '@/api/station'
import Tabbar from '@/components/tabbar'
import StationCard from '@/components/stationCard'
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'

export default {
  components: { Tabbar, StationCard },
  mixins: [MescrollMixin],
  data() {
    return {
      autoplay: true,
      interval: 2000,
      duration: 600,
      dataList: [],
      listQuery: {
        pageSize: 10,
        currentPage: 1
      },
      upOption: {
        page: {
          size: 10 // 每页数据的数量,默认10
        },
        noMoreSize: 1 // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
      },
      banners: [
        'https://t7.baidu.com/it/u=2511982910,2454873241&fm=193&f=GIF',
        'https://t7.baidu.com/it/u=1956604245,3662848045&fm=193&f=GIF'
      ],
      params: {
        lng: '',
        lat: ''
      },
      isLocationInit: false
    }
  },
  onShow() {
    uni.hideTabBar()
    if (this.params.lng === '' || this.dataList.length === 0) {
      this.getLocation()
    }
  },
  methods: {
    // 获取地理位置,需要在微信后台申请权限
    getLocation() {
      uni.getLocation({
        type: 'gcj02',
        success: (res) => {
          this.params.lng = res.longitude
          this.params.lat = res.latitude
          this.$store.dispatch('user/setLocation', { lng: res.longitude, lat: res.latitude })
          console.log('当前位置的经度：' + res.longitude)
          console.log('当前位置的纬度：' + res.latitude)
        },
        fail: (err) => {
          console.log('err =', err)
        },
        complete: () => {
          this.isLocationInit = true
          if (this.dataList.length === 0) {
            this.mescroll.resetUpScroll()
          }
        }
      })
    },
    goToSearch() {
      uni.navigateTo({
        url: '/pages/search/index'
      })
    },
    upCallback(page) {
      if (this.isLocationInit) {
        this.listQuery.currentPage = page.num
        // 列表搜索
        // getStationList({ ...this.listQuery, ...this.params })
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
      }
    }
  }
}
</script>

  <style lang="scss">
  .container {
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding-bottom: 100rpx;
    .banner {
      width: 100%;
      .swiper {
        height: 480rpx;
        .swiper-item {
          display: block;
          height: 480rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .search {
      margin-bottom: 20rpx;
    }
    .all {
      height: 200rpx;
      text-align: center;
    }
  }
  </style>
