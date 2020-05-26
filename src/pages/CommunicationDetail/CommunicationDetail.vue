<template>
  <div>
    <Header>
      <span class="iconfont icon-left back" slot="back" @click="back"/>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <CommunicationDetail/>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'
import CommunicationDetail from '../../components/Communication/CommunicationDetail/CommunicationDetail'
import routerMain from '../../router/main.js'

export default {
  components: {
    Header,
    CommunicationDetail
  },
  methods: {
    ...routerMain
  }
}
</script>
