<template>
  <footer id="footer-guide">
    <div @click="hand('Home')">
      <span class="iconfont icon-home guide" :class="{on:'/'===$route.path}"></span>
      <span class="guide" :class="{on:'/'===$route.path}">首页</span>
    </div>
    <div @click="hand('Study')">
      <span class="iconfont icon-study guide" :class="{on:'/study'===$route.path}"></span>
      <span class="guide" :class="{on:'/study'===$route.path}">学习</span>
    </div>
    <div @click="hand('Activity')">
      <span class="iconfont icon-activity guide" :class="{on:'/activity'===$route.path}"></span>
      <span class="guide" :class="{on:'/activity'===$route.path}">活动</span>
    </div>
    <div @click="hand('Communication')">
      <span class="iconfont icon-chat guide" :class="{on:'/communication'===$route.path}"></span>
      <span class="guide" :class="{on:'/communication'===$route.path}">交流</span>
    </div>
    <div @click="hand('My')">
      <span class="iconfont icon-my guide" :class="{on:'/my'===$route.path}"></span>
      <span class="guide" :class="{on:'/my'===$route.path}">我的</span>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
import routerMain from '../../router/main.js'
export default {
  computed: {
    ...mapState(['isToken']),
    token () {
      console.log(this.$api.getStorage('userinfo'))
      return this.$api.getStorage('userinfo')
    }
  },
  methods: {
    ...routerMain,
    hand (path) {
      if (!this.token) {
        this.to('UserLogin', {}, '')
        return
      }
      this.$store.dispatch('checkToken', {
        token: this.token,
        cb: () => {
          if (this.isToken) {
            this.to(path, {})
          } else {
            // this.to('UserLogin', {}, '')
          }
        }
      })
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
