<template>
  <div>
    <Header>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
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
