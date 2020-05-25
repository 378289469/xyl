<template>
  <div id="my">
    <Header>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <Info/>
    <div class="item">
      <List v-for="i in 2" :key="i" @click.native="to(paths[i])">
          <span :class="leftClass[i]" slot="left"></span>
          <span class="title" slot="title">{{titles[i]}}</span>
          <span class="iconfont icon-right" slot="right"></span>
      </List>
    </div>
    <FooterGuide/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../../components/Header/Header'
import Info from '../../components/My/Info/Info.vue'
import List from '../../components/My/List/List.vue'
import routerMain from '../../router/main.js'
import FooterGuide from '../../components/FooterGuide/FooterGuide'

export default {
  data () {
    return {
      titles: ['', '小组成员', '账户安全'],
      leftClass: ['', 'member', 'security'],
      paths: ['', 'MyMember', 'MySecurity']
    }
  },
  components: {
    Header,
    Info,
    List,
    FooterGuide
  },
  methods: {
    ...routerMain
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
    top 265px
    left 14px
    width 345px
    text-align center
</style>
