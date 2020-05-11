<template>
  <div id="course">
    <h2>课程目录</h2>
    <ul >
      <li v-for="(chapters,index) in chapter " :key="index">
        <div  class="dir" :class="chapters.chapterLevel? dirClass[chapters.chapterLevel] : dirClass[4]" @click="show(index)">
          <span v-show="chapters.oldName" class="iconfont" :class="{'icon-pdf':chapters.oldName}" ></span>
          <span v-show="chapters.chapterName" class="title ellipsis">{{chapters.chapterName}}</span>
          <span v-show="chapters.oldName" class="title ellipsis">{{chapters.oldName}}</span>
          <span v-show="chapters.chapterName" class="iconfont" :class="chapters.isShow? 'icon-up' : 'icon-down'"></span>
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
      dirClass: ['', 'one=dir', 'two-dir', 'three-dir', 'resource-dir'],
      id: '0',
      index: 0,
      noteId: 0
    }
  },
  computed: {
    ...mapState(['CourseChapter', 'PdfFile']),
    chapter () {
      const { CourseChapter, id, index } = this
      let chapter = []
      try {
        if (CourseChapter[index].isShow) {
          chapter = CourseChapter.filter(cc => cc.parentId === '0' || cc.id === id || cc.parentId === id)
          if (CourseChapter[index].chapterLevel === 3) {
            chapter.splice(index, 0, this.PdfFile[0])
          }
        } else {
          chapter = CourseChapter.filter(cc => cc.parentId === '0' || cc.id === id)
        }
      } catch (error) {}
      return chapter
    }
  },
  methods: {
    show (index) {
      const id = this.id = this.chapter[index].id
      let CourseChapterId = 0
      this.CourseChapter.forEach((cc, key) => {
        if (cc.id === id) {
          cc.isShow = !cc.isShow
          CourseChapterId = key
        }
      })
      if (this.CourseChapter[CourseChapterId].chapterLevel === 3) {
        this.$store.dispatch('getPdfFile', { mainId: id, id: 1 })
        this.noteId = id
      }
      if (this.chapter[index].oldName) {
        this.$router.push({ name: 'PDF', params: { url: this.chapter[index].path, id: this.noteId } })
      }
      this.index = CourseChapterId
      this.CourseChapter.splice(0, 1, this.CourseChapter[0])
    }
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
    text-indent : 1em
    .iconfont{
      margin-left -1em
    }
  }

  .three-dir {
    background-color: #FFFAF3;
    color: #333333;
    border-radius: 0!important
    text-indent : 2em
    .iconfont{
      margin-left -1.8em
    }
  }

  .resource-dir {
    background-color: #FFFFFF;
    color: #925F25;
    border-radius: 0!important
    text-indent : 1em
    .iconfont{
      margin-right -1.5em
      margin-left 2em
    }
  }

  .show {
    border-radius: 5px 5px 0 0;
  }

  .hide {
    border-radius: 5px;
  }
}
</style>
