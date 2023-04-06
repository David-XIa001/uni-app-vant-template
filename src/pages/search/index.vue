<template>
  <mescroll-body
    :up="upOption"
    :down="downOption"
    class="container flex-center"
    :sticky="true"
    @init="mescrollInit"
    @up="upCallback"
  >
    <view class="search">
      <van-search
        :value="params.stationName"
        use-action-slot
        placeholder="搜索xxxx"
        @change="setValue"
      >
        <view slot="action" @tap="onSearch">搜索</view>
      </van-search>
    </view>
    <view v-if="dataList.length>0" class="station-list">
      <StationCard v-for="item in dataList" :key="item.bizId" :info="item" />
    </view>

  </mescroll-body>
</template>

<script>
import StationCard from '@/components/stationCard'
import { getStationList } from '@/api/station'
import MescrollMixin from '@/components/mescroll-uni/mescroll-mixins.js'

export default {
  components: { StationCard },
  mixins: [MescrollMixin],
  data() {
    return {
      dataList: [],
      params: {
        lng: this.$store.getters.location.lng || '',
        lat: this.$store.getters.location.lat || '',
        stationName: ''
      },
      upOption: {
        page: {
          size: 10 // 每页数据的数量,默认10
        },
        noMoreSize: 1 // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
      },
      downOption: {
        native: true
      },
      isSearch: false,
      listQuery: {
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  methods: {
    setValue(e) {
      this.params.stationName = e.detail
    },
    onSearch() {
      this.isSearch = true
      this.mescroll.resetUpScroll()
    },
    upCallback(page) {
      if (this.isSearch) {
        this.listQuery.currentPage = page.num
        // 搜索接口
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

<style lang="scss" scoped>
.container {
  background-color: #f4f4f4;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  .search{
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 99;
  }
  .station-list {
    margin: 130rpx 0 0;
  }
  .all {
    height: 200rpx;
    text-align: center;
  }
}

</style>
