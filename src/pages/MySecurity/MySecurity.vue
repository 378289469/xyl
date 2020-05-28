<template>
  <div id="MySecurity">
    <Header>
      <span class="iconfont icon-left back" slot="back" @click="to('My')"/>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <div class="item">
      <form action="" @submit.prevent="submit">
        <List v-for="i in 5" :key="i" class='list'>
          <div class="title" slot="title">
             <span >{{titles[i]}}</span>
             <span class="username" v-if="i===2">{{token.result.userInfo.phone}}</span>
             <input class="content" :disabled="disabled[i]" :maxlength="maxlength[i]" :type="type[i]"
              :placeholder="placeholders[i]" v-model="model[i]" @focus="focus()" @blur="blur()">
             <img @click="upload" v-if="i===1" class="avatar" :src="token.result.userInfo.avatar || imgUrl" :onerror="errorurl" alt="avatar">
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
    ...mapState(['userInfo', 'pwdInfo', 'isToken']),
    token () {
      return this.$api.getStorage('userinfo')
    },
    oldUserpwd () {
      return this.$api.getStorage('userpwd')
    },
    model () {
      return [this.info.oldpwd, this.info.newpwd, this.info.surepwd]
    }
  },
  methods: {
    ...routerMain,
    submit () {
      const info = {
        username: this.token.result.userInfo.phone,
        oldpwd: this.model[3] && this.model[3].trim(),
        newpwd: this.model[4] && this.model[4].trim(),
        surepwd: this.model[5] && this.model[5].trim()
      }
      if (info.oldpwd && info.oldpwd !== this.oldUserpwd) {
        this.$store.dispatch('tipMsg', {
          tips: { type: 5, msg: '旧密码输入错误' }
        }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
        return
      }
      if (info.oldpwd && info.newpwd && info.surepwd && info.newpwd === info.surepwd && info.newpwd === this.oldUserpwd) {
        this.$store.dispatch('tipMsg', {
          tips: { type: 5, msg: '新密码与旧密码一样' }
        }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
        return
      }
      if (info.oldpwd && info.newpwd && info.surepwd && info.newpwd !== info.surepwd) {
        this.$store.dispatch('tipMsg', {
          tips: { type: 5, msg: '两次密码不一致' }
        }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
        return
      }
      if (info.oldpwd && info.newpwd && info.surepwd) {
        const paramets = {
          info,
          cb: () => {
            if (this.pwdInfo) {
              this.$store.dispatch('tipMsg', {
                tips: { type: 5, msg: this.pwdInfo.message }
              }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
            }
            if (this.pwdInfo && this.pwdInfo.success) {
              this.go('My')
            }
          }
        }
        this.$store.dispatch('checkToken', {
          token: this.token,
          cb: () => {
            if (this.isToken) {
              this.$store.dispatch('changPassword', paramets)
            } else {
              this.to('UserLogin', {}, '')
            }
          }
        })
      }
    },
    focus () {
      event.target.value = ''
    },
    blur () {
      if (!event.target.value && event.target.placeholder === '请输入原密码') {
        this.$store.dispatch('tipMsg', {
          tips: { type: 5, msg: '请输入原密码' }
        }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
      } else if (!event.target.value && event.target.placeholder === '请输入新密码') {
        this.$store.dispatch('tipMsg', {
          tips: { type: 5, msg: '请输入新密码' }
        }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
      } else if (!event.target.value && event.target.placeholder === '请输入确认密码') {
        this.$store.dispatch('tipMsg', {
          tips: { type: 5, msg: '请输入确认密码' }
        }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
      }
    },
    upload () {
      const photoPicker = this.$api.require('photoPicker')
      alert(photoPicker)
      photoPicker.addPhoto({
        photoMaxNum: 1,
        rowCount: 3,
        selectedType: 0,
        lookGifPhoto: true,
        lookLivePhoto: true
      }, function (ret, err) {
        alert(JSON.stringify(ret))
      })
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
          margin-left 35px
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
