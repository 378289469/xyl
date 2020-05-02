<template>
  <div id="course">
    <h2>课程介绍</h2>
    <img src="./imgs/person.png" alt="person">
    <p>《资本论》（全称《资本论：政治经济学批判》）是德国思想家卡尔·海因里希·马克思创作的政治经济学著作，1867—1894年分为三卷出版
      <span>全文</span>
    </p>
    <div>
      <h3>55</h3>
    </div>
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
#course
  position absolute
  top 112px
  left 14px
  width 346px
  height 248px
  background url(./imgs/bg.png) no-repeat
  h2
    position absolute
    top -22px
    left 0
    bottom 0
    right 0
    margin 0 auto
    width 127px
    height 44px
    background url(./imgs/title.png) no-repeat
    color white
    font-size 20px
    line-height 52px
  img
    display block
    position absolute
    top 33px
    left 11px
  p
    position absolute
    top 33px
    right 14px
    width 212px
    height 106px
    color #333333
    text-align left
    font-size 14px
    line-height 22px
    span
      color #914800
  div
    position absolute
    left 9px
    bottom 2px
    width 329px
    height 88px
    background url(./imgs/study.png)
    h3
      position absolute
      left 182px
      top 45px
      color #3D0804
</style>
