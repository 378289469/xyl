<template>
  <div id="study">
    <Header>
      <img src="../../../public/imgs/Study.png" alt="title" class="title" slot="title">
    </Header>
    <CourseDir/>
    <FooterGuide/>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import CourseDir from '../../components/Study/CourseDir/CourseDir'
import FooterGuide from '../../components/FooterGuide/FooterGuide'

export default {
  components: {
    Header,
    CourseDir,
    FooterGuide
  },
  mounted () {
    this.$store.dispatch('getCourseChapter')
  }

}
</script>
<style lang="stylus">
#study {
  width 100%
  height 100%
  overflow hidden
}
</style>
