<template>
	<div id="info">
		<UserAvatar />
    <h2>{{UserInfo.realname}}</h2>
    <h3>{{UserInfo.factions}}</h3>
    <span class="iconfont icon-school">资本论课程平台</span>
	</div>
</template>

<script>
import UserAvatar from '../../UserAvatar/UserAvatar'
export default {
  data () {
    return {
      errorurl: 'this.src="' + require('../../../../public/imgs/avatar.png') + '"',
      imgUrl: require('../../../../public/imgs/avatar.png'),
      UserInfo: JSON.parse(window.localStorage.getItem('UserInfo'))
    }
  },
  components: {
    UserAvatar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#info
  position absolute
  top 90px
  left 50%
  transform translateX(-50%)
  width 90%
  height 170px
  text-align center
  background url('../../../../public/imgs/userInfoBg.png') no-repeat
  background-size 345px 170px
  img
    width 55px
    height 55px
    border-radius 55px
    margin 16px auto
  h2
    color #914800
    font-size 17px
    font-weight bolder
    margin-top -7px
  h3
    color #333333
    font-size 14px
    line-height 20px
    margin 5px 0
  span
    display block
    width 200px
    height 22px
    margin 0 auto
    background-color #A77E51
    line-height 22px
    color #FFF6C1
    border-radius 11px
  .icon-school:before
    margin-right 10px
</style>
