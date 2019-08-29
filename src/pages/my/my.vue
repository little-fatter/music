<config>
    {
    "navigationBarTitleText":"歌手",
    "usingComponents":{
    "van-tab":"../../native/lib/vant/tab/index",
    "van-tabs":"../../native/lib/vant/tabs/index"
    }
    }
</config>
<template>
<div>
    <van-tabs v-model="active" swipeable >
        <van-tab v-for="(item) in singer" :key="item.id" :title="item.name" >
<Song :transdata="item.id"></Song>
        </van-tab>
    </van-tabs>
</div>
</template>

<script>
import Song from '../../components/Songlists'
export default {
  components: {
    Song
  },
  data () {
    return {
      singer: [
        { name: '入驻歌手', id: 5001 },
        { name: '华语男歌手', id: 1001 },
        { name: '华语女歌手', id: 1002 },
        { name: '华语组合/乐队', id: 1003 },
        { name: '欧美男歌手', id: 2001 },
        { name: '欧美女歌手', id: 2002 },
        { name: '欧美组合/乐队', id: 2003 },
        { name: '日本男歌手', id: 6001 },
        { name: '日本女歌手', id: 6002 },
        { name: '日本组合/乐队', id: 6003 },
        { name: '韩国男歌手', id: 7001 },
        { name: '韩国女歌手', id: 7002 },
        { name: '韩国组合/乐队', id: 7003 },
        { name: '其他男歌手', id: 4001 },
        { name: '其他女歌手', id: 4002 },
        { name: '其他组合/乐队', id: 4003 }
      ], // 歌单列表
      active: 0
    }
  },
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
  },
  mounted () {
  },
  onLoad (options) {
    // Do some initialize when page load.
  },
  /**
   * for other event handlers, please check https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/page.html
   */
  methods: {
  }
}
</script>

<style lang="scss">

</style>
