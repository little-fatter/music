<config>
  {
  "navigationBarTitleText":"发现",
  "usingComponents":{
  "van-search":"../native/lib/vant/search/index",
  "van-tabs":"../native/lib/vant/tabs/index",
  "van-tab":"../native/lib/vant/tab/index"
  }
  }
</config>
<template>
  <div>
    <div style="display: flex;justify-content: space-between;margin: 50rpx 40rpx">
      <div style="text-align: center;margin: auto 0;font-size: 30rpx">音乐馆</div>
      <div>
        <van-search type="text"  placeholder="请输入关键词" shape="round" :value="value" @focus="inputfocus" @change="inputvalue"/>
      </div>
      <div v-if="!insearch" style="text-align: center;margin: auto 0;font-size: 30rpx">
        搜索
      </div>
      <div @click="cancelsearch" v-else style="text-align: center;margin: auto 0;font-size: 30rpx">
        取消
      </div>
    </div>
<div v-if="!insearch">
  <!-- 轮播图-->
  <div style="display: flex;justify-content: center">
    <div style="width: 90%">
      <swiper indicator-dots="indicatorDots"
              autoplay="autoplay" interval="5000" duration="500">
        <div v-for="item in banner" :key="item.scm">
          <swiper-item>
            <img :src="item.imageUrl"/>
          </swiper-item>
        </div>
      </swiper>
    </div>
  </div>
  <!-- 导航-->
  <div>
    <div style="display: flex;justify-content: space-around;margin: 40rpx 0 20rpx 30rpx">
      <div v-for="(item,index) in datas" :key="index+1000" style="flex: 1">
        <div style="display: flex;justify-content: center">
          <img :src="item.url" alt="" style="width: 80rpx;height: 80rpx">
        </div>
        <div style="text-align: center;font-size: 34rpx;margin-top: 30rpx">{{item.name}}</div>
      </div>
    </div>
  </div>
  <div>
    <!--  推荐歌单-->
    <div style="margin-top: 100rpx">
      <div style="display: flex;justify-content: space-between;margin: 30rpx">
        <div>推荐歌单</div>
        <div class="commonbuttom">歌单广场</div>
      </div>
      <div>
        <hello :transdata="personalized"></hello>
      </div>
    </div>
    <!--新歌新碟 -->
    <div style="margin-top: 100rpx">
      <div>
        <div style="display: flex;justify-content: space-between;margin: 30rpx">
          <div style="display: flex">
            <div @click="changetype"  :class="flag?'changetype1':'changetype2'">新碟</div>
            <div @click="changetype" :class="!flag?'changetype1':'changetype2'">新歌</div>
          </div>
          <div>
            <div v-if="flag" class="commonbuttom">更多新碟</div>
            <div v-else class="commonbuttom">新歌推荐</div>
          </div>
        </div>
        <div v-if="flag">
          <hello :transdata="newalbum"></hello>
        </div>
        <div v-else>
          <hello :transdata="newsong"></hello>
        </div>
      </div>
    </div>
    <!-- 新势力-->
    <div style="margin-top: 100rpx">
      <div style="display: flex;justify-content: space-between;margin: 30rpx">
        <div>音乐新势力</div>
        <div class="commonbuttom">新音乐</div>
      </div>
      <div>
        <hello :transdata="newtypesong"></hello>
      </div>
    </div>
    <!-- 推荐电台-->
    <div style="margin-top: 100rpx">
      <div style="display: flex;justify-content: space-between;margin: 30rpx">
        <div>推荐电台</div>
        <div class="commonbuttom">电台广场</div>
      </div>
      <div>
        <hello :transdata="djprogram"></hello>
      </div>
    </div>
    <!--推荐节目-->
    <div style="margin-top: 100rpx">
      <div style="display: flex;justify-content: space-between;margin: 30rpx">
        <div>推荐节目</div>
        <div class="commonbuttom">更多节目</div>
      </div>
      <div>
        <hello :transdata="recommend"></hello>
      </div>
    </div>
  </div>
