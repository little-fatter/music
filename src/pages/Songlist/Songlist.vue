<config>
    {"navigationBarTitleText":"歌单",
    "usingComponents":{
        "van-icon":"../../native/lib/vant/icon/index"
    }
    }
</config>
<template>
    <div style="padding-top: 30rpx;background-color:#211135 ">
                <div v-if="songlist.playlist" class="flexbox playlist">
            <div style="flex: 2;margin-left: 50rpx;text-align: center;height: 100%">
                <img :src="songlist.playlist.coverImgUrl" style="border-radius: 1em;width: 280rpx;height: 100%" alt="">
            </div>
            <div  class="flexbox" style="flex: 3;flex-direction: column;margin-left: 60rpx;margin-right: 60rpx">
                <div style="flex: 1">{{songlist.playlist.name}}</div>
                <div style="flex: 1;display: flex;align-items: center" v-if="songlist.playlist.creator">
                    <div style="flex: 1" >
                        <img style="width: 60rpx;height: 60rpx;border-radius: 50%;" :src="songlist.playlist.creator.avatarUrl" alt="">
                    </div>
                    <div style="flex: 3">{{songlist.playlist.creator.nickname}}></div>
                </div>
                <div style="flex: 1;overflow: hidden;font-size: 24rpx">{{songlist.playlist.description}}</div>
            </div>
        </div>
        <div v-if="songlist.playlist" class="flexbox" style="justify-content: center;margin: 40rpx 40rpx 40rpx 0">
            <div class="subbox">
                <div><img class="subimg" src="../../static/imgs/留言.svg" alt=""></div>
                <div style="color: #fafafb">{{songlist.playlist.commentCount}}</div>
                </div>
            <div class="subbox">
                <div><img class="subimg" src="../../static/imgs/分享.svg" alt=""></div>
                <div style="color: #fafafb">{{songlist.playlist.shareCount}}</div>
             </div>
            <div class="subbox">
                <div><img class="subimg" src="../../static/imgs/下载.svg" alt=""></div>
                <div style="color: #fafafb">下载</div>
                </div>
            <div class="subbox">
                <div><img class="subimg" src="../../static/imgs/选择-多选.svg" alt=""></div>
                <div style="color: #fafafb">多选</div>
                </div>
        </div>
        <div style="background-color: white;border-radius: 1em 1em 0 0">
            <div style="margin-left: 50rpx;padding-top: 40rpx">
                <div class="flexbox" style="margin-bottom: 40rpx;justify-content: space-between;margin-right: 50rpx">
                    <div style="display: flex;align-items: center">
                        <div>
                            <img class="subimg" src="../../static/imgs/播放.svg" alt="">
                        </div>
                        <div v-if="songlist.playlist">
                            <div style="margin-left: 20rpx" v-if="songlist.playlist.tracks"  @click="playall">播放全部（共{{songlist.playlist.tracks.length}}首）</div>
                        </div>
                    </div>
                    <div v-if="songlist.playlist">+收藏({{songlist.playlist.subscribedCount}})</div>
                </div>
                <div>
                    <div v-if="songlist.playlist">
                        <div  v-for="(item,index) in songlist.playlist.tracks" :key="item.id"  @click="intoplaysong(index)">
                            <div class="flexbox" style="justify-content: space-around;margin-top: 30rpx">
                                <div style="flex: 1">{{index+1}}</div>
                                <div style="flex: 5">
                                    <div>{{item.name}}</div>
                                    <div class="flexbox" style="font-size: 24rpx;color: #afafaf;justify-content: left;overflow: hidden">
                                        <div style="overflow: hidden">{{item.ar[0].name}} -</div>
                                        <div style="overflow: hidden"> {{item.al.name}}</div>
                                    </div>
                                </div>
                                <div style="flex: 1;">
                                    <van-icon name="play-circle-o" size="50rpx"></van-icon>
                                </div>
                                <div style="flex: 1">
                                    <van-icon name="more-o" size="50rpx"></van-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Songlist',
  props: {
  },
  data () {
    return {
      songlist: {},
      transid: ''
    }
  },
  methods: {
    intoplaysong (index) {
      wx.navigateTo({
        url: `../PlaySong/PlaySong?data=${this.transid}&index=${index}`
      })
    },
    playall () {
      wx.navigateTo({
        url: `../PlaySong/PlaySong?data=${this.transid}&index=0`
      })
    }
  },
  mounted () {
  },
  onLoad: function (options) {
    this.transid = options.data
    this.$fly.get(`/playlist/detail?id=${options.data}`).then(res => {
      if (res) {
        this.songlist = res.data
      }
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>

<style scoped>
.flexbox {
    display: flex;
}
    .subimg{
        width: 40rpx;
        height: 40rpx;
    }
    .subbox{
        flex: 1;
        margin-left: 40rpx;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center
    }
    .playlist{
        margin-top: 40rpx;
        height: 260rpx;
        color: #fafafb
    }
</style>
