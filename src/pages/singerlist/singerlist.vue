<config>
    {"navigationBarTitleText":"歌单",
    "usingComponents":{
    "van-icon":"../../native/lib/vant/icon/index"
    }
    }
</config>
<template>
    <div style="padding-top: 30rpx;background-color:#211135 ">
       <div v-if="songlist.artist" class="flexbox playlist">
            <div style="flex: 2;margin-left: 50rpx;text-align: center;height: 100%">
                <img :src="songlist.artist.picUrl" style="border-radius: 1em;width: 280rpx;height: 100%" alt="">
            </div>
            <div  class="flexbox" style="flex: 3;flex-direction: column;margin-left: 60rpx;margin-right: 60rpx">
                <div style="flex: 1">{{songlist.artist.name}}</div>
                <div style="flex: 1;display: flex;align-items: center">

                   <div style="flex: 3">{{songlist.artist.name}}></div>
               </div>
           </div>
       </div>
<div  class="flexbox" style="justify-content: center;margin: 40rpx 40rpx 40rpx 0">
           <div class="subbox">
               <div><img class="subimg" src="../../native/tabbar/留言.svg" alt=""></div>
          </div>
           <div class="subbox">
           <div><img class="subimg" src="../../native/tabbar/分享.svg" alt=""></div>
           </div>
           <div class="subbox">
              <div><img class="subimg" src="../../native/tabbar/下载.svg" alt=""></div>
           </div>
          <div class="subbox">
             <div><img class="subimg" src="../../native/tabbar/选择-多选.svg" alt=""></div>
          </div>
 </div>
        <!-- 歌单 -->
        <div style="background-color: white;border-radius: 1em 1em 0 0">
            <div style="margin-left: 50rpx;padding-top: 40rpx">
                <div class="flexbox" style="margin-bottom: 40rpx;justify-content: space-between;margin-right: 50rpx">
                    <div style="display: flex;align-items: center">
                        <div>
                            <img class="subimg" src="../../native/tabbar/播放.svg" alt="">
                        </div>
                        <div>
                            <div style="margin-left: 20rpx" @click="playall(0)">播放全部</div>
                        </div>
                    </div>
                    <div>+收藏</div>
                </div>
                <div>
                    <div>
                        <div  v-for="(item,index) in songlist.hotSongs" :key="item.id" @click="playall(index)">
                            <div class="flexbox" style="justify-content: space-around;margin-top: 30rpx">
                                <div style="flex: 1">{{index+1}}</div>
                                <div style="flex: 5">
                                    <div>{{item.name}}</div>
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
  name: 'singerlist',
  data () {
    return {
      songlist: {},
      transid: ''
    }
  },
  methods: {
    playall (index) {
      wx.navigateTo({
        url: `../PlaySong/PlaySong?singlist=true&index=${index}&transid=${this.transid}`
      })
    }
  },
  mounted () {},
  onLoad: function (options) {
    this.transid = options.data
    console.log(options.data)
    this.$fly.get(`/artists?id=${options.data}&limit=10`).then(res => {
      if (res) {
        this.songlist = res.data
        console.log(res.data)
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