</div>
    <div v-else>
      <div>
      </div>
      <div>
          <div v-if="this.value.length > 0">
            <div v-if="searchresultflag">
              <searchresult :value="this.value"></searchresult>
            </div>
            <div v-else>
              <div v-for="(item,index) in searchkeyword" :key="index+100" @click="searchadd(item.keyword)" style="margin: 30rpx 50rpx">
                {{item.keyword}}
              </div>
            </div>
          </div>
        <div v-else>
            <div v-if="searchhistory.length>0">
                <div style="display: flex;justify-content: space-between;margin: 20rpx">
                    <div>搜索历史</div>
                    <div>清空</div>
                </div>
                <div>
                    <div v-for="(item,index) in searchhistory" :key="index+10"  @click="searchadd(item)">{{item}}</div>
                </div>
            </div>
            <div v-for="(item,index) in searchhot" :key="item.id" style="display: flex;margin: 30rpx" @click="searchadd(item.first)">
                <div :class="index<3?'colors':''">{{index+1}}</div>
                <div :class="index<3?'fonts':''" style="margin-left: 20rpx">{{item.first}}</div>
                <div></div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hello from '../components/HelloWorld'
import searchresult from '../components/searchresult'
export default {
  components: {
    hello,
    searchresult
  },
  data () {
    return {
      searchresultflag: false,
      searchkeyword: [],
      searchhot: [],
      searchhistory: [],
      // input 框值
      value: '',
      // 新歌新碟判断
      flag: true,
      // 轮播图
      banner: [],
      // 推荐歌单
      personalized: [],
      // 新碟
      newalbum: [],
      // 获取新歌
      newtypesong: [],
      // 新势力歌单
      newsong: [],
      // 电台
      djprogram: [],
      // 节目
      recommend: [],
      // 导航
      datas: [
        { name: '每日推荐', url: require('../static/images/推荐.png') },
        { name: '歌单', url: require('../static/images/音乐1.png') },
        { name: '排行榜', url: require('../static/images/排行.png') },
        { name: '电台', url: require('../static/images/电台.png') },
        { name: '直播', url: require('../static/images/直播.png') }
      ],
      // 是否进入搜索
      insearch: false
    }
  },
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
  },
  mounted () {
    this.getdata()
  },
  onLoad (options) {
    // Do some initialize when page load.
  },
  /**
   * for other event handlers, please check https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html
   */
  methods: {
    // 获取首页数据
    getdata () {
      this.$fly.get('/banner').then(res => {
        if (res) {
          this.banner = res.data.banners
        }
      }).catch(err => {
        console.log(err)
      })
      this.$fly.get('/personalized').then(res => {
        this.personalized = res.data.result
      }).catch(err => {
        console.log(err)
      })
      this.$fly.get('/album/newest').then(res => {
        this.newalbum = res.data.albums
      }).catch(err => {
        console.log(err)
      })
      this.$fly.get('/top/song?type=7').then(res => {
        this.newtypesong = res.data.data
      }).catch(err => {
        console.log(err)
      })
      this.$fly.get('/personalized/newsong').then(res => {
        this.newsong = res.data.result
      }).catch(err => {
        console.log(err)
      })
      this.$fly.get('/personalized/djprogram').then(res => {
        this.djprogram = res.data.result
      }).catch(err => {
        console.log(err)
      })
      this.$fly.get('/program/recommend').then(res => {
        this.recommend = res.data.programs
      }).catch(err => {
        console.log(err)
      })
    },
    changetype () {
      this.flag = !this.flag
    },
    cancelsearch () {
      this.insearch = false
      this.value = ''
    },
    inputfocus () {
      this.insearch = true
      this.searchresultflag = false
      this.$fly.get('/search/hot').then(res => {
        this.searchhot = res.data.result.hots
      }).catch(err => {
        console.log(err)
      })
    },
    inputvalue (e) {
      this.value = e.detail
      // this.searchresultflag = false
      this.$fly.get(`/search/suggest?keywords=${this.value}&type=mobile`).then(res => {
        this.searchkeyword = res.data.result.allMatch
      }).catch(err => {
        console.log(err)
      })
    },
    searchadd (item) {
      this.value = item
      this.searchresultflag = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .colors{
    color: darkred;
  }
  .fonts{
    font-weight: bolder;
  }
  img{
    width: 100%;
    height: 100%;
    border-radius: 1em
  }
.commonbuttom{
  padding: 14rpx;
  border-radius: 1em;
  background-color: #f7f7f7;
  font-size: 30rpx;
}
  .changetype1{
    font-size: 50rpx;
    margin-left: 20rpx;
  }
  .changetype2{
    font-size: 30rpx;
    color: #afafaf;
    line-height: 55rpx;
    margin-left: 20rpx;
  }
  /deep/ .van-search{
    width: 230px;
    height: 20px;
  }
</style>
