<template>
  <div>
    <Header>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <Activity/>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import Activity from '../../components/Activity/Activity/Activity'

export default {
  components: {
    Header,
    Activity
  }
}
</script>
