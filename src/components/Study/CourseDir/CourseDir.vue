<template>
  <div id="course">
    <h2>课程目录</h2>
    <ul >
      <li v-for="(chapters,index) in chapters" :key="index">
        <div  class="dir" :class="dirClass[chapters.chapterLevel]" @click="show(index)">
          <slot name="icon" ></slot>
          <span class="title ellipsis">{{chapters.chapterName}}</span>
          <span class="iconfont icon"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      id: -1,
      dirClass: ['', 'one=dir', 'two-dir', 'three-dir']
    }
  },
  computed: {
    ...mapState(['CourseChapter']),
    chapters () {
      const { CourseChapter, id } = this
      let chapters = []
      chapters = id === -1 ? chapters = CourseChapter.filter(cc => cc.chapterLevel === 1) : CourseChapter.filter(cc => cc.chapterLevel === 1 || cc.id === id || cc.parentId === id)
      return chapters
    }
  },
  mounted () {

  },
  methods: {
    show (index) {
      this.id = this.chapters[index].id
    }
  },
  watch: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#course {
  position: absolute;
  top: 112px;
  left: 14px;
  width: 346px;
  height: 80%;
  padding-top 35px
  background: url('./imgs/bg.png') no-repeat;
  background-color: white;

  h2 {
    position: absolute;
    top: -22px;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 0 auto;
    width: 127px;
    height: 44px;
    background: url('./imgs/title.png') no-repeat;
    color: white;
    font-size: 20px;
    line-height: 52px;
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
      font-weight bolder!important
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
