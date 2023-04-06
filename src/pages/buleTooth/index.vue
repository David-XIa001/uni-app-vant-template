<template>
  <view class="content">
    <view class="header">
      <view class="avatar" />
      <view class="login" @click="login">点击登录</view>
      <view class="login" @click="blueTooth">连接蓝牙</view>
      <scroll-view scroll-y class="box">
        <view
          v-for="item in blueDeviceList"
          :key="item.deviceId"
          class="item"
          @click="connect(item)"
        >
          <view>
            <text>name: {{ item.name }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello111222s',
      blueDeviceList: [],
      deviceId: '',
      serviceId: ''
    }
  },
  onLoad() {},
  methods: {
    blueTooth() {
      // 初始化蓝牙
      const _this = this
      this.blueDeviceList = []
      uni.openBluetoothAdapter({
        success(res) {
          // 初始化成功 搜索设备
          _this.discovery()
          console.log(res)
        }
      })
    },
    discovery() {
      const _this = this
      uni.startBluetoothDevicesDiscovery({
        success(res) {
          console.log('开始搜索') // 开启监听回调
          wx.onBluetoothDeviceFound(_this.found)
        },
        fail(err) {
          console.log('搜索失败')
          console.error(err)
        }
      })
    },
    found(res) {
      if (res.devices[0].name.indexOf('FOXESS') !== -1) {
        this.blueDeviceList.push(res.devices[0])
      }
    },
    // 连接蓝牙
    connect(row) {
      uni.createBLEConnection({
        deviceId: row.deviceId,
        success(res) {
          (this.deviceId = row.deviceId),
          (this.serviceId = '0000a002-0000-1000-8000-00805f9b34fb')
          // 准备接收消息
          this.getMessage()
          console.log('连接成功')
          console.log(res)
          // 停止搜索
          stopDiscovery()
        },
        fail(err) {
          console.log('连接失败')
          console.error(err)
        }
      })
    },
    getMessage() {
      uni.getBLEDeviceCharacteristics({
        deviceId,
        serviceId,
        success(res) {
          console.log('获取蓝牙特征值', res.characteristics)
          _this.writeId = '0000c304-0000-1000-8000-00805f9b34fb' // 写入id
          _this.notifyId = '0000c305-0000-1000-8000-00805f9b34fb' // 接收id
          _this.startNoticeBle(_this.notifyId) // 7.0,开始侦听数据
        }
      })
    },
    login() {
      uni.navigateTo({
        url: '/pages/login/index'
      })
      //   const login_res = await uni.login({
      //     provider: "weixin", //使用微信登录
      //     success: (res) => {
      //       return res;
      //     },
      //   });
      //   console.log('login_res =', login_res);
    }
  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
