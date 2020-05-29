<template>
  <footer id="footer-guide">
    <div @click="hand(0)">
      <span class="iconfont icon-home guide" :class="{on:nav[path] === 'index'}"></span>
      <span class="guide" :class="{on:nav[path] === 'index'}">首页</span>
    </div>
    <div @click="hand(1)">
      <span class="iconfont icon-study guide" :class="{on:nav[path] === 'Study'}"></span>
      <span class="guide" :class="{on:nav[path] === 'Study'}">学习</span>
    </div>
    <div @click="hand(2)">
      <span class="iconfont icon-activity guide" :class="{on:nav[path] === 'Activity'}"></span>
      <span class="guide" :class="{on:nav[path] === 'Activity'}">活动</span>
    </div>
    <div @click="hand(3)">
      <span class="iconfont icon-chat guide" :class="{on:nav[path] === 'Communication'}"></span>
      <span class="guide" :class="{on:nav[path] === 'Communication'}">交流</span>
    </div>
    <div @click="hand(4)">
      <span class="iconfont icon-my guide" :class="{on:nav[path] === 'My'}"></span>
      <span class="guide" :class="{on:nav[path] === 'My'}">我的</span>
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
    token () {
      return this.$api.getStorage('userinfo')
    },
    path () {
      return this.$api.getStorage('page')
    }
  },
  methods: {
    ...routerMain,
    hand (id) {
      if (!this.token) {
        this.to('UserLogin')
        return
      }
      this.$store.dispatch('checkToken', {
        token: this.token,
        cb: () => {
          if (this.isToken) {
            this.$api.setStorage('page', id)
            if (id === 2) {
              this.$api.setStorage('search', 'activity')
            } else if (id === 3) {
              this.$api.setStorage('search', 'communication')
            }
            this.to(this.nav[id])
          } else {
            this.to('UserLogin')
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
