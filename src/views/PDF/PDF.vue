<template>
  <div id = "PDF">
    <Header>
      <span class="iconfont icon-left back" slot="back" @click="back"/>
      <img src="./imgs/title.png" alt="title" class="title" slot="title"/>
    </Header>
    <div class="PDFwrap">
      <div class="PDFconternt">
        <div class="pages">
          <div class="pdf">
            <pdf  v-for="i in Pages" :key="i" :src="url" :page="i"></pdf>
          </div>
        </div>
        <div class="tips">
          <div>
           <div v-for="(note,index) in notes " :key="index" class="tip">{{note.context}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="btns">
      <span class="btn on"  @click="wheel">提问</span>
      <span class="btn">打卡</span>
    </div>
    <wheel ref="wheel"/>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import wheel from '../../components/wheel/wheel'
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import pdf from 'vue-pdf'
export default {
  data () {
    return {
      url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
      // url: this.$route.params.url,
      Pages: 2
    }
  },
  components: {
    Header,
    pdf,
    wheel
  },
  computed: {
    ...mapState(['notes'])
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    getNumPages (url) {
      var loadingTask = pdf.createLoadingTask(url)
      loadingTask.then(pdf => {
        this.url = loadingTask
        this.Pages = pdf.numPages
      }).catch(() => {})
    },
    wheel () {
      this.$refs.wheel.wheel()
    }
  },
  mounted () {
    this.getNumPages(this.url)
    this.$store.dispatch('getNote', this.$route.params.id)
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
    background url('./imgs/bg.png') no-repeat
    overflow hidden
    .PDFconternt
      display flex
      width 200%
      padding 10px
      .pages,.tips
        height 690px
      .pdf
        width 50%
      .tip
        width 50%
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
    .on
      background #6C0B0D
      color #FFEBC0
</style>
