<template>
  <div id="UserLogin">
    <Header>
      <img src="../../../public/imgs/index.png" alt="title" class="title" slot="title">
    </Header>
    <form action="" class="items" @submit.prevent="submit">
      <h2>用户登录</h2>
      <div class="item"  v-for="i in 3" :key="i" :class="{'iconKey':iconClass[i]==='icon-key'}">
        <span class="iconfont" :class="iconClass[i]"></span>
        <input  :maxlength="maxlength[i]" :type="types[i]" :placeholder="placeholders[i]"
        v-model="model[i]" @focus="focus()" @blur="blur()">
        <span class="keyImg" v-if="iconClass[i]==='icon-key'" @click="key"><img :src="keyUrl" alt=""></span>
      </div>
      <button>登录</button>
      <h3 @click="to('UserRegister')"><span>还没有账号？</span>立即注册</h3>
    </form>
    <tip/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../../components/Header/Header'
import tip from '../../components/Tip/tip'
import { mapState } from 'vuex'
import { baseUrl } from '../../api/ajax'
import routerMain from '../../router/main.js'

export default {
  data () {
    return {
      info: { name: '', password: '', key: '' },
      types: ['', 'tel', 'password', 'tel'],
      maxlength: ['', 11, 20, 4],
      placeholders: ['', '请输入手机号', '请输入密码', '请输入验证码'],
      iconClass: ['', 'icon-username', 'icon-userpw', 'icon-key'],
      keyUrl: `${baseUrl}/front/login/getCheckCode?${Date.now()}`
    }
  },
  components: {
    Header,
    tip
  },
  computed: {
    ...mapState(['userInfo', 'loginMsg']),
    model () {
      return ['', this.info.name, this.info.password, this.info.key]
    },
    userInfo () {
      return window.localStorage.getItem('UserInfo')
    }
  },
  methods: {
    ...routerMain,
    // to (path) {
    //   this.$page.push({ name: path })
    // },
    key () {
      this.keyUrl = `${baseUrl}/front/login/getCheckCode?${Date.now()}`
    },
    submit () {
      const info = {
        password: this.model[2] && this.model[2].trim(),
        smscode: this.model[3] && this.model[3].trim(),
        username: this.model[1] && this.model[1].trim()
      }
      window.localStorage.setItem('UserPwd', info.password)
      info.password = window.hex_md5(info.password)
      if (info.password && info.smscode && info.username) {
        const paramets = {
          info,
          cb: () => {
            if (this.loginMsg && this.loginMsg === '验证码错误') {
              this.keyUrl = `${baseUrl}/front/login/getCheckCode?${Date.now()}`
              return
            }
            let { userInfo } = this
            userInfo = JSON.parse(userInfo)
            if (this.loginMsg && this.loginMsg === '登录成功' && userInfo) {
              const msg = userInfo.roleItemId * 1 === 1 ? '教师用户不能登陆' : '登陆成功'
              this.$store.dispatch('tipMsg', {
                tips: { type: 5, msg }
              }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
              userInfo.roleItemId * 1 !== 1 && window.localStorage.setItem('navGuide', 4)
              userInfo.roleItemId * 1 !== 1 && this.to('My', { pageParam: userInfo })
            }
          }
        }
        this.$store.dispatch('userLogin', paramets)
      }
    },
    focus () {
      event.target.value = ''
    },
    blur () {
      if (event.target.placeholder === '请输入手机号' && !(/^1[3456789]\d{9}$/.test(event.target.value))) {
        this.$store.dispatch('tipMsg', {
          tips: { type: 5, msg: '手机号错误' }
        }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
      } else if (!event.target.value && event.target.placeholder === '请输入密码') {
        this.$store.dispatch('tipMsg', {
          tips: { type: 5, msg: '请输入密码' }
        }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
      } else if (!event.target.value && event.target.placeholder === '请输入验证码') {
        this.$store.dispatch('tipMsg', {
          tips: { type: 5, msg: '请输入验证码' }
        }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
      }
    }
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
    height 410px
    text-align center
    background url('../../../public/imgs/loginbg.png') no-repeat
    background-size 315px 410px
    background-position center
    h2
      color #7C4900
      font-size 22px
      font-weight bolder
      margin-top 63px
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
    .iconKey
      position relative
      width 50%
      margin-left 35px
      input
        width 115px
      .keyImg
        position absolute
        left 170px
        width 80px
        height 45px
        img
          width 100%
          height 60%
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
