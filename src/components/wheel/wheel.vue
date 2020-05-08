<template>
  <div id="wheel" class="wheel">
    <div class="whellItme">
      <div class="icons">
        <span>取消</span>
        <h2>提问</h2>
        <span class="on">确定</span>
      </div>
      <textarea placeholder='请输入您要提问的内容'></textarea>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      bs: ''
    }
  },
  mounted () {
    this.bs = new BScroll('#wheel')// eslint-disable-line
  },
  methods: {
    wheel () {
      this.bs.scrollBy(0, -630, 500)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#wheel
  position fixed
  bottom -230px
  left 0
  width 100%
  height 0px
  background white
  border-radius 10px 10px 0 0
  box-shadow 0 0 8px #050505
  .whellItme
    height 230px
    .icons
      display flex
      justify-content space-around
      height 45px
      border-radius 10px 10px 0 0
      border-bottom 1px solid #E2E2E4
      background-color white
      span,h2
        display block
        color #828282
        font-size 13px
        line-height 45px
      .on
        color #902225
      h2
        margin 0 50px
        color #333333
        font-size 15px
        font-weight bolder
    textarea
      width 100%
      height 183px
      border none
      padding 15px
      font-size 15px
</style>
