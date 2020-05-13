<template>
  <div id="UserLogin">
    <Header>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <form action="" class="items">
      <h2>用户注册</h2>
      <div class="item"  v-for="i in 4" :key="i">
        <span class="iconfont" :class="iconClass[i]"></span>
        <input :type="types[i]" :placeholder="placeholders[i]" >
      </div>
      <button>注册</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../../components/Header/Header'

export default {
  data () {
    return {
      types: ['', 'text', 'text', 'text', 'text'],
      placeholders: ['', '请输入姓名', '请输入手机号', '请输入密码', '请输入确认密码'],
      iconClass: ['', 'icon-username', 'icon-phone', 'icon-userpw', 'icon-userpw']
    }
  },
  components: {
    Header
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#UserLogin
  width 100%
  height 100%
  .items
    position absolute
    top 97px
    left 30px
    width 315px
    height 436px
    text-align center
    background url('./imgs/loginbg.png') no-repeat
    background-size 315px 436px
    background-position center
    h2
      color #7C4900
      font-size 22px
      font-weight bolder
      margin-top 55px
    .item
      display flex
      justify-content center
      width 80%
      height 45px
      border-radius 22px
      background-color white
      border 1px solid #B39845
      margin auto
      margin-top 13px
      span
        display block
        width 13px
        height 13px
        color #A37257
        margin-top 14px
      input
        width 200px
        height 20px
        margin-top 12px
        margin-left 10px
        color #828282
        font-size 14px
        border none
    button
      margin-top 25px
      color #FFF6C1
      width 85%
      height 45px
      border-radius 22px
      background-color #6C0B0D
    h3
      margin-top 15px
      font-size 13px
      color #B69B4B
      span
        color #DB1E22
        margin-right 5px
</style>
