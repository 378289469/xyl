<template>
  <img class="avatar" :src="imgUrl" :onerror="errorurl" alt="avatar">
</template>

<script>
import { mapState } from 'vuex'
import { baseUrl } from '../../api/ajax'
export default {
  data () {
    return {
      errorurl: 'this.src="' + require('../../../public/imgs/avatar.png') + '"'
    }
  },
  computed: {
    ...mapState(['userAvatar']),
    imgUrl () {
      let imgUrl = ''
      const UserInfo = JSON.parse(window.localStorage.getItem('UserInfo'))
      if (this.userAvatar) {
        imgUrl = baseUrl + this.userAvatar
      } else if (UserInfo.avatar) {
        imgUrl = UserInfo.avatar
      } else {
        imgUrl = require('../../../public/imgs/avatar.png')
      }
      UserInfo.avatar = imgUrl
      window.localStorage.setItem('UserInfo', JSON.stringify(UserInfo))
      return imgUrl
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
</style>
