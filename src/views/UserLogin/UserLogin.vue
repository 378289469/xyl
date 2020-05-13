<template>
  <div id="UserLogin">
    <Header>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <form action="" class="items">
      <h2>用户登录</h2>
      <div class="item">
        <input :type="types[i]" :placeholder="placeholders[i]"  v-for="i in 3" :key="i">
      </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../../components/Header/Header'

export default {
  data () {
    return {
      types: ['', 'text', 'text', 'submit'],
      placeholders: ['', '请输入用户名', '请输入密码', '']
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
    height 380px
    text-align center
    background url('./imgs/loginbg.png') no-repeat
    background-size 315px 380px
    background-position center
    h2
      color #7C4900
      font-size 22px
      font-weight bolder
      margin-top 63px
    .item
      width 80%
      height 45px
      border-radius 22px
      background-color white
      border 1px solid #B39845
      margin-top 13px
</style>
