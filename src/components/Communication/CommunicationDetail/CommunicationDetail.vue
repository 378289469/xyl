<template>
  <div id="communication">
    <dir class="top">
      <div class="info">
        <div class="avatar">
          <img :src="evaluatelist[id].user.avatar || imgUrl" alt="avatar" :onerror="errorurl">
        </div>
        <span>学生</span>
      </div>
      <div class="content">
        <div class="author">
            <span class="realname">{{evaluatelist[id].user.realname}}</span>
            <span class="createTime">{{evaluatelist[id].createTime}}</span>
        </div>
        <p>{{evaluatelist[id].context}}</p>
        <i class="ellipsis">知识点：{{evaluatelist[id].chapter? evaluatelist[id].chapter.chapterPath: ''}}{{evaluatelist[id].chapter? evaluatelist[id].chapter.chapterName: ''}}</i>
        <div class="source">来源：<span class="sourse-type">{{sourse[evaluatelist[id].topicType]}}</span><span class="count">{{evaluatelist[id].list.length}}</span>回复</div>
      </div>
    </dir>
    <div class="wrap">
      <ul>
        <li v-for="(list, index) in evaluatelist" :key="index" @click="to('CommunicationDetail', {index})">
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
      id: 0
    }
  },
  components: {
    wheel,
    tip
  },
  computed: {
    ...mapState(['evaluatelist']),
    list () {
      return this.$page.pageParam().list
    }
  },
  methods: {
    ...routerMain,
    wheel (id) {
      this.ansIsOn = id === 1
      this.signIsOn = id === 2
      const title = id === 1 ? '提问' : '打卡'
      this.$refs.wheel.wheel(title, this.$route.params.id)
    }
  },
  mounted () {
    this.$store.dispatch('getEvaluate', { isActiorchapter: 1 })
    new BScroll('.wrap') // eslint-disable-line
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
  height: 85%;
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
          margin-left 130px
        }
      }
    }
  }
  .wrap{
    height 95%
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
              margin-left 130px
            }
          }
        }
      }
    }
}
</style>
