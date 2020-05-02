<template>
  <div>
    <Header>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <CourseDir/>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import CourseDir from '../../components/Study/CourseDir/CourseDir'

export default {
  components: {
    Header,
    CourseDir
  }
}
</script>
