<template>
  <div id = "CourseIntroduce">
    <Header>
      <span class="iconfont icon-left back" slot="back" @click="back"/>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <div class="introduce">
      <div class="conternt">
          <div class="tools">
              <bk-button :theme="'default'" type="submit" :title="'基础按钮'" @click.stop="prePage" class="mr10"> 上一页</bk-button>
              <bk-button :theme="'default'" type="submit" :title="'基础按钮'" @click.stop="nextPage" class="mr10"> 下一页</bk-button>
              <div class="page">{{pageNum}}/{{pageTotalNum}} </div>
              <bk-button :theme="'default'" type="submit" :title="'基础按钮'" @click.stop="clock" class="mr10"> 顺时针</bk-button>
              <bk-button :theme="'default'" type="submit" :title="'基础按钮'" @click.stop="counterClock" class="mr10"> 逆时针</bk-button>
          </div>
          <pdf ref="pdf" :src="url" :page="pageNum" :rotate="pageRotate" @progress="loadedRatio = $event"
          @page-loaded="pageLoaded($event)"  @num-pages="pageTotalNum=$event" @error="pdfError($event)"
          @link-clicked="page = $event"></pdf>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import pdf from 'vue-pdf'
export default {
  data () {
    return {
      // url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
      url: 'http://192.168.5.56:8096//3c4ea9f890e8da152257fb74e6799bd6.pdf',
      pageNum: 1,
      pageTotalNum: 1,
      pageRotate: 0,
      // 加载进度
      loadedRatio: 0,
      curPageNum: 0,
      dataType: 'jsonp',
      crossDomain: true
    }
  },
  components: {
    Header,
    pdf
  },
  computed: {
    ...mapState(['courseintroduce'])
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    // 上一页函数，
    prePage () {
      var page = this.pageNum
      page = page > 1 ? page - 1 : this.pageTotalNum
      this.pageNum = page
    },
    // 下一页函数
    nextPage () {
      var page = this.pageNum
      page = page < this.pageTotalNum ? page + 1 : 1
      this.pageNum = page
    },
    // 页面顺时针翻转90度。
    clock () {
      this.pageRotate += 90
    },
    // 页面逆时针翻转90度。
    counterClock () {
      this.pageRotate -= 90
    },
    // 页面加载回调函数，其中e为当前页数
    pageLoaded (e) {
      this.curPageNum = e
    },
    // 其他的一些回调函数。
    pdfError (error) {
      console.error(error)
    }
  },
  mounted () {
    new BScroll('.conternt') // eslint-disable-line
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#CourseIntroduce
  position absolute
  width 100%
  height 100%
  .introduce
    position absolute
    top 110px
    left 0
    right 0
    margin 0 auto
    width 345px
    height 85%
    background url('./imgs/bg.png') no-repeat
    .title
      position: absolute
      top: -22px
      left: 0
      bottom: 0
      right: 0
      margin: 0 auto
      width: 127px
      height: 44px
      background: url('./imgs/titlebg.png') no-repeat
      color: white
      font-size: 20px
      line-height: 52px
    .conternt
      height 92%
      text-align left
      margin-left -36px
      margin-top 35px
      padding 10px
      overflow hidden
      div >>> img
        width 100%!important
        height 50%!important
      div >>> h2
        margin 10px!important
</style>
