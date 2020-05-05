<template>
  <header id="header">
    <slot name="back" class="back"></slot>
    <slot name="title" class="title"></slot>
  </header>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#header
  position fixed
  top 0
  left 0
  width 100%
  height 220px
  background-image url(./imgs/header.png)
  .back
    width 10px
    height 18px
    color #F0FBD4
    position absolute
    top 50px
    left 15px
  .title
    display block
    position absolute
    top 38px
    left 126px
    color #F2E8B6
    font-size 40px
</style>
