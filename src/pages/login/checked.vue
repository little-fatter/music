<config>
    {
    "navigationBarTitleText":"手机号登录",
    "usingComponents":{
    "van-dialog":"../../native/lib/vant/dialog/index"
    }
    }
</config>
<template>
    <div>
        <van-dialog id="van-dialog" />
        <div v-if="flag" style="margin-top: 50rpx">
            <div style="margin: 70rpx 35rpx;font-size: 35rpx;">
                <input type="text" v-model="value"
                       style="margin-left: 40rpx;
                   border-bottom: 1px solid #afafaf;padding-bottom: 20rpx"
                       password="true"
                       auto-focus
                       placeholder="输入密码">
            </div>
        </div >
        <div v-else style="margin-top: 50rpx">
            <div style="display: flex;justify-content: space-around;flex-direction: row">
                <div class="divitem">{{checkednum[0]}}</div>
                <div class="divitem">{{checkednum[1]}}</div>
                <div class="divitem">{{checkednum[2]}}</div>
                <div class="divitem">{{checkednum[3]}}</div>
                <input type="number" focus class="smallinput" v-model="checkednum" maxlength="4">
            </div>
        </div>
        <div style="display: flex;width: 100%;justify-content: center;margin-top: 70rpx">
            <div class="phonelogin" @click="tonext">立即登录</div>
        </div>
    </div>
</template>

<script>
import Dialog from '../../native/lib/vant/dialog/dialog'
export default {
  name: 'checked',
  data () {
    return {
      value: '',
      phone: '',
      flag: '',
      checkednum: ''
    }
  },
  methods: {
    tonext () {
      console.log(1)
      if (this.flag) {
        this.$fly.get(`/login/cellphone?phone=${this.phone}&password=${this.value}`).then(res => {
          console.log(res)
          if (res.data.code === 200) {
            wx.setStorageSync('userid', res.data.account.id)
            // wx.navigateTo({
            //   url: '../vuex/vuex'
            // })
          }
        }).catch(err => {
          Dialog.alert({ message: err.response.data.msg }).then(() => {
            this.value = ''
          })
        })
      }
    }
  },
  onLoad (options) {
    this.flag = options.flag
    this.phone = options.phone
    // Do some initialize when page load.
  },
  watch: {
    // 'value': () => {
    //   this.value = this.value.replace(/\s*/g, '')
    // }
  }
}
</script>

<style scoped>
    .phonelogin{
        width: 90%;
        border-radius: 2em;
        color: white;
        background-color: #ff0000;
        height: 70rpx;
        line-height: 70rpx;
        box-sizing: border-box;
        text-align: center;
        font-size: 35rpx;
        z-index: 100;
    }
    .smallinput{
        position: fixed;
        width: 100%;
        outline: none;
        color: transparent;
         text-shadow: 0 0 0 transparent;
        height: 100vh
    }
    .divitem {
        width: 100rpx;
        height: 80rpx;
        opacity: 0.8;
        border-bottom: solid 1px red;
        text-align: center;
        font-size: 60rpx;
    }
</style>
