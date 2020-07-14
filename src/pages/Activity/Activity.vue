<template>
  <div id="Activity">
    <Header>
      <img src="../../../public/imgs/Activity.png" alt="title" class="title" slot="title">
    </Header>
    <ActivityContent/>
    <FooterGuide v-show="navFootGuide"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Header from '../../components/Header/Header'
import ActivityContent from '../../components/ActivityContent/ActivityContent/ActivityContent'
import FooterGuide from '../../components/FooterGuide/FooterGuide'

export default {
  components: {
    Header,
    ActivityContent,
    FooterGuide
  },
  computed: {
    ...mapState(['modules']),
    navFootGuide () {
      return this.modules.navFootGuide
    }
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
