<template>
  <div id="activity">
    <slot name="top" class="top"></slot>
    <ul class="list">
      <li>
          <h3 class="ellipsis">由陈淼洋、刘晗带来朗诵《海上船夫歌》诵读马克思</h3>
          <span class="iconfont icon-date btn icon3"></span>
          <span class="time">2020.04.07 10:00-10:05</span>
      </li>
      <li>
          <h3 class="ellipsis">由陈淼洋、刘晗带来朗诵《海上船夫歌》诵读马克思</h3>
          <span class="iconfont icon-date btn icon3"></span>
          <span class="time">2020.04.07 10:00-10:05</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: String
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
  ul
    margin-left 16px
    height 63px
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
