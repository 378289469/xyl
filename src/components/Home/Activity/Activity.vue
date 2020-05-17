<template>
  <div id="activity">
    <slot name="top" class="top"></slot>
    <div class="activitys" ref="bsWrapper" >
      <ul class="list" >
        <li v-for="(activity ,index) in all? searchActivitys : Activitys" :key="index" @click="to('ActivityDetail', {activity})">
          <h3 class="ellipsis">{{activity.activityName}}</h3>
          <span class="iconfont icon-date btn icon3"></span>
          <span class="time">{{activity.activityStart}}---{{activity.activityEnd}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import BScroll from '@better-scroll/core'
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
import routerMain from '../../../router/main.js'

export default {
  data () {
    return {
      all: false,
      page: 1,
      config: {
        scrollY: true,
        pullDownRefresh: {
          threshold: 50, // 下拉距离
          stop: 30 // 回弹距离
        },
        pullUpLoad: true
      }
    }
  },
  computed: {
    ...mapState(['searchActivitys']),
    Activitys () {
      return this.searchActivitys.slice(0, 10)
    }
  },
  created () {
    this.bs = null
  },
  mounted () {
    if (this.all) {
      component: () => import('../views/PDF/PDF.vue')
      const  PullDown =  (PullDown) => {
        import PullDown from '@better-scroll/pull-up'
        return PullDown
      }
      const Pullup = (Pullup) => {
        import Pullup from '@better-scroll/pull-up'
        return Pullup
      }
      BScroll.use(Pullup)
      BScroll.use(PullDown)
      this.initBscroll(this.config)
    } else {
      this.initBscroll()
    }
  },
  methods: {
    ...routerMain,
    ActivityAll () {
      this.all = true
    },
    cb () {
      this.bscroll.finishPullDown()
      this.bscroll.refresh()
    },
    initBscroll (config) {
      this.bscroll = new BScroll(this.$refs.bsWrapper, config)
      this.bscroll.on('pullingDown', () => {
        if (this.page < 2) {
          return
        }
        this.page -= 1
        this.$store.dispatch('reqActivitys', { page: this.page, cb: this.cb })
      })
      this.bscroll.on('pullingUp', () => {
        this.page += 1
        this.$store.dispatch('reqActivitys', { page: this.page, cb: this.cb })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#activity
  position absolute
  width 345px
  height 236px
  display flex
  flex-direction column
  top 375px
  left 15px
  border-radius 5px
  box-shadow 0 0 5px #802529
  background white
  .top
    display flex
    align-items center
    width 315px
    height 46px
    margin-left 16px
    border-bottom 1px solid #70160B
    .icon1
      width 10px
      height 10px
      border 1px solid #802529
      transform rotate(45deg)
    .icon2
      width 8px
      height 8px
      margin-left -3px
      background-color  #802529
      transform rotate(45deg)
    h2
      margin-left 6px
      font-size 15px
      font-weight  bolder
      color #802529
    .more,.btn
      margin-left 165px
      font-size 12px
      color #828282
    .btn
      margin-left 6px
  .activitys
    height 90%
    overflow hidden
    ul
      margin-left 16px
      line-height 30px
      text-align left
      color #828282
      li
        width 315px
        border-bottom 1px solid #EAEAEA
      li:last-child
        border-bottom none
      h3
        width 315px
        font-size 14px
      .icon3
        margin-left 0
      .time
        margin-left 6px
        font-size 12px
</style>
