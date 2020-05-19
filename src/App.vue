<template>
  <div id="app">
    <router-view />
    <FooterGuide v-if="tabType"/>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
import { mapActions } from 'vuex'
export default {
  components: {
    FooterGuide
  },
  data () {
    return {
      tabType: true
    }
  },
  mounted () {
    this.getCourseIntroduce()
    this.getCourseLearners()
    this.getTeachers()
  },
  methods: {
    ...mapActions(['getCourseIntroduce', 'getCourseLearners', 'reqActivitys', 'getTeachers'])
  },
  watch: {
    $route (e) {
      this.tabType = !(
        e.name === 'CourseIntroduce' ||
        e.name === 'PDF' ||
        e.name === 'ActivityDetail' ||
        e.name === 'MyMember' ||
        e.name === 'MySecurity' ||
        e.name === 'UserLogin' ||
        e.name === 'UserRegister' ||
        e.name === 'Video'
      )
    }
  }
}
</script>

<style lang="stylus">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
