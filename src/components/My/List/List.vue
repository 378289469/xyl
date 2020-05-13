<template>
	<div class="list">
    <slot name="left" class="member"></slot>
    <slot name="title" class="title"></slot>
    <slot name="right" class="iconfont icon-right"></slot>
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
.list
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
  margin-top 10px
  span
    display block
    width 50px
    height 50px
  .member
    background url('./imgs/member.png') no-repeat
    background-size 30px 30px
    background-position center
  .security
    background url('./imgs/security.png') no-repeat
    background-size 30px 30px
    background-position center
  .title
    width 240px
    text-align left
  .icon-right
    color #E1BD85
</style>
