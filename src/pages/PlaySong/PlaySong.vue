<template>
    <div>
       <div v-if="newsong">
           <div v-if="tracks[index]">
               <div style="display: flex;justify-content: center;flex-direction: row;flex-wrap: wrap;margin: 50rpx 40rpx 0">
                   <div >{{tracks[index].name}}</div>
                   <div v-if="tracks[index].song.artists[0]" style="color: #afafaf">--{{tracks[index].song.artists[0].name}}</div>
               </div>
           </div>
           <div v-if="tracks[index]">
               <div v-if="tracks[index].song" style="text-align: center;margin: 50rpx;padding: 160rpx 0;">
                   <img :src="tracks[index].song.album.picUrl" alt="" class="xuanzhuan" :class="!show?'stopxz':''" style="width: 500rpx;height: 500rpx;border-radius: 50%">
               </div>
           </div>
       </div>
        <div v-if="playall">
            <div v-if="tracks[index]">
                <div style="display: flex;justify-content: center;flex-direction:row;flex-wrap: wrap;margin: 50rpx 40rpx 0">
                    <div v-if="tracks[index]">{{tracks[index].name}}</div>
                    <div v-if="tracks[index].ar[0]" style="color: #afafaf">--{{tracks[index].ar[0].name}}</div>
                </div>
            </div>
            <div v-if="tracks[index]">
                <div v-if="tracks[index].al" style="text-align: center;margin: 50rpx;padding:160rpx 0;">
                    <img :src="tracks[index].al.picUrl" alt="" class="xuanzhuan" :class="!show?'stopxz':''" style="width: 500rpx;height: 500rpx;border-radius: 50%">
                </div>
            </div>
        </div>
        <div v-if="flag">
            <div v-if="tracks[index]">
                <div style="display: flex;justify-content: center;flex-direction:row;flex-wrap: wrap;margin: 50rpx 40rpx 0">
                    <div v-if="tracks[index]">{{tracks[index].name}}</div>
                    <div v-if="tracks[index].artists[0]" style="color: #afafaf">--{{tracks[index].artists[0].name}}</div>
                </div>
            </div>
            <div v-if="tracks[index]">
                <div v-if="tracks[index].al" style="text-align: center;margin: 50rpx;padding:160rpx 0;">
                    <img :src="tracks[index].al.picUrl" alt="" class="xuanzhuan" :class="!show?'stopxz':''" style="width: 500rpx;height: 500rpx;border-radius: 50%">
                </div>
                <div v-else style="text-align: center;margin: 50rpx;padding:160rpx 0;">
                    <img src="../../static/images/音乐1.png" alt="" class="xuanzhuan" :class="!show?'stopxz':''" style="width: 500rpx;height: 500rpx;border-radius: 50%">
                </div>
            </div>
        </div>
        <div v-if="singlist">
            <div v-if="tracks[index]">
                <div style="display: flex;justify-content: center;flex-direction:row;flex-wrap: wrap;margin: 50rpx 40rpx 0">
                    <div v-if="tracks[index]">{{tracks[index].name}}</div>
                    <div v-if="tracks[index].ar[0]" style="color: #afafaf">--{{tracks[index].ar[0].name}}</div>
                </div>
            </div>
            <div v-if="tracks[index]">
                <div v-if="tracks[index].al" style="text-align: center;margin: 50rpx;padding:160rpx 0;">
                    <img :src="tracks[index].al.picUrl" alt="" class="xuanzhuan" :class="!show?'stopxz':''" style="width: 500rpx;height: 500rpx;border-radius: 50%">
                </div>
                <div v-else style="text-align: center;margin: 50rpx;padding:160rpx 0;">
                    <img src="../../static/images/音乐1.png" alt="" class="xuanzhuan" :class="!show?'stopxz':''" style="width: 500rpx;height: 500rpx;border-radius: 50%">
                </div>
            </div>
        </div>
        <div></div>
        <div style="display: flex;justify-content: space-around">
            <div>收藏</div>
            <div>下载</div>
            <div>评论</div>
            <div>更多</div>
        </div>
        <div>
            <div>
                <slider
                        :value="currenttimes"
                        :max="max"
                        min="0"
                        backgroundColor="#00bfff"
                        color="#00bfff"
                        block-size="12"
                        block-color="#00bfff"
                        show-value="true"
                        @change="changetime"
                        @changing="changingtime"
                ></slider>
            </div>
        </div>
        <div style="margin-top: 50rpx;display: flex;justify-content: space-around;background-color: green">
            <div v-if="playindex === 1" @click="changeplayindex" style="text-align: center">
                <img class="imgs" src="../../native/imgs/随机.png" alt="">
                <div>随机播放</div>
            </div>
            <div v-if="playindex === 2" @click="changeplayindex" style="text-align: center">
                <img class="imgs" src="../../native/imgs/循环.png" alt="">
                <div>列表循环</div>
            </div>
            <div v-if="playindex === 3" @click="changeplayindex" style="text-align: center">
                <img class="imgs" src="../../native/imgs/单曲循环_32.png" alt="">
                <div>单曲循环</div>
            </div>
            <div @click="infrontsong" style="text-align: center">
                <img class="imgs" src="../../native/imgs/上一首上一个.png" alt="">
                <div>上一首</div>
            </div>
            <div v-if="show" @click="stopmusic" style="text-align: center">
                <img class="imgs" src="../../native/imgs/暂停.png" alt="">
                <div>暂停</div>
            </div>
            <div v-else @click="restartmusic" style="text-align: center">
                <img class="imgs" src="../../native/imgs/播放song.png" alt="">
                <div>开始</div>
            </div>
            <div @click="nextsong" style="text-align: center">
                <img class="imgs" src="../../native/imgs/048操作_下一首.png" alt="">
                <div>下一首</div>
            </div>
            <div style="text-align: center">
                <img class="imgs" src="../../native/imgs/列表.png" alt="">
                <div>歌单详情</div>
            </div>
        </div>
    </div>
