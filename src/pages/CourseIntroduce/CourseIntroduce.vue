<template>
  <div id = "CourseIntroduce">
    <Header>
      <span class="iconfont icon-left back" slot="back" @click="back"/>
      <img src="./imgs/index.png" alt="title" class="title" slot="title">
    </Header>
    <div class="introduce">
      <h2 class="title">课程简介</h2>
      <div class="conternt">
        <div v-html="courseintroduce"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import routerMain from '../../router/main.js'
export default {
  components: {
    Header
  },
  computed: {
    ...mapState(['courseintroduce'])
  },
  methods: {
    ...routerMain
  },
  mounted () {
    this.$store.dispatch('getCourseIntroduce')
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
      text-align center
    .conternt
      height 92%
      width 92%
      text-align left
      margin-top 35px
      padding 10px
      overflow hidden
      div >>> img
        width 100%!important
        height 50%!important
      div >>> h2
        margin 10px!important
</style>
