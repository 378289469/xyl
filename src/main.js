import Vue from 'vue'
import Viewer from 'v-viewer'
import 'video.js/dist/video-js.css'
import '../public/css/viewer.css'
import VuevideoPlayer from 'vue-video-player'
import '../public/css/video-js.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.use(Viewer)
Viewer.setDefaults({
  Options: {
    // 启用inline模式/显示右上角关闭按钮/显示缩略图导航/显示当前图片标题/显示工具栏/显示缩放百分比/图片是否可移动
    // 图片是否可缩放/图片是否可旋转/图片是否可翻转/使用CSS3过渡/播放时是否全屏/是否支持键盘设置大图片的url
    'inline': true, // eslint-disable-line
    'button': true, // eslint-disable-line
    'navbar': true, // eslint-disable-line
    'title': true, // eslint-disable-line
    'toolbar': true, // eslint-disable-line
    'tooltip': true, // eslint-disable-line
    'movable': true, // eslint-disable-line
    'zoomable': true, // eslint-disable-line
    'rotatable': true, // eslint-disable-line
    'scalable': true, // eslint-disable-line
    'transition': true, // eslint-disable-line
    'fullscreen': true, // eslint-disable-line
    'keyboard': true, // eslint-disable-line
    'url': "data-source" // eslint-disable-line
  }
})

Vue.use(VuevideoPlayer)
