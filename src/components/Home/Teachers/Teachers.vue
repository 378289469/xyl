<template>
  <div id="teachers">
    <div>
      <span class="icon1"></span>
      <span class="icon2"></span>
      <h2>教学团队</h2>
    </div>
    <ul class="list">
      <li>
          <div class="avatar">
             <img src="./imgs/person.png" alt="teacher" >
          </div>
          <span>杨璐</span>
      </li>
      <li>
          <div class="avatar">
             <img src="./imgs/person.png" alt="teacher" >
          </div>
          <span>杨璐</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#teachers
  position absolute
  width 345px
  height 130px
  display flex
  flex-direction column
  top 624px
  left 15px
  border-radius 5px
  box-shadow 0 0 5px #802529
  background white
  div
    display flex
    align-items center
    width 315px
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
  ul
    display flex
    justify-content space-around
    align-items center
    height 85px
    li
      width 43px
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
        color #272828
        font-size 14px
</style>
