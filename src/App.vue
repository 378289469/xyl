<template>
  <div id="app">
    <router-view />
    <FooterGuide />
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
import { mapActions } from 'vuex'
export default {
  components: {
    FooterGuide
  },
  mounted () {
    // this.$store.dispatch('getCourseIntroduce')
    this.getCourseIntroduce()
    this.getCourseLearners()
    this.reqActivitys()
  },
  methods: {
    ...mapActions(['getCourseIntroduce', 'getCourseLearners', 'reqActivitys'])
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
  margin-top: 60px;
}
</style>
