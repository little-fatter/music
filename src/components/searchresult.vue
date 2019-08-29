<config>
    {
    "usingComponents":{
    "van-tabs":"../native/lib/vant/tabs/index",
    "van-tab":"../native/lib/vant/tab/index"
    }
    }
</config>
<template>
    <div>
        <van-tabs  @change="onClick" value="active" >
            <van-tab title="单曲">
                <div class="box">
                    <div style="display: flex" class="margins" v-for="(item,index) in binddata.songs" :key="item.id" @click="intoplaysong(index)">
                        <div style="flex: 5">
                            <div >{{item.name}}</div>
                            <div  class="smallmargins">
                                <span>
                                    {{item.artists[0].name}}
                                </span>
                                <span>
                                   {{item.name}}
                                </span>
                            </div>
                        </div>
                        <div style="flex: 1">
                            播放
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="专辑">
                <div class="box">
                    <div style="display: flex" class="margins" v-for="item in binddata.albums" :key="item.id">
                        <div style="flex: 5">
                            <div >{{item.name}}</div>
                            <div class="smallmargins">
                                <span>
                                    {{item.artist.name}}
                                </span>
                                <span>
                                   {{item.name}}
                                </span>
                            </div>
                        </div>
                        <div style="flex: 1">
                            播放
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="歌手">
                <div class="box">
                <div v-for="item in binddata.artists" class="margins" :key="item.id">
                    <div>
                        <div>{{item.name}}</div>
                        <div class="smallmargins">
                            <img :src="item.picUrl" alt="">
                        </div>
                    </div>
                </div>
            </div>
            </van-tab>
            <van-tab title="歌单">
                <div class="box">
                    <div style="display: flex;height: 140rpx;overflow: hidden" class="margins" v-for="item in binddata.playlists" :key="item.id">
                        <div style="flex: 1">
                            <img :src="item.coverImgUrl" alt="">
                        </div>
                        <div style="flex: 5">
                            <div >{{item.name}}</div>
                            <div class="smallmargins">
                                {{item.description}}
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="用户">
                <div class="box">
                    <div style="display: flex;height: 140rpx;overflow: hidden" class="margins" v-for="item in binddata.userprofiles" :key="item.id">
                        <div style="flex: 1">
                            <img :src="item.avatarUrl" alt="">
                        </div>
                        <div style="flex: 5">
                            <div >{{item.nickname}}</div>
                            <div class="smallmargins">
                                {{item.signature}}
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="mv">
                <div class="box">
                    <div style="display: flex;height: 140rpx;overflow: hidden" class="margins" v-for="item in binddata.mvs" :key="item.id">
                        <div style="flex: 1">
                            <img :src="item.cover" alt="">
                        </div>
                        <div style="flex: 5">
                            <div >{{item.name}}</div>
                            <div class="smallmargins">
                                <span>
                                    {{item.artistName}}
                                </span>
                                <span>
                                   {{item.playCounte}}次播放
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="电台">
                <div class="box">
                    <div style="display: flex;height: 140rpx;overflow: hidden" class="margins" v-for="item in binddata.djRadios" :key="item.id">
                        <div style="flex: 1">
                            <img :src="item.picUrl" alt="">
                        </div>
                        <div style="flex: 5">
                            <div >{{item.name}}</div>
                            <div class="smallmargins">
                                {{item.desc}}
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="综合">
                <div class="box">
                    <div>
                        <div>你可能感兴趣</div>
                        <div style="display: flex" v-if="binddata.artist">
                            <div style="flex: 1">
                                <img :src="binddata.artist.artists[0].picUrl" alt="">
                            </div>
                            <div style="flex: 4">
                                <div v-if="binddata.artist.artists[0]">
                                    歌手：{{binddata.artist.artists[0].name}}({{binddata.artist.artists[0].alia[0]}})
                                </div>
                                <div style="display: flex">
                                    <div>
                                        粉丝:
                                    </div>
                                    <div>
                                        歌曲:
                                    </div>
                                    <div>
                                        专辑:
                                    </div>
                                </div>
                            </div>
                            <div style="flex: 1"> > </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>单曲</div>
                            <div>播放全部</div>
                        </div>
                        <div v-if="binddata.song">
                            <div style="display: flex" class="margins" v-for="item in binddata.song.songs" :key="item.id">
                                <div style="flex: 4">
                                    <div>{{item.name}}</div>
                                    <div>
                                        <span>{{item.ar[0].name}}</span>
                                        <span>{{item.al.name}}</span>
                                    </div>
                                </div>
                                <div style="flex: 1">
                                    播放
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
export default {
  name: 'searchresult',
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      type: [1, 10, 100, 1000, 1002, 1004, 1009, 1018],
      active: 0,
      binddata: []
    }
  },
  methods: {
    getsearchresult () {
      this.$fly.get(`/search?keywords=${this.value}&type=${this.type[this.active]}&limit=10`).then(res => {
        this.binddata = res.data.result
      }).catch(err => {
        console.log(err)
      })
    },
    onClick (title) {
      this.active = title.detail.index
      this.getsearchresult()
    },
    intoplaysong (item) {
      console.log(item)
      wx.navigateTo({
        url: `../pages/PlaySong/PlaySong?value=${this.value}&flag=true&index=${item}`
      })
    }
  },
  mounted () {
    this.getsearchresult()
  }
}
</script>

<style scoped>
img {
    width: 100rpx;
    height: 100rpx;
}
    .margins {
     margin-top: 40rpx;
    }
    .smallmargins {
        margin-top: 20rpx;
    }
    .box {
        margin: 5rpx 10rpx;
        padding: 20rpx;
    }
</style>
