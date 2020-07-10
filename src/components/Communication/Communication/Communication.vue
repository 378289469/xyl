<template>
  <div id="communication">
    <h2 class="course" :class="{on: btn}" @click="course(1)">课程学习</h2>
    <h2 class="activity" :class="{on: !btn}" @click="activity(2)">活动</h2>
    <Search class="search" @Search="getEvaluate"/>
    <div class="wrap" ref="ComWrapper">
      <ul>
        <li v-for="(list, index) in evaluatelist" :key="index" @click="toCommunicationDetail(index)">
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
    <tip/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import Pullup from '@better-scroll/pull-up'
import Search from '../../Search/Search'
import routerMain from '../../../router/main.js'
import tip from '../../Tip/tip'

BScroll.use(Pullup)
BScroll.use(PullDown)

export default {
  data () {
    return {
      topicType: 1, // 1目录 2 活动
      errorurl: 'this.src="' + require('../../../../public/imgs/avatar.png') + '"',
      imgUrl: require('../../../../public/imgs/avatar.png'),
      btn: true,
      sourse: ['', '打卡', '提问'],
      page: 1,
      count: 0
    }
  },
  components: {
    Search,
    tip
  },
  computed: {
    ...mapState(['evaluatelist', 'isToken'])
  },
  methods: {
    ...routerMain,
    toCommunicationDetail (index) {
      if (this.evaluatelist[index].list.length === 0) {
        this.$store.dispatch('tipMsg', {
          tips: { type: 5, msg: '当前交流还没有教师回复' }
        }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
        return
      }
      let Communication = {
        index,
        page: this.page
      }
      Communication = JSON.stringify(Communication)
      window.localStorage.setItem('Communication', Communication)
      this.to('CommunicationDetail', { index, page: this.page })
    },
    getEvaluate (text) {
      const userId = JSON.parse(window.localStorage.getItem('UserInfo')).id
      const Evaluate = {
        isActiorchapter: this.topicType,
        userId,
        page: this.page
      }
      if (text) {
        Evaluate.context = text
      }
      this.$store.dispatch('getEvaluate', {
        ...Evaluate,
        cb: this.cb
      })
    },
    cb () {
      if (this.evaluatelist.length < 10) {
        this.$store.dispatch('tipMsg', {
          tips: { type: 5, msg: '当前是最后一页' }
        }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
        if (this.count === 0) {
          this.count = this.page
          this.page = this.count
        }
        this.bscroll && this.bscroll.scrollTo(0, 0)
        this.bscroll.finishPullDown()
        this.bscroll.finishPullUp()
      }
    },
    course (type) {
      this.count = 0
      this.bscroll && this.bscroll.scrollTo(0, 0)
      this.topicType = type
      const userId = JSON.parse(window.localStorage.getItem('UserInfo')).id
      const Evaluate = {
        isActiorchapter: this.topicType,
        userId,
        page: 1
      }
      this.$store.dispatch('getEvaluate', {
        ...Evaluate
      })
      this.btn = true
    },
    activity (type) {
      this.count = 0
      this.bscroll && this.bscroll.scrollTo(0, 0)
      this.topicType = type
      const userId = JSON.parse(window.localStorage.getItem('UserInfo')).id
      const Evaluate = {
        isActiorchapter: this.topicType,
        userId,
        page: 1
      }
      this.$store.dispatch('getEvaluate', {
        ...Evaluate
      })
      this.btn = false
    },
    initBscroll () {
      this.bscroll = new BScroll(this.$refs.ComWrapper, {
        scrollY: true,
        pullUpLoad: {
          threshold: 30, // 下拉距离
          stop: 30 // 停止距离
        },
        click: true,
        pullDownRefresh: {
          threshold: 30, // 下拉距离
          stop: 30 // 停止距离
        }
      })
      this.bscroll.on('pullingDown', () => {
        if (this.page === 1) {
          this.$store.dispatch('tipMsg', {
            tips: { type: 5, msg: '当前是第一页' }
          }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
          this.page = 1
          return
        }
        this.page -= 1
        this.getEvaluate()
      })
      this.bscroll.on('pullingUp', () => {
        this.page += 1
        if (this.count !== 0) {
          this.page = this.count
        }
        this.getEvaluate()
      })
    }
  },
  mounted () {
    const userId = JSON.parse(window.localStorage.getItem('UserInfo')).id
    const Evaluate = {
      isActiorchapter: this.topicType,
      userId,
      page: 1
    }
    this.$store.dispatch('getEvaluate', {
      ...Evaluate
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
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 80%;
  padding-top 35px
  background: url('../../../../public/imgs/homeCourse.png') no-repeat;
  background-color: white;
  .course,.activity {
    position: absolute;
    top: -22px;
    width: 127px;
    height: 44px;
    background: url('../../../../public/imgs/title.png') no-repeat;
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
     background: url('../../../../public/imgs/titlebg.png') no-repeat;
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
      .page{
        text-align center
        color #888
      }
      li{
        display flex
        width 90%
        height 130px
        margin 10px auto
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
