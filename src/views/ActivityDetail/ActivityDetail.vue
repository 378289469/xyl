<template>
  <div>
    <Header>
      <span class="iconfont icon-left back" slot="back" @click="back"/>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <div id="ActivityDetail">
      <div class="content" v-for="(ad, index) in ActivityDetail" :key="index">
        <div class="title">
          <span>{{ad.tag}}</span>
          <h3 class="ellipsis" v-if="ad.title">{{ad.title}}</h3>
        </div>
        <div class="detail" v-if="ad.content === 0" >
            <p>{{activity.activityContext}}</p>
        </div>
        <div class="task" v-if="ad.content === 1" >
            <div>
              <p v-for="(task, index) in taskDir" :key="index">{{task}}</p>
            </div>
        </div>
        <div class="media" v-if="ad.content === 2" >
          <viewer class="imgWrap" :images="PdfFile">
            <img v-for="(pdf, index) in pdfFiles" :src="pdf.url" :key="index" @click="hand(index)">
            <video-player  v-if="vPlayer" class="video-player-box"
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
          </viewer>
        </div>
      </div>
      <button @click="wheel('提问')">提问</button>
      <wheel ref="wheel"/>
      <tip/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import { videoPlayer } from 'vue-video-player'
import video_zhCN from '../../../public/json/zh-CN.json'  // eslint-disable-line
import Header from '../../components/Header/Header'
import wheel from '../../components/Wheel/wheel'
import tip from '../../components/Tip/tip'
import routerMain from '../../router/main.js'

export default {
  data () {
    return {
      vPlayer: false,
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
    wheel,
    tip,
    videoPlayer
  },
  computed: {
    ...mapState(['PdfFile', 'CourseChapter']),
    player () {
      return this.$refs.videoPlayer.player
    },
    activity () {
      const activity = this.$route.params.activity
      const id = activity.id
      this.$store.dispatch('getPdfFile', { mainId: id, id: 2 })
      return activity
    },
    ActivityDetail () {
      let ActivityDetail = []
      ActivityDetail = [
        { title: this.activity.activityName, tag: '名称：' },
        { content: 0, tag: '内容：' },
        { title: `${this.activity.activityStart.slice(0, 10)}一${this.activity.activityEnd.slice(0, 10)}`, tag: '时间：' },
        { content: 1, tag: '任务：', title: `${this.tasks[0]}----------${this.tasks[1]}` },
        { content: 2, tag: '附件：' }
      ]
      return ActivityDetail
    },
    tasks () {
      return this.$route.params.activity.activityTask.split('-')
    },
    taskDir () {
      const taskDir = []
      const start = this.tasks[0]
      const end = this.tasks[1]
      const startDir = this.CourseChapter.filter(cc => cc.chapterPath === start)
      const endtDir = this.CourseChapter.filter(cc => cc.chapterPath === end)
      if (startDir.length === 1) {
        taskDir.push(startDir[0].chapterName)
      }
      if (endtDir.length === 1) {
        taskDir.push(endtDir[0].chapterName)
      }
      return taskDir
    },
    pdfFiles () {
      const pdfFiles = this.PdfFile
      pdfFiles.forEach(pf => {
        if (pf.suffix === 'mp4' || pf.suffix === 'MP4' || pf.suffix === 'Mp4' || pf.suffix === 'mP4') {
          pf.url = require('./imgs/video.png')
        } else {
          pf.url = pf.path
        }
      })
      return pdfFiles
    }
  },
  methods: {
    ...routerMain,
    wheel (title) {
      this.$refs.wheel.wheel(title, this.activity.id)
    },
    hand (index) {
      const { pdfFiles } = this
      if (pdfFiles[index].suffix === 'mp4' || pdfFiles[index].suffix === 'MP4' || pdfFiles[index].suffix === 'Mp4' || pdfFiles[index].suffix === 'mP4') {
        event.stopPropagation()
        this.playerOptions.sources[0].src = pdfFiles[index].path
        console.log(pdfFiles[index].path)
        this.vPlayer = true
      }
    },
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
    const id = this.$route.params.activity.id
    this.$store.dispatch('getPdfFile', { mainId: id, id: 2 })
    this.$store.dispatch('getCourseChapter')
    new BScroll('.detail') // eslint-disable-line
    new BScroll('.task') // eslint-disable-line
    new BScroll('.media', {// eslint-disable-line
      scrollX: true,
      scrollY: false
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#ActivityDetail
  position absolute
  top 110px
  left 0
  right 0
  margin 0 auto
  width 345px
  height 85%
  background url('./imgs/bg.png') no-repeat
  .content
    width 90%
    margin auto
    .title
      display flex
      padding 15px
      background-color #FFEAD0
      border-radius 5px
      margin-top 16px
      font-size 14px
      span
       color #925F25
       font-weight bolder
      h3
        width 80%
        font-weight bold
    .detail,.task,.media
      height 74px
      padding 15px
      text-align left
      background-color #FFF4E2
      box-shadow 0 0 1px #D7702D
      overflow hidden
      p
        font-size 14px
        color #333333
        line-height 25px
    .task
      height 92px
    .media
      display flex
      height 80px
      padding 10px 5px
      box-sizing border-box
      .imgWrap
        display flex
        height 80px
        img
          width 90px
          height 60px
          margin 5px
        video-player
          width 100%
          height 100%
  button
    position absolute
    bottom 10px
    left 0
    right 0
    margin 0 auto
    color #FFF6C1
    width 90%
    height 45px
    border-radius 22px
    background-color #6C0B0D
</style>
