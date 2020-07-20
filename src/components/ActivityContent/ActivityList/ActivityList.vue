<template>
  <div id="activitylist">
    <slot name="top" class="top"></slot>
    <Search class="search" @Search="getActivity"/>
    <div class="activitys" ref="bsWrapper" >
      <ul class="list" >
        <li v-for="(activity ,index) in searchActivitys" :key="index" @click="hand('ActivityDetail', activity)">
          <h3 class="ellipsis">{{activity.activityName}}</h3>
          <span class="iconfont icon-date btn icon3"></span>
          <span class="time">{{activity.activityStart}}---{{activity.activityEnd}}</span>
        </li>
      </ul>
    </div>
    <tip/>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'
import { mapState } from 'vuex'
import routerMain from '../../../router/main.js'
import tip from '../../Tip/tip'
import Search from '../../Search/Search'

BScroll.use(Pullup)
BScroll.use(PullDown)

export default {
  data () {
    return {
      page: 1,
      count: 0
    }
  },
  components: {
    tip,
    Search
  },
  computed: {
    ...mapState(['searchActivitys'])
  },
  mounted () {
    this.$store.dispatch('reqActivitys', { page: this.page, cb: this.cb })
    this.initBscroll()
  },
  methods: {
    ...routerMain,
    cb () {
      if (this.searchActivitys.length === 0) {
        this.count = this.page - 1
        this.page = this.count
        this.$store.dispatch('reqActivitys', { page: this.page, cb: this.cb })
      }
      if (this.searchActivitys.length < 9 && this.searchActivitys.length !== 0 && this.page !== 1) {
        this.$store.dispatch('tipMsg', {
          tips: { type: 5, msg: '当前是最后一页' }
        }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
        this.count = this.page - 1
        this.page = this.count
      }
      this.bscroll && this.bscroll.scrollTo(0, 0)
      this.bscroll.finishPullDown()
      this.bscroll.finishPullUp()
    },
    initBscroll () {
      this.bscroll = new BScroll(this.$refs.bsWrapper, {
        pullUpLoad: {
          threshold: 50, // 下拉距离
          stop: 50 // 停止距离
        },
        click: true,
        pullDownRefresh: {
          threshold: 50, // 下拉距离
          stop: 50 // 停止距离
        }
      })
      this.bscroll.on('pullingDown', () => {
        if (this.page === 1) {
          this.$store.dispatch('tipMsg', {
            tips: { type: 5, msg: '当前是第一页' }
          }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
          this.page = 1
          return
        }
        this.page -= 1
        this.$store.dispatch('reqActivitys', { page: this.page, cb: this.cb })
      })
      this.bscroll.on('pullingUp', () => {
        this.page += 1
        this.$store.dispatch('reqActivitys', { page: this.page, cb: this.cb })
      })
    },
    getActivity (text) {
      this.$store.dispatch('reqActivitys', { activityName: text })
    },
    hand (path, pram) {
      // window.localStorage.setItem('activityPage', this.page)
      // console.log(pram)
      // window.localStorage.setItem('activityID', pram.id)
      window.localStorage.setItem('navGuide', 2)
      const activity = JSON.stringify(pram)
      window.localStorage.setItem('activity', activity)
      this.to(path, pram)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#activitylist
  position absolute
  width 88%
  height 236px
  display flex
  flex-direction column
  top 10px
  left 50%
  transform translateX(-50%)
  border-radius 5px
  box-shadow 0 0 5px #802529
  background white
  .search
    background-color #f3efe8;
    width 90%;
    margin-left 16px
    margin-top 10px
    margin-bottom 10px
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
    margin-top 10px
    height 90%
    overflow hidden
    ul
      height 150%
      margin-left 16px
      line-height 30px
      text-align left
      color #828282
      .page
        text-align center
        color #888
      li
        list-style none
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
