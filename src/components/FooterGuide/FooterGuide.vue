<template>
  <footer id="footer-guide">
    <div @click="hand(0)">
      <span class="iconfont icon-home guide" :class="{on:nav[id] === 'index'}"></span>
      <span class="guide" :class="{on:nav[id] === 'index'}">首页</span>
    </div>
    <div @click="hand(1)">
      <span class="iconfont icon-study guide" :class="{on:nav[id] === 'Study'}"></span>
      <span class="guide" :class="{on:nav[id] === 'Study'}">学习</span>
    </div>
    <div @click="hand(2)">
      <span class="iconfont icon-activity guide" :class="{on:nav[id] === 'Activity'}"></span>
      <span class="guide" :class="{on:nav[id] === 'Activity'}">活动</span>
    </div>
    <div @click="hand(3)">
      <span class="iconfont icon-chat guide" :class="{on:nav[id] === 'Communication'}"></span>
      <span class="guide" :class="{on:nav[id] === 'Communication'}">交流</span>
    </div>
    <div @click="hand(4)">
      <span class="iconfont icon-my guide" :class="{on:nav[id] === 'My'}"></span>
      <span class="guide" :class="{on:nav[id] === 'My'}">我的</span>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
import routerMain from '../../router/main.js'
export default {
  data () {
    return {
      nav: ['index', 'Study', 'Activity', 'Communication', 'My']
    }
  },
  computed: {
    ...mapState(['isToken']),
    id () {
      const id = window.localStorage.getItem('navGuide') || 0
      return id
    }
    // token () {
    //   return this.$api.getStorage('userinfo')
    // },
    // path () {
    //   return this.$api.getStorage('page')
    // }
  },
  methods: {
    ...routerMain,
    hand (id) {
      window.localStorage.setItem('navGuide', id)
      id === 2 && window.localStorage.setItem('search', 'activity')
      id === 3 && window.localStorage.setItem('search', 'communication')
      this.to(this.nav[id])
    }
  }
}
</script>

<!-- Add "scoped" attribute hand limit CSS hand this component only -->
<style scoped lang="stylus">
#footer-guide
  display flex
  justify-content space-around
  align-items center
  position fixed
  left 0
  bottom : 0
  width 100%
  height 54px
  background #3C0000
  .guide
    display block
    font-size 15px
    color #EFD3D3
    text-align center
  .on
    color #FBE66C
</style>
