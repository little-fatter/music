<template>
    <div>
<!--        <div v-if="unlogin" style="display: flex;justify-content: center;flex-direction: column">-->
<!--            <div>登录网易云音乐</div>-->
<!--            <div>手机电脑多端同步，尽享海量高品质音乐</div>-->
<!--            <div @click="intologin" style="width: 90%;padding: 20rpx 0;border-radius: 1em">-->
<!--                立即登录-->
<!--            </div>-->
<!--        </div>-->
<!--        <div v-else>-->
<!--        </div>-->
    </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      unlogin: false
    }
  },
  methods: {
    intologin () {
      wx.navigateTo({
        url: '../login/login'
      })
    }
  }
}
</script>

<style scoped>

</style>
