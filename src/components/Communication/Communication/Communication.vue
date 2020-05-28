<template>
  <div id="communication">
    <h2 class="course" :class="{on: btn}" @click="course(1)">课程学习</h2>
    <h2 class="activity" :class="{on: !btn}" @click="activity(2)">活动</h2>
    <Search class="search"/>
    <div class="wrap" ref="bsWrapper">
      <ul>
        <li v-for="(list, index) in evaluatelist" :key="index" @click="hand(index)">
          <div class="info">
            <div class="avatar">
              <img :src="list.user.avatar || imgUrl" alt="avatar" :onerror="errorurl">
            </div>
            <span>学生</span>
          </div>
          <div class="content">
            <div class="author">
                <span class="realname">{{list.user.realname}}</span>
                <span class="createTime">{{list.createTime}}</span>
            </div>
            <p>{{list.context}}</p>
            <i class="ellipsis">知识点：{{list.chapter? list.chapter.chapterPath: ''}}{{list.chapter? list.chapter.chapterName: ''}}</i>
            <div class="source">来源：<span class="sourse-type">{{sourse[list.topicType]}}</span><span class="count">{{list.list.length}}</span>回复</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'
import Search from '../../Search/Search'
import routerMain from '../../../router/main.js'

BScroll.use(Pullup)
BScroll.use(PullDown)

export default {
  data () {
    return {
      topicType: 1, // 1目录 2 活动
      errorurl: 'this.src="' + require('./imgs/person.png') + '"',
      imgUrl: require('./imgs/person.png'),
      btn: true,
      sourse: ['', '打卡', '提问'],
      page: 1,
      isPull: false
    }
  },
  components: {
    Search
  },
  computed: {
    ...mapState(['evaluatelist', 'isToken']),
    token () {
      return this.$api.getStorage('userinfo')
    }
  },
  methods: {
    ...routerMain,
    hand (index) {
      this.to('CommunicationDetail', { index, page: this.page })
    },
    getEvaluate () {
      const userId = this.token.result.userInfo.id
      this.$store.dispatch('getEvaluate', {
        isActiorchapter: this.topicType,
        userId,
        page: this.page,
        cb: () => {
          this.initBscroll()
        }
      })
    },
    course (type) {
      this.topicType = type
      this.$store.dispatch('checkToken', {
        token: this.token,
        cb: () => {
          if (this.isToken) {
            this.getEvaluate()
          } else {
            this.to('UserLogin', {}, '')
          }
        }
      })
      this.btn = true
    },
    activity (type) {
      this.topicType = type
      this.$store.dispatch('checkToken', {
        token: this.token,
        cb: () => {
          if (this.isToken) {
            this.getEvaluate()
          } else {
            this.to('UserLogin', {}, '')
          }
        }
      })
      this.btn = false
    },
    initBscroll () {
      this.bscroll = new BScroll(this.$refs.bsWrapper, {
        scrollY: true,
        pullUpLoad: true,
        pullDownRefresh: {
          threshold: 80, // 下拉距离
          stop: 30 // 停止距离
        }
      })
      this.bscroll.on('pullingDown', () => {
        if (!this.isPull) {
          this.isPull = true
          if (this.page < 2) {
            return
          }
          this.page -= 1
          this.getEvaluate()
        }
      })
      this.bscroll.on('pullingUp', () => {
        if (!this.isPull) {
          this.isPull = true
          if (this.activitys) {
            this.page -= 1
            return
          }
          this.page += 1
          this.getEvaluate()
        }
      })
    }
  },
  created () {
    this.bscroll = null
  },
  mounted () {
    this.$store.dispatch('checkToken', {
      token: this.token,
      cb: () => {
        if (this.isToken) {
          this.getEvaluate()
        } else {
          this.to('UserLogin', {}, '')
        }
      }
    })
  },
  updated () {
    this.initBscroll()
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
    text-align center
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
  .wrap{
    height 85%
    margin-top 14px
    overflow hidden
  }
    ul{
      margin-top 14px
      li{
        display flex
        width 315px
        height 130px
        margin 16px
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
            position relative
            z-index 10
            display block
            background-color #E0643D
            width 30px
            height 12px
            margin 0 auto
            font-size 9px
            border-radius 6px
            color white
            margin-top -6px
            text-align center
          }
       }
        .content{
          width 231px
          margin-left 12px
          text-align left
          .author{
            display flex
            justify-content center
            height 24px
            color #272828
            font-size 15px
            line-height 24px
            .realname{
              display block
              width 30%
              overflow hidden
            }
            .createTime{
              display block
              width 70%
              color #828282
              font-size 12px
              overflow hidden
            }
          }
          p{
            height 35px
            color #484747
            font-size 14px
            line-height 18px
            text-align left
            overflow hidden
          }
          i{
            display block
            height 15px
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
              margin-left 100px
            }
          }
        }
      }
    }
}
</style>
