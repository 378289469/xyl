<template>
  <div>
    <Header>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <Communication/>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import Communication from '../../components/Communication/Communication/Communication'

export default {
  components: {
    Header,
    Communication
  }
}
</script>