</template>

<script>
const innerAudioContext = wx.createInnerAudioContext()
export default {
  name: 'PlaySong',
  data () {
    return {
      playindex: 1, // 播放方式 1 随机 2 列表循环 3 单曲循环
      show: true,
      index: '',
      transid: '',
      tracks: [],
      newsong: false,
      trackIDs: [],
      playall: '',
      flag: '',
      singlist: '',
      max: '',
      currenttimes: ''
    }
  },
  methods: {
    stopmusic () {
      this.show = false
      innerAudioContext.pause()
    },
    restartmusic () {
      this.show = true
      innerAudioContext.play()
    },
    getsong () {
      this.$fly.get(`/song/url?id=${this.tracks[this.index].id}`).then(res => {
        this.trackIDs = res.data.data
        innerAudioContext.src = this.trackIDs[0].url
        innerAudioContext.autoplay = true
        innerAudioContext.onTimeUpdate(() => {
          this.currenttimes = innerAudioContext.currentTime
          this.max = innerAudioContext.duration
          // console.log(innerAudioContext.currentTime)
          // console.log(innerAudioContext.duration)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    nextsong () {
      let length = this.tracks.length
      if (this.playindex === 1) {
        let index = Math.floor(Math.random() * length)
        this.index = index
      } else {
        this.index === length - 1 ? this.index = 0 : this.index++
      }
      innerAudioContext.stop()
      this.getsong()
    },
    infrontsong () {
      let length = this.tracks.length
      if (this.playindex === 1) {
        let index = Math.floor(Math.random() * length)
        this.index = index
      } else {
        this.index === 0 ? this.index = length - 1 : this.index--
      }
      innerAudioContext.stop()
      this.getsong()
    },
    changeplayindex () {
      if (this.playindex === 3) {
        this.playindex = 1
      } else {
        this.playindex++
      }
    },
    changetime (e) {
      // innerAudioContext.stop()
      console.log(e.detail.value)
      let num = parseInt(e.detail.value)
      innerAudioContext.seek(num)
      innerAudioContext.onSeeked(() => {
        console.log(1)
      })
      innerAudioContext.onSeeking(() => {
        console.log(2)
      })
      // this.currenttimes = e.detail.value
    },
    changingtime (e) {
      // innerAudioContext.stop()
      this.currenttimes = e.detail.value
    }
  },
  mounted () {
    innerAudioContext.onEnded(() => {
      let length = this.tracks.length
      if (this.playindex === 1) {
        let index = Math.floor(Math.random() * length)
        this.index = index
        innerAudioContext.stop()
      }
      if (this.playindex === 2) {
        this.index === length - 1 ? this.index = 0 : this.index++
        innerAudioContext.stop()
      }
      if (this.playindex === 3) {
        this.index = this.index
        innerAudioContext.stop()
      }
      innerAudioContext.stop()
      console.log(innerAudioContext)
      this.getsong()
    })
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onPause(() => {
      console.log('暂停播放')
    })
  },
  onLoad: function (options) {
    if (options.data) {
      this.playall = true
      this.transid = options.data
      this.index = options.index
      this.$fly.get(`/playlist/detail?id=${options.data}`).then(res => {
        if (res) {
          this.tracks = res.data.playlist.tracks
          this.getsong()
        }
      }).catch(err => {
        console.log(err)
      })
    }
    if (options.newsong) {
      this.index = options.index
      this.newsong = options.newsong
      this.$fly.get('/personalized/newsong').then(res => {
        this.tracks = res.data.result
        this.getsong()
      }).catch(err => {
        console.log(err)
      })
    }
    if (options.flag) {
      this.index = options.index
      this.flag = options.flag
      this.$fly.get(`/search?keywords=${options.value}&type=1&limit=10`).then(res => {
        this.tracks = res.data.result.songs
        this.getsong()
      }).catch(err => {
        console.log(err)
      })
    }
    if (options.singlist) {
      this.index = options.index
      this.singlist = options.singlist
      this.$fly.get(`/artists?id=${options.transid}`).then(res => {
        this.tracks = res.data.hotSongs
        this.getsong()
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
    @keyframes xuanzhuan  {
        from {
            transform: rotate(0deg);
        }to{
        transform: rotate(360deg);
                 }
    }
    .xuanzhuan {
        animation: xuanzhuan 25s linear infinite;
    }
    .stopxz{
        animation-play-state: paused;
    }
    .imgs {
        width: 60rpx;
        height: 60rpx;
        margin: 30rpx 0;
    }
</style>
