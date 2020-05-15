<template>
  <div id="MySecurity">
    <Header>
      <span class="iconfont icon-left back" slot="back" @click="back"/>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <div class="item">
      <form action="" @submit.prevent="submit">
        <List v-for="i in 5" :key="i" class='list'>
          <div class="title" slot="title">
             <span >{{titles[i]}}</span>
             <span class="username" v-if="i===2">{{userInfo.userInfo.realname}}</span>
             <input class="content" :disabled="disabled[i]" :maxlength="maxlength[i]" :type="type[i]"
              :placeholder="placeholders[i]" v-model="model[i]" @focus="focus()" @blur="blur()">
             <img @click="upload" v-if="i===1" class="avatar" :src="userInfo.userInfo.avatar || imgUrl" :onerror="errorurl" alt="avatar">
          </div>
        </List>
        <button>保存</button>
      </form>
     <tip/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '../../components/Header/Header'
import List from '../../components/My/List/List.vue'
import tip from '../../components/Tip/tip'
import routerMain from '../../router/main.js'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      info: { oldpwd: '', newpwd: '', surepwd: '' },
      disabled: ['', true, true, false, false, false],
      maxlength: ['', '', '', 20, 20, 20],
      type: ['', 'text', 'text', 'password', 'password', 'password'],
      titles: ['', '修改头像：', '用户名：', '原始密码：', '新密码：', '确认密码：'],
      placeholders: ['', '', '', '请输入原密码', '请输入新密码', '请输入确认密码'],
      errorurl: 'this.src="' + require('./imgs/avatar.png') + '"',
      imgUrl: require('./imgs/avatar.png')
    }
  },
  components: {
    Header,
    List,
    tip
  },
  computed: {
    ...mapState(['userInfo']),
    model () {
      return [this.info.oldpwd, this.info.newpwd, this.info.surepwd]
    }
  },
  methods: {
    ...routerMain,
    submit () {
      const info = {
        oldpwd: this.model[0].trim(),
        newpwd: this.model[1].trim(),
        surepwd: this.model[2].trim()
      }
      if (info.name && info.oldpwd && info.newpwd && info.surepwd) {
        const paramets = {
          info,
          cb: () => {
            this.$store.dispatch('tipMsg', { type: 5, msg: this.register.message }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
            if (this.register.success) {
              this.go('My', { username: this.model[2].trim() })
            }
          }
        }
        this.$store.dispatch('changPassword', paramets)
      }
    },
    focus () {
      event.target.value = ''
    },
    blur () {
      if (!event.target.value && event.target.placeholder === '请输入原密码') {
        this.$store.dispatch('tipMsg', { type: 5, msg: '请输入原密码' }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
      } else if (!event.target.value && event.target.placeholder === '请输入新密码') {
        this.$store.dispatch('tipMsg', { type: 5, msg: '请输入新密码' }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
      } else if (!event.target.value && event.target.placeholder === '请输入确认密码') {
        this.$store.dispatch('tipMsg', { type: 5, msg: '请输入确认密码' }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
      }
    },
    upload () {
      console.log('更换头像')
    }
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
        .username
          margin-left 45px
        .content
          width 50%
          height 20px
          margin auto
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
