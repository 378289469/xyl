<template>
  <div id="tip" v-show="tipShow">
      <span class="iconfont" :class="tipClass[tips.type[0]]"></span>
      <p>{{tipText[tips.type[0]]}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      tipShow: false,
      tipClass: ['', 'icon-load', 'icon-success', 'icon-fail', 'icon-fail', 'icon-fail'],
      tipText: ['', '数据加载中', '提交成功', '提交失败', '请输入内容']
    }
  },
  computed: {
    ...mapState(['modules']),
    tips () {
      return this.modules.tips // type 1加载中  2成功  3失败 4不能为空 5自定义消息
    }
  },
  watch: {
    tips () {
      clearInterval(intervalID) // eslint-disable-line
      const { tips } = this
      if (tips.type[0] * 1 === 5) {
        this.tipText = ['', '数据加载中', '提交成功', '提交失败', '请输入内容']
        this.tipText.push(tips.msg || '添加成功')
      }
      this.tipShow = true
      var intervalID = setTimeout(() => {
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
  padding 10px
  width 120px
  height 120px
  background rgba(0 0 0 .5)
  text-align center
  span
    color white
    font-size 40px
    line-height 90px
  p
    color white
    font-size 20px
    margin-top -10px
</style>
