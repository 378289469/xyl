<template>
	<div id="info">
		<img :src="userInfo.userInfo.avatar || imgUrl" :onerror="errorurl" alt="student" />
    <h2>{{userInfo.userInfo.realname}}</h2>
    <h3>{{userInfo.userInfo.factions}}</h3>
    <span class="iconfont icon-school">太原技师学院</span>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      errorurl: 'this.src="' + require('./imgs/person.png') + '"',
      imgUrl: require('./imgs/person.png')
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#info
  position absolute
  top 90px
  left 14px
  width 345px
  height 170px
  text-align center
  background url('./imgs/bg.png') no-repeat
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
