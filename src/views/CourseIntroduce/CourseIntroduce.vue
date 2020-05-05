<template>
  <div id = "CourseIntroduce">
    <Header>
      <span class="iconfont icon-left back" slot="back" @click="back"/>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <div class="introduce">
      <h2>课程简介</h2>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import { mapState } from 'vuex'
export default {
  components: {
    Header
  },
  computde: {
    ...mapState(['courseintroduce'])
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
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
    h2
      position: absolute;
      top: -22px;
      left: 0;
      bottom: 0;
      right: 0;
      margin: 0 auto;
      width: 127px;
      height: 44px;
      background: url('./imgs/titlebg.png') no-repeat;
      color: white;
      font-size: 20px;
      line-height: 52px;
</style>
