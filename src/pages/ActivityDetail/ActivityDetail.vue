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
import Header from '../../components/Header/Header'
import wheel from '../../components/Wheel/wheel'
import tip from '../../components/Tip/tip'
import routerMain from '../../router/main.js'
import Viewer from 'v-viewer/src/component.vue'

export default {
  components: {
    Header,
    wheel,
    tip,
    Viewer
  },
  computed: {
    ...mapState(['PdfFile', 'CourseChapter', 'modules', 'isToken']),
    token () {
      return this.$api.getStorage('userinfo')
    },
    activity () {
      return this.$page.pageParam().activity
    },
    ActivityDetail () {
      const { activity } = this
      const ActivityDetail = [
        { title: activity.activityName, tag: '名称：' },
        { content: 0, tag: '内容：' },
        { title: `${activity.activityStart.slice(0, 10)}一${activity.activityEnd.slice(0, 10)}`, tag: '时间：' },
        { content: 1, tag: '任务：', title: `${this.tasks[0]}----------${this.tasks[1]}` },
        { content: 2, tag: '附件：' }
      ]
      return ActivityDetail
    },
    tasks () {
      return this.activity.activityTask.split('-')
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
      const videoPaths = pdfFiles.filter(pf => pf.url === require('./imgs/video.png'))
      if (pdfFiles[index].suffix === 'mp4' || pdfFiles[index].suffix === 'MP4' || pdfFiles[index].suffix === 'Mp4' || pdfFiles[index].suffix === 'mP4') {
        event.stopPropagation()
        const pageParam = {
          url: pdfFiles[index].path,
          videoPaths
        }
        this.to('Video', pageParam, this.token)
      }
    }
  },
  mounted () {
    this.$store.dispatch('checkToken', {
      token: this.token,
      cb: () => {
        if (this.isToken) {
          this.$store.dispatch('getPdfFile', {
            mainId: this.$page.pageParam().activity.id,
            id: 2,
            cb: () => {
              new BScroll('.media', {// eslint-disable-line
                scrollX: true,
                scrollY: false
              })
            }
          })
        } else {
          this.to('UserLogin', {}, '')
        }
      }
    })
    this.$store.dispatch('getCourseChapter')
    new BScroll('.detail') // eslint-disable-line
    new BScroll('.task') // eslint-disable-line
  },
  updated () {
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
