<config>
    {
    "navigationBarTitleText":"手机号登录",
    "usingComponents":{
    "van-field ":"../../native/lib/vant/field/index",
    "van-cell-group ":"../../native/lib/vant/cell-group/index"
    }
    }
</config>
<template>
<div>
    <div style="margin-left: 30rpx">
        <div style="font-size: 28rpx;color: #afafaf;margin-top: 70rpx">未注册手机号登录后将自动创建账号</div>
        <div style="display: flex;border-bottom: 1px solid #afafaf;margin-top: 70rpx">
<!--<div>-->
<!--    <van-cell-group>-->
<!--        <van-field-->
<!--                v-model="phone"-->
<!--                label="手机号"-->
<!--                placeholder="请输入手机号"-->
<!--                error-message="手机号格式错误"-->
<!--        />-->
<!--        <van-field-->
<!--                v-model="password"-->
<!--                label="密码"-->
<!--                placeholder="请输入密码"-->
<!--                error-->
<!--        />-->
<!--    </van-cell-group>-->
<!--</div>-->
                        <div style="font-weight: bolder">+86</div>
            <div>
                <input type="number" style="padding-left: 30rpx"
                       v-model="value" auto-focus
                       maxlength="11" placeholder="输入手机号">
            </div>
        </div>
    </div>
    <div style="display: flex;width: 100%;justify-content: center;margin-top: 70rpx">
        <div class="phonelogin" @click="tonext">下一步</div>
    </div>
</div>
</template>

<script>
export default {
  name: 'phonelogin',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    tonext () {
      if (this.value.length === 11) {
        this.$fly.get(`/cellphone/existence/check?phone=${this.value}`).then(res => {
          if (res.data.code === 200) {
            if (res.data.exist >= 0) {
              wx.navigateTo({
                url: `./checked?phone=${this.value}&flag='true'`
              })
            } else {
              this.$fly.get(`/captcha/sent?phone=${this.value}`).then((res) => {
                if (res) {
                  wx.navigateTo({
                    url: `./checked?phone=${this.value}&flag='false'`
                  })
                }
              }).catch(err => {
                console.log(err)
              })
            }
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
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
    }
</style>
