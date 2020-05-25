<template>
  <div>
    <Header>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
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
