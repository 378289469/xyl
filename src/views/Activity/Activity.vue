<template>
  <div>
    <Header>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <ActivityContent/>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import ActivityContent from '../../components/ActivityContent/ActivityContent/ActivityContent'

export default {
  components: {
    Header,
    ActivityContent
  }
}
</script>
