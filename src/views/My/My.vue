<template>
  <div id="my">
    <Header>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <Info/>
    <div class="item">
      <List/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../../components/Header/Header'
import Info from '../../components/My/Info/Info.vue'
import List from '../../components/My/List/List.vue'

export default {
  components: {
    Header,
    Info,
    List
  },
  methods: {
    go (path) {
      this.$router.replace(path)
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#my
  width 100%
  height 100%
  .item
    position absolute
    top 275px
    left 14px
    width 345px
    text-align center
</style>
