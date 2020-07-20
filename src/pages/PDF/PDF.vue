<template>
  <div id = "PDF">
    <Header>
      <span class="iconfont icon-left back" slot="back" @click="back('Study')"/>
      <img src="../../../public/imgs/Study.png" alt="title" class="title" slot="title"/>
    </Header>
    <div class="PDFwrap">
      <div class="PDFconternt">
        <div class="pages">
          <div class="pdf">
            <div class="main">
              <pdf :src="url" :page="currentPage" @progress="loadedRatio = $event" @num-pages="pageCount=$event" @page-loaded="currentPage=$event" @loaded="loadPdfHandler" ref="wrapper" class="pdf"></pdf>
            </div>
          </div>
        </div>
        <div class="tips">
          <div>
           <div v-for="(note,index) in notes" :key="index" class="tip" >
             <span v-html="note.context"></span>
           </div>
          </div>
        </div>
      </div>
    </div>
    <ul class="footers" v-show="btns">
      <li :class="{select:idx==0}" @touchstart="idx=0" @touchend="idx=-1" @click="scaleD">
        <p>放大</p>
      </li>
      <li :class="{select:idx==1}" @touchstart="idx=1" @touchend="idx=-1" @click="scaleX">
        <p>缩小</p>
      </li>
      <li :class="{select:idx==2}" @touchstart="idx=2" @touchend="idx=-1" @click="changePdfPage(0)">
        <p>上一页</p>
      </li>
      <li :class="{select:idx==3}" @touchstart="idx=3" @touchend="idx=-1" @click="changePdfPage(1)">
        <p>下一页</p>
      </li>
    </ul>
    <div class="btns">
      <span class="btn"  :class="{on:ansIsOn}" @click="wheel(1)">提问</span>
      <span class="btn" :class="{on:signIsOn}" @click="wheel(2)">打卡</span>
    </div>
    <wheel ref="wheel"/>
    <tip/>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import wheel from '../../components/Wheel/wheel'
import tip from '../../components/Tip/tip'
import pdf from 'vue-pdf'
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import routerMain from '../../router/main.js'

// const loadingTask = pdf.createLoadingTask(this.url)

export default {
  data () {
    return {
      // url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
      ansIsOn: false,
      signIsOn: false,
      numPages: [],
      currentPage: 1,
      pageCount: 0,
      scale: 100, // 放大系数
      idx: -1,
      clauseTitle: '',
      loadedRatio: 0,
      btns: true
    }
  },
  components: {
    Header,
    pdf,
    wheel,
    tip
  },
  computed: {
    ...mapState(['notes', 'modules', 'isToken']),
    // token () {
    //   return this.$api.getStorage('userinfo')
    // },
    pdfFile () {
      return JSON.parse(window.localStorage.getItem('pdf'))
    },
    url () {
      return this.pdfFile.url
      // return 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'
    }
  },
  methods: {
    ...routerMain,
    getNumPages (url) {
      const loadingTask = pdf.createLoadingTask(url)
      loadingTask.then(pdf => {
        this.url = loadingTask
        this.numPages = pdf.numPages
      }).catch(err => {
        console.log(err, 'pdf加载失败')
      })
    },
    wheel (id) {
      this.ansIsOn = id === 1
      this.signIsOn = id === 2
      const title = id === 1 ? '提问' : '打卡'
      this.$refs.wheel.wheel(title, this.pdfFile.id)
    },
    changePdfPage (val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++
      }
    },
    // pdf加载时
    loadPdfHandler (e) {
      this.currentPage = 1 // 加载的时候先加载第一页
    },
    // 放大
    scaleD () {
      this.scale += 5
      this.$refs.wrapper.$el.style.width = parseInt(this.scale) + '%'
    },
    // 缩小
    scaleX () {
      if (this.scale === 100) {
        return
      }
      this.scale += -5
      this.$refs.wrapper.$el.style.width = parseInt(this.scale) + '%'
    }
  },
  mounted () {
    this.getNumPages(this.url)
    new BScroll('.PDFwrap', {// eslint-disable-line
      scrollX: true,
      scrollY: false
    })
    new BScroll('.pages')// eslint-disable-line
    new BScroll('.tips')// eslint-disable-line
  },
  updated () {
    new BScroll('.PDFwrap', {// eslint-disable-line
      scrollX: true,
      scrollY: false
    })
    new BScroll('.pages')// eslint-disable-line
    new BScroll('.tips')// eslint-disable-line
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#PDF
  position absolute
  width 100%
  height 100%
  .PDFwrap
    padding-top: 50px
    position absolute
    top 110px
    left 0
    right 0
    margin 0 auto
    width 345px
    height 80%
    background url('../../../public/imgs/bg.png') no-repeat
    overflow hidden
    .PDFconternt
      display flex
      width 200%
      padding 10px
      .pages,.tips
        height 690px
        width 50%
      .pdf,.tip
        width 90%
        padding 10px
      .tip
        margin-left 15px
        span>>>p
          width 100%
          word-break break-all
          text-align left
        span>>>img
          width 90%
  .btns
    display flex
    justify-content space-around
    position fixed
    width 100%
    bottom 0px
    background #FFEBC0
    padding 6px
    .btn
      display block
      width 40%
      height 45px
      color #6C0B0D
      border 1px solid #6C0B0D
      border-radius 22px
      font-size 15px
      line-height 45px
      text-align center
    .on
      background #6C0B0D
      color #FFEBC0
 .footers
    position: fixed
    top: 130px
    width: 92%
    height: 20px
    display: flex
    left 50%
    transform translateX(-50%)
    z-index: 100
    color: #6c0b0d
    li
      text-align: center
      flex: 1
      p
        border-right: 1px solid #f0f0f0
    li:last-child
      p
        border-right: 0 none
</style>
