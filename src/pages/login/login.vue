<config>
    {
    "navigationBarTitleText":"登录",
    "navigationBarBackgroundColor":"#ff0000",
    "navigationBarTextStyle":"white"
    }
</config>
<template>
<div>
    <div class="loginbox">
        <div style="display: flex;justify-content: center">
            <img style="width: 160rpx;height: 160rpx" src="../../static/images/音乐1.png" alt="">
        </div>
        <div style="width: 100%;display: flex;justify-content: center">
            <div class="phonelogin" @click="intophonelogin">手机号登录</div>
        </div>
        <div class="chooselogin">
            <div style="flex: 1;color: white">微信登录</div>
            <div style="flex: 1;color: white">QQ登录</div>
            <div style="flex: 1;color: white">微博登录</div>
            <div style="flex: 1;color: white">网易登录</div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
    }
  },
  methods: {
    intophonelogin () {
      wx.navigateTo({
        url: './phonelogin'
      })
    }
  },
  created () {
  }
}
</script>

<style scoped>
    .loginbox{
        width: 100%;
        height: 100%;
        min-height: 100vh;
        background-color: #ff0000;
        padding-top: 400rpx;
        box-sizing: border-box;
    }
    .chooselogin{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 40rpx;
        text-align: center;
    }
    .phonelogin{
        width: 80%;
        border-radius: 2em;
        color: #c62f2f;
        background-color: white;
        margin-top: 400rpx;
        height: 90rpx;
        padding: 20rpx;
        box-sizing: border-box;
        text-align: center;
        font-size: 35rpx;
    }
</style>
