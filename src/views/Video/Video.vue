<template>
  <div id="video">
    <Header>
      <span class="iconfont icon-left back" slot="back" @click="back"/>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
     <video-player
     ref="videoPlayer"
     :options="playerOptions"
     :playsinline="true"
     customEventName="customstatechangedeventname"
     @play="onPlayerPlay($event)"
     @pause="onPlayerPause($event)"
     @ended="onPlayerEnded($event)"
     @waiting="onPlayerWaiting($event)"
     @playing="onPlayerPlaying($event)"
     @loadeddata="onPlayerLoadeddata($event)"
     @timeupdate="onPlayerTimeupdate($event)"
     @canplay="onPlayerCanplay($event)"
     @canplaythrough="onPlayerCanplaythrough($event)"
     @statechanged="playerStateChanged($event)"
     @ready="playerReadied">
    ></video-player>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import { videoPlayer } from 'vue-video-player'
import video_zhCN from '../../../public/json/zh-CN.json'  // eslint-disable-line

export default {
  data () {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          src: ''
          // require( "E:\\java\\WorkSpace\\ISPER_UI_9_19\\src\\views\\business\\progress\\video\\bunn.mp4" )//url地址
        }],
        poster: '', // 你的封面地址
        // width: document.documentElement.clientWidth, // 播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }

    }
  },
  components: {
    Header,
    videoPlayer
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    onPlayerPlay (player) { // 监听播放
      console.log(player)
      // this.$refs.videoPlayer.player.play();
    },
    onPlayerPause (player) { // 监听暂停
      console.log(player)
      // this.$refs.videoPlayer.player.pause();
    },
    playerStateChanged (player) { // 监听播放状态改变
      // console.log(player);
    },
    onPlayerEnded (player) { // 监听媒体是否已到达结尾，播放完
      // console.log(player);
    },
    onPlayerWaiting (player) { // DOM元素上的readyState更改导致播放停止。
      // console.log(player);
    },
    onPlayerPlaying (player) { // 媒体不再被禁止播放，并且已开始播放。
      // console.log(player);
    },
    onPlayerLoadeddata (player) { // 当播放器在当前播放位置下载数据时触发
      // console.log(player);
    },
    onPlayerTimeupdate (player) { // 当前播放位置发生变化时触发。
      console.log(player.cache_.currentTime)
    },
    onPlayerCanplay (player) { // 媒体的readyState为HAVE_FUTURE_DATA或更高
      // console.log('player Canplay!', player)
    },
    // 媒体的readyState为HAVE_ENOUGH_DATA或更高。这意味着可以在不缓冲的情况下播放整个媒体文件。
    onPlayerCanplaythrough (player) {
      // console.log('player Canplaythrough!', player)
    },
    // 将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
    playerReadied (player) {
      // this.sources.src = require( "E:\\java\\WorkSpace\\ISPER_UI_9_19\\src\\views\\business\\progress\\video\\bunn.mp4" )
      player.currentTime(45.279074)	// 视频开始播放的时间
    }
  },
  mounted () {
    const url = this.$route.params.url
    this.playerOptions.sources[0].src = url
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#video
  position absolute
  top 110px
  left 0
  right 0
  margin 0 auto
  width 345px
  height 85%
  background url('./imgs/bg.png') no-repeat
</style>
