<template>
  <div id="communication">
    <dir class="top" v-if="evaluatelist.length > 0">
      <div class="info">
        <div class="avatar">
          <img :src="evaluatelist[index].user.avatar || imgUrl" alt="avatar" :onerror="errorurl">
        </div>
        <span>学生</span>
      </div>
      <div class="content">
        <div class="author">
            <span class="realname">{{evaluatelist[index].user.realname}}</span>
            <span class="createTime">{{evaluatelist[index].createTime}}</span>
        </div>
        <p>{{evaluatelist[index].context}}</p>
        <i class="ellipsis">知识点：{{evaluatelist[index].chapter? evaluatelist[index].chapter.chapterPath: ''}}{{evaluatelist[index].chapter? evaluatelist[index].chapter.chapterName: ''}}</i>
        <div class="source">来源：<span class="sourse-type">{{sourse[evaluatelist[index].topicType]}}</span><span class="count">{{evaluatelist[index].list.length}}</span>回复</div>
      </div>
    </dir>
    <div class="wrap" v-if="componentslist.length > 0">
      <ul >
        <li v-for="(list, index) in componentslist" :key="index" @click="hand()">
          <div class="info">
            <div class="avatar">
              <img :src="list.user.avatar || imgUrl" alt="avatar" :onerror="errorurl">
            </div>
            <span>{{roleItem[list.user.roleItemId]}}</span>
          </div>
          <div class="content">
            <div class="author">
                <span class="user">{{list.user.realname}}</span>
                <span class="realname">回复</span>
                <span class="targetUser">{{list.targetUser.realname}}</span>
            </div>
            <div class="context">
              <p>{{list.context}}测试测试测试测试测试测试测试测试测试测试测试测测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试试测试测试测试测试测试测试测试测试测试测试测试测试测试</p>
            </div>
             <span class="createTime">{{list.user.updateTime}}</span>
          </div>
        </li>
      </ul>
    </div>
    <p class="footbar">点击教师回复可以进行追问</p>
    <wheel ref="wheel"/>
    <tip/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import routerMain from '../../../router/main.js'
import wheel from '../../Wheel/wheel'
import tip from '../../Tip/tip'

export default {
  data () {
    return {
      errorurl: 'this.src="' + require('./imgs/person.png') + '"',
      imgUrl: require('./imgs/person.png'),
      sourse: ['', '打卡', '提问'],
      roleItem: ['', '教师', '学生', '学生']
    }
  },
  components: {
    wheel,
    tip
  },
  computed: {
    ...mapState(['evaluatelist', 'componentslist']),
    index () {
      return this.$page.pageParam().index
    }
  },
  methods: {
    ...routerMain,
    wheel (id) {
      this.ansIsOn = id === 1
      this.signIsOn = id === 2
      const title = id === 1 ? '提问' : '打卡'
      this.$refs.wheel.wheel(title, this.$route.params.id)
    },
    getEvaluateCb () {
      this.$store.dispatch('getEvaluateComponents', { parentId: this.evaluatelist[this.index].id })
    }
  },
  mounted () {
    this.$store.dispatch('getEvaluate', { isActiorchapter: this.topicType, cb: this.getEvaluateCb })
  },
  updated () {
    if (this.evaluatelist.length > 0) {
      try {
        new BScroll('.wrap') // eslint-disable-line
      } catch (error) {}
    }
    if (this.componentslist.length > 0) {
      new BScroll('.context', {// eslint-disable-line
        stopPropagation: true
      })
    }
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
  height: 77%;
  padding-top 15px
  background: url('./imgs/bg.png') no-repeat;
  background-color: white;
  .top{
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
    }
  }
  .wrap{
    height 69%
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
            .realname, .user, .targetUser{
              display block
              width 30%
              overflow hidden
            }
            .realname{
              color #828282
              width 15%
            }
          }
          .context{
            height 50px
            color #484747
            font-size 14px
            line-height 18px
            text-align left
            overflow hidden
          }
          .createTime{
            display block
            width 70%
            color #828282
            font-size 12px
            overflow hidden
            margin 10px 0
          }
        }
      }
    }
   .footbar{
     position fixed
     bottom 10px
     width 346px
     height 35px
     border-radius 20px
     background-color white
     line-height 35px
     font-size 13px
     color #828282
     text-align center
   }
}
</style>
