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
            <pdf  v-for="i in numPages" :key="i" :src="url" :page="i"></pdf>
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
      numPages: []
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
    //   // const pdfReader = this.api.require('androidPdfReader')
    //   // pdfReader.openView({
    //   //   rect: {
    //   //     x: 0,
    //   //     y: 0,
    //   //     w: 'auto',
    //   //     h: 'auto'
    //   //   },
    //   //   path: url,
    //   //   fixedOn: this.api.frameName,
    //   //   fixed: true
    //   // }, ret => {
    //   //   alert(JSON.stringify(ret))
    //   // })
    },
    wheel (id) {
      this.ansIsOn = id === 1
      this.signIsOn = id === 2
      const title = id === 1 ? '提问' : '打卡'
      this.$refs.wheel.wheel(title, this.pdfFile.id)
    }
  },
  mounted () {
    this.getNumPages(this.url)
    // this.$store.dispatch('checkToken', {
    //   token: this.token,
    //   cb: () => {
    //     if (this.isToken) {
    //       this.$store.dispatch('getNote', { mainId: this.$page.pageParam && this.$page.pageParam().id })
    //     } else {
    //       this.to('UserLogin', {}, '')
    //     }
    //   }
    // })
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
    position absolute
    top 110px
    left 0
    right 0
    margin 0 auto
    width 345px
    height 85%
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
</style>
