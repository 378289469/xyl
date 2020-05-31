<template>
  <div id="app">
    <index/>
    <FooterGuide/>
  </div>
</template>

<script>
import index from './pages/index/index'
import FooterGuide from './components/FooterGuide/FooterGuide'
import { mapActions } from 'vuex'
export default {
  components: {
    index,
    FooterGuide
  },
  data () {
    return {
      tabType: true
    }
  },
  mounted () {
    this.getCourseIntroduce()
    this.getTeachers()
  },
  methods: {
    ...mapActions(['getCourseIntroduce', 'reqActivitys', 'getTeachers'])
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
  width 100%
  height 100%
}
</style>
