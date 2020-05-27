<template>
  <div id="MyMember">
    <Header>
      <span class="iconfont icon-left back" slot="back" @click="to('My')"/>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <div class="item">
      <div class="wrap">
        <List v-for="(person, index) in UserGroup" :key="index" class='list'>
          <div class="title" slot="title">
             <img class="avatar" src="./imgs/avatar.png" alt="">
             <h3>{{person.realname}}</h3>
             <span class="user">（{{person.factions}}）</span>
             <span class="tip" v-if="person.isGroupLeader==='是'">组长</span>
             <span class="tip" v-if="person.realname===userInfo.result.userInfo.realname">我</span>
          </div>
        </List>
      </div>
    </div>
    <tip/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../../components/Header/Header'
import List from '../../components/My/List/List.vue'
import tip from '../../components/Tip/tip'
import BScroll from 'better-scroll'
import routerMain from '../../router/main.js'
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  components: {
    Header,
    List,
    tip
  },
  computed: {
    ...mapState(['UserGroup', 'userInfo', 'isToken']),
    token () {
      return this.$api.getStorage('userinfo')
    }
  },
  methods: {
    ...routerMain
  },
  mounted () {
    this.$store.dispatch('checkToken', {
      token: this.token,
      cb: () => {
        if (this.isToken) {
          this.$store.dispatch('getUserGroup', () => {
            new BScroll('.item') // eslint-disable-line
          })
        } else {
          this.to('UserLogin', {}, '')
        }
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#MyMember
  width 100%
  height 100%
  .item
    position absolute
    top 110px
    left 0
    right 0
    margin 0 auto
    width 345px
    height 85%
    overflow hidden
    background url('./imgs/bg.png') no-repeat
    .wrap
      padding 20px 0
    .list
      width 90%
      height 65px
      margin 15px auto
      background-color #FFF4E2
      .title
        display flex
        width 100%
        .avatar
          width 45px
          height 45px
          margin 10px
        h3
          color #333333
          font-size 15px
          line-height 65px
        .user
          width auto
          color #828282
          font-size 14px
          line-height 65px
        .tip
          width 38px
          height 14px
          margin auto
          color #925F25
          font-size 11px
          line-height 14px
          text-align center
          border-radius 8px
          background-color #EBC390
</style>
