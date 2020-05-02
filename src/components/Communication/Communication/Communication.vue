<template>
  <div id="communication">
    <h2 class="course on">课程学习</h2>
    <h2 class="activity">活动</h2>
    <Search class="search"/>
    <ul>
      <li>
        <div class="info">
          <div class="avatar">
            <img src="./imgs/person.png" alt="avatar" >
          </div>
          <span>学生</span>
        </div>
        <div class="content">
          <div class="author">杨璐<span>2020-04-05 15:21  </span></div>
          <p>《资本论》 是在什么背景下写作的?谈谈其产生的目的和意义。</p>
          <i class="ellipsis">知识点：[第一卷] [第一篇]资本的生产过程</i>
          <div class="source">来源：<span class="sourse-type">提问</span><span class="count">30</span>回复</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Search from '../../Search/Search'

export default {
  components: {
    Search
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#communication {
  position: absolute;
  top: 112px;
  left: 14px;
  width: 346px;
  height: 80%;
  padding-top 35px
  background: url('./imgs/bg.png') no-repeat;
  background-color: white;
  .course,.activity {
    position: absolute;
    top: -22px;
    width: 127px;
    height: 44px;
    background: url('./imgs/title.png') no-repeat;
    color: #F4D6B2;
    font-size: 20px;
    line-height: 52px;
  }
  .course{
    left 34px
  }
  .activity {
    right 34px
  }
  .on{
     background: url('./imgs/on.png') no-repeat;
     color white
  }
  .search{
    background-color #F3EFE8
    width 90%
    margin-left 16px
  }
  ul{
    margin-top 14px
    li{
      display flex
      width 315px
      height 130px
      margin-left 16px
      background-color #FFF8EC
      border 1px solid #E8CC9F
      border-radius 5px
      padding 14px
      box-sizing: border-box
      .info{
        width 45px
        .avatar{
          width 45px
          height 45px
          border-radius 45px
          overflow hidden
          img{
            width 100%
            height 100%
          }
        }
        span{
          display block
          background-color #E0643D
          width 30px
          height 12px
          margin 0 auto
          font-size 9px
          border-radius 6px
          color white
          margin-top -6px
        }
     }
      .content{
        width 231px
        margin-left 12px
        text-align left
        .author{
          height 24px
          color #272828
          font-size 15px
          line-height 24px
          span{
            color #828282
            font-size 12px
            margin-left 100px
          }
        }
        p{
          height 31px
          color #484747
          font-size 14px
          text-align left
        }
        i{
          display block
          height 11px
          margin 9px 0
          color #828282
          font-size 12px
        }
        .source{
          color #828282
          font-size 12px
          .sourse-type{
            color #D19A43
            font-weight bolder
          }
          .count{
            color #FF8800
            margin-left 130px
          }
        }
      }
    }
  }
}
</style>
