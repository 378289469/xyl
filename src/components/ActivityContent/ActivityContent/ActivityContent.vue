<template>
  <div id="activity">
    <div class="content">
      <ActivityList  class="context"/>
    </div>
  </div>
</template>

<script>
import ActivityList from '../ActivityList/ActivityList'

export default {
  components: {
    ActivityList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#activity {
  position: absolute;
  top: 90px;
	left: 50%;
	width: 90%;
  transform: translateX(-50%)
  height: 80%;
  .content {
    width 10%
    height 8%
    margin-top 10px
    margin-left 10px
    background: url('../../../../public/imgs/homeCourse.png') no-repeat;
    .context{
      box-shadow none
      font-size 14px
      width 98%
      height 100%
    }
  }
}
</style>
