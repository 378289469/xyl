<template>
  <div id="activity">
    <Search/>
    <div class="content">
      <Activity class="context"/>
    </div>
  </div>
</template>

<script>
import Activity from '../../Home/Activity/Activity'
import Search from '../../Search/Search'

export default {
  components: {
    Activity,
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
      margin-left -12px
      margin-top -30px
    }
  }
  .dir {
    display flex
    width: 315px;
    height: 45px;
    margin-left 16px
    font-size: 14px;
    line-height 45px
    text-align left
    border 1px solid #E1BD85
    .icon {
      display block
      margin-left 10px
      color #925F25
    }
    .title {
      display block
      width 260px
      margin-left 16px
    }
  }
  .one-dir {
    background-color: #F6D9C2;
    color: #925F25;
  }

  .two-dir {
    background-color: #FFF2E3;
    color: #333333;
    border-radius: 0!important
  }

  .three-dir {
    background-color: #FFFAF3;
    color: #333333;
    border-radius: 0!important
  }

  .resource-dir {
    background-color: #FFFFFF;
    color: #925F25;
    border-radius: 0!important
  }

  .show {
    border-radius: 5px 5px 0 0;
  }

  .hide {
    border-radius: 5px;
  }
}
</style>
