import App from './App'
import Vue from 'vue'
import VHtmlPlugin from '@megalo/vhtml-plugin'
import Vuex from 'vuex'

const Fly = require('./native/lib/fly/wx')
const fly = new Fly
fly.config.baseURL = 'http://116.62.234.172:3000'

Vue.use(VHtmlPlugin)
Vue.use(Vuex)

const store = require('./store').default
Vue.prototype.$store = store
Vue.prototype.$fly = fly

const app = new Vue(App)

app.$mount()

export default {
  config: {
    // pages 的首个页面会被编译成首页
    pages: [
      'pages/hello',
      'pages/my/my',
      'pages/vuex/vuex',
      'pages/Songlist/Songlist',
      'pages/SongSquare/SongSquare',
      'pages/PlaySong/PlaySong',
      'pages/singerlist/singerlist',
      'pages/login/login',
      'pages/login/phonelogin',
      'pages/login/checked',
      'pages/User/User'
    ],
    tabBar: {
      color: '#333',
      selectedColor: '#007d37',
      list: [
        {
          pagePath: 'pages/hello',
          text: '发现',
          iconPath: 'native/tabbar/home.png',
          selectedIconPath: 'native/tabbar/home_on.png'
        },
        {
          pagePath: 'pages/my/my',
          text: '歌手',
          iconPath: 'native/tabbar/mine.png',
          selectedIconPath: 'native/tabbar/mine_on.png'
        },
        {
          pagePath: 'pages/vuex/vuex',
          text: '我的',
          iconPath: 'native/tabbar/vue.png',
          selectedIconPath: 'native/tabbar/vue_on.png'
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      // navigationBarTitleText: 'megalo project',
      navigationBarTextStyle: 'black'
    }
  }
}
