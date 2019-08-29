<template>
  <div class="hello">
      <div style="display: flex;flex-wrap: wrap">
        <div v-for="(item,index) in transdata.slice(0,6)" :key="item.id" class="box">
            <div style="border-radius: 1em;position: relative">
              <div v-if="item.picUrl" @click="onclick(item)">
                <img :src="item.picUrl" alt="" >
              </div>
              <div v-if="item.album" >
                <img  :src="item.album.picUrl" alt="">
              </div>
              <div v-if="item.song" @click="clicksong(index)">
                <img :src="item.song.album.picUrl" alt="">
              </div>
              <div v-if="item.coverUrl">
                <img  :src="item.coverUrl" alt="">
              </div>
              <div v-if="item.playCount" class="playcount"><img src="../static/imgs/播放_空心.svg" alt="" style="width: 26rpx;height: 26rpx">{{parseInt(item.playCount/10000)}}万</div>
            </div>
            <div class="name">
              {{item.name}}
            </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    transdata: {
      type: Array
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    onclick (item) {
      wx.navigateTo({
        url: `../pages/Songlist/Songlist?data=${item.id}`
      })
    },
    clicksong (index) {
      wx.navigateTo({
        url: `../pages/PlaySong/PlaySong?newsong=true&index=${index}`
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 100%;
  height: 200rpx;
  border-radius: 0.5em
}
  .name {
    font-size: 30rpx;
    height: 30rpx;
    overflow: hidden;
    padding: 10rpx 4rpx;
    margin: 10rpx 0
  }
  .box {
    width: 32%;
    margin-left: 10rpx;
    margin-top: 20rpx
  }
  .playcount{
    position: absolute;
    top: 10rpx;
    right: 16rpx;
    font-size: 24rpx;
    color: white;
    font-weight: bolder
  }
</style>
