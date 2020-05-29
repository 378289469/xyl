<template>
  <div id="index">
    <Header>
      <img src="./imgs/index.png" alt="title" class="title" slot="title">
    </Header>
    <Course class="CourseClass"/>
    <Activity class="ActivityClass">
      <div class="top" slot="top" @click="hand('Activity')">
        <span class="icon1"></span>
        <span class="icon2"></span>
        <h2>活动内容</h2>
        <span class="more">查看更多</span>
        <span class="iconfont icon-right btn"></span>
      </div>
    </Activity>
    <Teachers class="TeachersClass"/>
    <FooterGuide/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../../components/Header/Header'
import Course from '../../components/Home/Course/Course'
import Activity from '../../components/Home/Activity/Activity'
import Teachers from '../../components/Home/Teachers/Teachers'
import routerMain from '../../router/main.js'
import FooterGuide from '../../components/FooterGuide/FooterGuide'

export default {
  components: {
    Header,
    Course,
    Activity,
    Teachers,
    FooterGuide
  },
  computed: {
    token () {
      return this.$api.getStorage('userinfo')
    }
  },
  methods: {
    ...routerMain,
    hand (path) {
      this.$api.setStorage('page', 2)
      this.to(path)
    }
  },
  mounted () {
    this.$store.state.searchActivitys = this.$store.state.activitys
    this.$store.dispatch('getCourseIntroduce')
    this.$store.dispatch('getCourseLearners')
    this.$store.dispatch('getTeachers')
  }
}
</script>
<style lang="stylus">
#index
  position relative
  width 90%
  height 100%
  margin  0 auto
  padding-top 30%
  overflow hidden
  display flex
  flex-direction column
  .CourseClass
    position relative
    width 100%
  .ActivityClass
    width 100%
    margin 10px 0
  .TeachersClass
    width 100%
</style>
