<template>
  <div id="Activity">
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
<style lang="stylus">
#Activity {
  width 99%
  height 100%
  overflow hidden
}
</style>
