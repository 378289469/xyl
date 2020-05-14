<template>
  <div id="wheel" class="wheel" v-show="isShow">
    <div class="whellItme">
      <div class="icons">
        <span @click="cancel">取消</span>
        <h2>{{title}}</h2>
        <span class="on" @click.stop="done">确定</span>
      </div>
      <textarea v-model="content" placeholder='请输入您要提问的内容'></textarea>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      title: '',
      isShow: false,
      content: '',
      topicId: 0
    }
  },
  computed: {
    ...mapState(['msg'])
  },
  methods: {
    wheel (title, id) {
      this.title = title
      this.isShow = true
      this.topicId = id
    },
    done () {
      const { title, content, topicId, msg } = this
      if (content.trim().length === 0) {
        this.$store.dispatch('tipMsg', { type: 4 }) // type 1加载中  2成功  3失败 4不能为空
        return
      }
      const topicType = title === '打卡' ? 1 : 2
      const evaluate = {
        context: content, // 内容
        isActiorchapter: 1, //
        topicId: topicId, // 章节id
        topicType: topicType, // 1打卡 2提问 3笔记
        parentId: 0 // 父id
        // targetUserId: 0 // 目标用户
      }
      this.$store.dispatch('addEvaluate', evaluate)
      if (msg.trim().length !== 0) {
        this.isShow = false
        this.$store.dispatch('tipMsg', 2)
      } else {
        this.$store.dispatch('tipMsg', 1)
      }
    },
    cancel () {
      this.isShow = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#wheel
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background rgba(0 0 0 .5)
  .whellItme
    position fixed
    bottom 0
    left 0
    width 100%
    height 230px
    background white
    border-radius 10px 10px 0 0
    box-shadow 0 0 8px #050505
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
