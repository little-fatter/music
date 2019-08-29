<template>
    <div>
        <div>
            <div v-if="flag" style="text-align: center">
                <div>登录网易云音乐</div>
                <div>手机电脑多端同步，尽享海量高品质音乐</div>
                <div @click="intologin" class="loginbutton">
                    立即登录
                </div>
            </div>
            <div v-else>123</div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      flag: ''
    }
  },
  methods: {
    intologin () {
      wx.navigateTo({
        url: '../login/login'
      })
    }
  },
  onLoad (options) {
  },
  onShow (options) {
    let id = wx.getStorageSync('userid')
    console.log(id)
    if (!id) {
      this.flag = true
      this.$fly.get(`/user/detail?uid=${id}`).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    } else {
      this.flag = false
    }
  },
  created () {
  }
}
</script>

<style scoped lang="scss">
    div {
        margin-top: 15rpx;
    }
    .loginbutton{
        width: 90%;
        padding: 20rpx 0;
        border-radius: 2em;
        border: 1px solid #afafaf;
        margin: 15rpx auto;
    }
</style>
