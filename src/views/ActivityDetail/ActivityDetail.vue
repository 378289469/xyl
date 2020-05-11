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
          <h3 v-if="ad.title">{{ad.title}}</h3>
        </div>
        <div class="detail" v-if="ad.content === 0" >
            <p>{{activity.activityContext}}</p>
        </div>
        <div class="task" v-if="ad.content === 1" >
            <div>
              <p v-for="(task, index) in tasks" :key="index">{{task}}</p>
            </div>
        </div>
        <div class="media" v-if="ad.content === 2" >
          <viewer class="imgWrap" :images="PdfFile">
            <img v-for="(pdf, index) in PdfFile" :src="pdf.path" :key="index">
          </viewer>
          <video-player  class="video-player vjs-custom-skin"
            ref="videoPlayer" 
            :playsinline="true" 
            :options="playerOptions"
          ></video-player>
        </div>
      </div>
      <button>提问</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import Header from '../../components/Header/Header'

export default {
  data () {
    return {
      playerOptions: {
        height: 400,
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: require("@/assets/vedio.mp4") // url地址
          }
        ],
        poster: require("@/assets/poster.png"), // 你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      },
    }
  },
  components: {
    Header
  },
  computed: {
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
        { title: `${this.activity.activityStart}一${this.activity.activityEnd}`, tag: '时间：' },
        { content: 1, tag: '任务：' },
        { content: 2, tag: '附件：' }
      ]
      return ActivityDetail
    },
    tasks () {
      return this.$route.params.activity.activityTask.split('-')
    },
    ...mapState(['PdfFile'])
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    go () {
      this.Isclick = !this.Isclick
    }
  },
  mounted () {
    const id = this.$route.params.activity.id
    this.$store.dispatch('getPdfFile', { mainId: id, id: 2 })
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
