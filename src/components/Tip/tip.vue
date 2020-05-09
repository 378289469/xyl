<template>
  <div id="tip" v-show="tipShow">
      <span class="iconfont" :class="tipClass[tipType]"></span>
      <p>{{tipText[tipType]}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      tipShow: false,
      tipClass: ['', 'icon-load', 'icon-success', 'icon-fail', 'icon-fail'],
      tipText: ['', '数据加载中', '提交成功', '提交失败', '请输入内容']
    }
  },
  computed: {
    ...mapState(['modules']),
    tipType () {
      return this.modules.tipType // type 1加载中  2成功  3失败 4不能为空
    }
  },
  watch: {
    tipType () {
      this.tipShow = true
      setTimeout(() => {
        this.tipShow = false
      }, 2000)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#tip
  position absolute
  bottom 0
  left 0
  top 0
  right 0
  margin auto
  width 120px
  height 120px
  background rgba(0 0 0 .5)
  span
    color white
    font-size 40px
    line-height 90px
  p
    color white
    font-size 20px
    margin-top -10px
</style>
