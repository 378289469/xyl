<template>
  <div id="MySecurity">
    <Header>
      <span class="iconfont icon-left back" slot="back" @click="back"/>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <div class="item">
      <List v-for="i in 5" :key="i" class='list'>
        <div class="title" slot="title">
           <span >{{titles[i]}}</span>
           <input class="content" :placeholder="placeholders[i]" :value="i===2? userName:''" type="text">
           <img v-if="avatar[i]" class="avatar" src="./imgs/avatar.png" alt="">
        </div>
      </List>
    </div>
    <button>保存</button>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../../components/Header/Header'
import List from '../../components/My/List/List.vue'
import routerMain from '../../router/main.js'

export default {
  data () {
    return {
      titles: ['', '修改头像：', '用户名：', '原始密码：', '新密码：', '确认密码：'],
      leftClass: ['', 'member', 'security'],
      placeholders: ['', '', '', '请输入原密码', '请输入新密码', '请输入确认密码'],
      avatar: ['', '1', '', '', '', ''], // 只有第一个有头像
      userName: '用户名'
    }
  },
  components: {
    Header,
    List
  },
  methods: {
    ...routerMain
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#MySecurity
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
    background url('./imgs/bg.png') no-repeat
    .list
      width 90%
      margin 15px auto
      background-color #FFF4E2
      .title
        display flex
        width 100%
        span
          width 25%
          color #494949
          font-size 15px
          margin-left 15px
        .content
          width 50%
          color #828282
          font-size 15px
          border none
          background-color rgba(0 0 0 0)
        .avatar
          width 40px
          height 40px
          margin 5px
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
