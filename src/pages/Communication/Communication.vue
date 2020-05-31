<template>
  <div id="Communication">
    <Header>
      <img src="../../../public/imgs/Communication.png" alt="title" class="title" slot="title">
    </Header>
    <Communication/>
    <FooterGuide/>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import Communication from '../../components/Communication/Communication/Communication'
import FooterGuide from '../../components/FooterGuide/FooterGuide'

export default {
  components: {
    Header,
    Communication,
    FooterGuide
  }
}
</script>
<style lang="stylus">
#Communication {
  width 100%
  height 100%
  overflow hidden
}
</style>
