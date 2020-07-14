<template>
  <div id="my">
    <Header>
      <img src="../../../public/imgs/index.png" alt="title" class="title" slot="title">
    </Header>
    <Info/>
    <div class="item">
      <List v-for="i in 2" :key="i" @click.native="hand(paths[i])">
          <span :class="leftClass[i]" slot="left"></span>
          <span class="title" slot="title">{{titles[i]}}</span>
          <span class="iconfont icon-right" slot="right"></span>
      </List>
    </div>
    <button @click="to('UserLogin')">重新登录</button>
    <FooterGuide/>
    <MySecurity v-show="MySecurity" @Security="Security"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../../components/Header/Header'
import Info from '../../components/My/Info/Info.vue'
import List from '../../components/My/List/List.vue'
import routerMain from '../../router/main.js'
import FooterGuide from '../../components/FooterGuide/FooterGuide'
import MySecurity from '../../pages/MySecurity/MySecurity'

export default {
  data () {
    return {
      titles: ['', '小组成员', '账户安全'],
      leftClass: ['', 'member', 'security'],
      paths: ['', 'MyMember', 'MySecurity'],
      MySecurity: false
    }
  },
  components: {
    Header,
    Info,
    List,
    FooterGuide,
    MySecurity
  },
  methods: {
    ...routerMain,
    hand (path) {
      if (path === 'MyMember') {
        this.to(path)
      } else {
        this.MySecurity = true
      }
    },
    Security () {
      this.MySecurity = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#my
  width 100%
  height 100%
  overflow hidden
  .item
    position absolute
    top 265px
    left 50%
    transform translateX(-50%)
    width 90%
    text-align center
  button
    position absolute
    top 460px
    left 0
    right 0
    margin 0 auto
    color #FFF6C1
    width 85%
    height 45px
    border-radius 22px
    background-color #6C0B0D
</style>
