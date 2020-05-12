<template>
	<div id="list">
    <span class="member"></span>
    <span class="title">账户安全</span>
    <span class="iconfont icon-right"></span>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['courseintroduce', 'courselearners'])
  },
  methods: {
    to (path) {
      this.$router.push(path)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#list
  display flex
  justify-content space-between
  width 345px
  height 50px
  text-align center
  background white
  border-radius 5px
  border 1px solid #D19A43
  line-height 50px
  font-size 15px
  color #333333
  span
    display block
    width 50px
    height 50px
  .member,.security
    background url('./imgs/member.png') no-repeat
    background-size 30px 30px
    background-position center
  .security
    background url('./imgs/security.png') no-repeat
  .title
    width 240px
    text-align left
  .icon-right
    color #E1BD85
</style>
