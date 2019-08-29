<template>
    <div>
            <div v-for="items in list" :key="items.id" style="display: flex;align-items: center" @click="singerclick(items)">
                <div style="flex: 1;text-align: center;margin: auto 0;padding: 20rpx">
                    <img style="width: 100rpx;height: 100rpx;border-radius: 50%" :src="items.img1v1Url" alt="">
                </div>
                <div style="flex: 4;padding-left: 30rpx">{{items.name}}</div>
            </div>
    </div>
</template>

<script>
export default {
  name: 'Songlists',
  props: {
    transdata: {
      type: String
    }
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    getdata (id) {
      this.$fly.get(`/artist/list?cat=${id}`).then(res => {
        if (res) { this.list = res.data.artists }
      }).catch(err => {
        console.log(err)
      })
    },
    singerclick (items) {
      wx.navigateTo({
        url: `../singerlist/singerlist?data=${items.id}`
      })
    }
  },
  mounted () {
    if (this.transdata) { this.getdata(this.transdata) }
  }
}
</script>

<style scoped>

</style>
