<template>
  <div id="search">
    <span class="iconfont icon-search icon"></span>
    <input type="text" placeholder="请输入关键字进行搜索">
  </div>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#search {
  width 100%
  height 35px
  background-color white
  border-radius 18px
  text-align left
  line-height 35px
  .icon{
    display inline-block
    line-height 30px
    font-size 16px
    margin-left 13px
    transform: translateY(1px)
  }
  input {
    background-color rgba(0 0 0 0)
    border 0
    font-size 13px
    margin-left 4px
  }
}
</style>
