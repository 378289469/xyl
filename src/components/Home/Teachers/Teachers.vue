<template>
  <div id="teachers">
    <div>
      <span class="icon1"></span>
      <span class="icon2"></span>
      <h2>教学团队</h2>
    </div>
    <div class="teachers">
      <UL>
        <li v-for="(teacher, index) in teachers" :key="index">
            <div class="avatar">
              <img :src="teacher.avatar || imgUrl" alt="teacher" :onerror="errorurl" >
            </div>
            <span class="ellipsis">{{teacher.realname}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      errorurl: 'this.src="' + require('../../../../public/imgs/avatar.png') + '"',
      imgUrl: require('../../../../public/imgs/avatar.png')
    }
  },
  computed: {
    ...mapState(['teachers'])
  },
  mounted () {
    new BScroll('.teachers', { scrollX: true }) // eslint-disable-line
  },
  updated () {
    new BScroll('.teachers', { scrollX: true }) // eslint-disable-line
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#teachers
  width 90%
  height 20%
  display flex
  flex-direction column
  border-radius 5px
  box-shadow 0 0 5px #802529
  background white
  div
    display flex
    align-items center
    width 90%
    height 44px
    margin-left 16px
    border-bottom 1px solid #70160B
    .icon1
      width 10px
      height 10px
      border 1px solid #802529
      transform rotate(45deg)
    .icon2
      width 8px
      height 8px
      margin-left -3px
      background-color  #802529
      transform rotate(45deg)
    h2
      margin-left 6px
      font-size 15px
      font-weight  bolder
      color #802529
  .teachers
    height 100%
    width 315px
    overflow hidden
    border none
    ul
      display flex
      align-items center
      padding 0
      li
        list-style none
        width 43px
        margin-right 23px
        .avatar
          width 43px
          height 43px
          margin-left 0
          border-radius 43px
          overflow hidden
        img
          width 43px
          height 43px
        span
          display block
          width 43px
          margin-top 10px
          color #272828
          font-size 14px
          overflow hidden
</style>
