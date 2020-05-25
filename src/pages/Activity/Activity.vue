<template>
  <div>
    <Header>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <ActivityContent/>
    <FooterGuide/>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import ActivityContent from '../../components/ActivityContent/ActivityContent/ActivityContent'
import FooterGuide from '../../components/FooterGuide/FooterGuide'

export default {
  components: {
    Header,
    ActivityContent,
    FooterGuide
  }
}
</script>
