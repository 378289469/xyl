<template>
  <div>
    <Header>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <CommunicationDetail/>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import CommunicationDetail from '../../components/Communication/CommunicationDetail/CommunicationDetail'

export default {
  components: {
    Header,
    CommunicationDetail
  }
}
</script>
