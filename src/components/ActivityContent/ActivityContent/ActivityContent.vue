<template>
  <div id="activity">
    <Search/>
    <div class="content">
      <ActivityList  class="context"/>
    </div>
  </div>
</template>

<script>
import ActivityList from '../ActivityList/ActivityList'
import Search from '../../Search/Search'

export default {
  components: {
    ActivityList,
    Search
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#activity {
  position: absolute;
  top: 90px;
  left: 14px;
  width: 346px;
  height: 80%;
  .content {
    width 100%
    height 80%
    margin-top 10px
    background: url('./imgs/bg.png') no-repeat;
    .context{
      box-shadow none
      font-size 14px
      width 344px
      height 100%
      margin-left -12px
      margin-top -30px
    }
  }
}
</style>
