<template>
  <div>
    <Header>
      <span class="iconfont icon-left back" slot="back" @click="back"/>
      <img src="./imgs/title.png" alt="title" class="title" slot="title">
    </Header>
    <div id="ActivityDetail">
      <div class="content" v-for="(ad, index) in ActivityDetail" :key="index">
        <div class="title">
          <span>{{ad.tag}}</span>
          <h3 v-if="ad.title">{{ad.title}}</h3>
        </div>
        <p v-if="ad.content">《资本论》第一卷：资本的生产过程内容探讨 资本的生产过程内容探讨</p>
      </div>
      <button>提问</button>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header/Header'

export default {
  components: {
    Header
  },
  data () {
    return {
      ActivityDetail: [
        { title: true, tag: '名称：' },
        { content: true, tag: '内容：' },
        { title: true, tag: '时间：' },
        { content: true, tag: '任务：' },
        { content: true, tag: '附件：' }
      ],
      activity: this.$route.params.activity
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#ActivityDetail
  position absolute
  top 110px
  left 0
  right 0
  margin 0 auto
  width 345px
  height 85%
  background url('./imgs/bg.png') no-repeat
  .content
    width 90%
    margin auto
    .title
      display flex
      padding 15px
      background-color #FFEAD0
      border-radius 5px
      margin-top 16px
      font-size 14px
      span
       color #925F25
       font-weight bolder
      h3
        font-weight bold
    p
      padding 15px
      text-align left
      background-color #FFF4E2
      box-shadow 0 0 1px #D7702D
</style>
