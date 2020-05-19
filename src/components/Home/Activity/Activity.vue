<template>
  <div id="activity">
    <slot name="top" class="top"></slot>
    <div class="activitys" >
      <ul class="list" >
        <li v-for="(activity ,index) in Activitys" :key="index" @click="hand(activity)">
          <h3 class="ellipsis">{{activity.activityName}}</h3>
          <span class="iconfont icon-date btn icon3"></span>
          <span class="time">{{activity.activityStart}}---{{activity.activityEnd}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
import routerMain from '../../../router/main.js'

export default {
  computed: {
    ...mapState(['searchActivitys']),
    Activitys () {
      let Activitys = []
      if (this.searchActivitys.length > 0) {
        Activitys = this.searchActivitys.slice(0, 10)
      }
      return Activitys
    }
  },
  mounted () {
    this.$store.dispatch('reqActivitys', { page: 1 })
    new BScroll('.activitys') // eslint-disable-line
  },
  updated () {
    new BScroll('.activitys') // eslint-disable-line
  },
  methods: {
    ...routerMain,
    hand (activity) {
      this.$store.dispatch('getPdfFile', {
        mainId: activity.id,
        id: 2,
        cb: () => this.$store.dispatch('activity', {
          activity,
          cb: () => this.to('ActivityDetail', { activity })
        })
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
