<template>
  <div id="activity">
    <Search/>
    <div class="content">
      <Activity ref="Activity" class="context"/>
    </div>
  </div>
</template>

<script>
import Activity from '../../Home/Activity/Activity'
import Search from '../../Search/Search'
import BScroll from 'better-scroll'
import Pullup from '@better-scroll/pull-up'
import PullDown from '@better-scroll/pull-down'

BScroll.use(Pullup)
BScroll.use(PullDown)

export default {
  components: {
    Activity,
    Search
  },
  data () {
    return {
      y: 0,
      page: 1,
      getMore: false
    }
  },
  mounted () {
    this.$refs.Activity.ActivityAll()
    const bs = new BScroll('.activitys', { // eslint-disable-line
      scrollY: true,
      pullUpLoad: true,
      pullDownRefresh: true
    })
    bs.on('pullingUp', () => {
      console.log('下拉刷新')
    })
    bs.on('scrollEnd', point => {
      if (this.getMore) {
        this.getMore = false
        this.$store.dispatch('reqActivitys', { page: this.page })
      }
      this.y = Math.abs(point.y)
      const h = document.querySelector('#activity .list').clientHeight - document.querySelector('#activity .activitys').clientHeight
      if (this.y === h) {
        this.page += 1
        this.getMore = true
      } else if (this.y === 0 && this.page > 1) {
        this.page -= 1
        this.getMore = true
      }
    })
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
