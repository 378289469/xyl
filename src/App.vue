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
    // this.$store.dispatch('getCourseIntroduce')
    this.getCourseIntroduce()
    this.getCourseLearners()
    this.reqActivitys()
    this.getTeachers()
  },
  methods: {
    ...mapActions(['getCourseIntroduce', 'getCourseLearners', 'reqActivitys', 'getTeachers'])
  },
  watch: {
    $route (e) {
      this.tabType = !(e.name === 'CourseIntroduce' || e.name === 'PDF' || e.name === 'ActivityDetail')
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
