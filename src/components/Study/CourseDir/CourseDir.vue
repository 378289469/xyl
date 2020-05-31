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
    <tip/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import routerMain from '../../../router/main.js'
import tip from '../../Tip/tip'
export default {
  data () {
    return {
      dirClass: ['', 'one=dir', 'two-dir', 'three-dir', 'resource-dir'],
      id: 0,
      parentId: 0,
      index: 0,
      noteId: 0,
      pdf: false
    }
  },
  components: {
    tip
  },
  computed: {
    ...mapState(['CourseChapter', 'PdfFile', 'isToken']),
    // token () {
    //   return this.$api.getStorage('userinfo')
    // },
    chapter () {
      const { CourseChapter, id, index, parentId } = this
      let chapter = []
      if (CourseChapter.length > 0) {
        if (CourseChapter[index].isShow) {
          chapter = CourseChapter.filter(cc => cc.parentId === '0' || cc.id === id || cc.parentId === id || cc.id === parentId || cc.oldName)
        } else {
          chapter = CourseChapter.filter(cc => cc.parentId === '0' || cc.id === id || cc.id === parentId || cc.oldName)
        }
      }
      return chapter
    }
  },
  methods: {
    ...routerMain,
    show (index) {
      if (this.chapter[index] && this.chapter[index].oldName) {
        this.$router.push({ name: 'PDF', params: { url: this.chapter[index].path, id: this.noteId } })
        // this.$page.push({
        //   name: 'PDF',
        //   pageParam: {
        //     url: this.chapter[index].path,
        //     id: this.noteId
        //   }
        // })
        return
      }
      const id = this.id = this.chapter[index].id
      let CourseChapterId = 0
      this.CourseChapter.forEach((cc, key) => {
        if (cc.id === id) {
          cc.isShow = !cc.isShow
          CourseChapterId = key
          this.parentId = cc.parentId
        } else {
          cc.isShow = false
          if (cc.oldName) {
            this.CourseChapter.splice(key, 0)
          }
        }
        if (cc.oldName) {
          this.CourseChapter.splice(key, 1)
        }
      })
      this.index = CourseChapterId
      if (this.CourseChapter[CourseChapterId].chapterLevel === 3) {
        this.$store.dispatch('getPdfFile', {
          mainId: id,
          id: 1,
          cb: () => {
            const PdfFile = this.PdfFile[0]
            if (PdfFile) {
              PdfFile.parentId = null
              this.pdf = !this.pdf
              if (this.pdf) {
                this.CourseChapter.splice(CourseChapterId + 1, 0, PdfFile)
              } else {
                this.CourseChapter.splice(CourseChapterId + 1, 1)
              }
            } else {
              this.$store.dispatch('tipMsg', {
                tips: { type: 5, msg: '当前目录暂无内容' }
              }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
            }
          }
        })
        // this.$store.dispatch('checkToken', {
        //   token: this.token,
        //   cb: () => {
        //     if (this.isToken) {
        //       this.$store.dispatch('getPdfFile', {
        //         mainId: id,
        //         id: 1,
        //         cb: () => {
        //           const PdfFile = this.PdfFile[0]
        //           if (PdfFile) {
        //             PdfFile.parentId = null
        //             this.pdf = !this.pdf
        //             if (this.pdf) {
        //               this.CourseChapter.splice(CourseChapterId + 1, 0, PdfFile)
        //             } else {
        //               this.CourseChapter.splice(CourseChapterId + 1, 1)
        //             }
        //           } else {
        //             this.$store.dispatch('tipMsg', {
        //               tips: { type: 5, msg: '当前目录暂无内容' }
        //             }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
        //           }
        //         }
        //       })
        //     } else {
        //       this.to('UserLogin', {}, '')
        //     }
        //   }
        // })
        this.noteId = id
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
#course {
  position: absolute;
  top: 112px;
	left: 50%;
	width: 90%;
  height: 80%;
  padding-top 35px
  transform: translateX(-50%)
  background: url('../../../../public/imgs/homeCourse.png') no-repeat;
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
    background: url('../../../../public/imgs/titlebg.png') no-repeat;
    color: white;
    font-size: 20px;
    line-height: 52px;
    text-align center
  }
  .dir {
    display flex
    width: 90%
    height: 45px
    margin 0 auto
    font-size: 14px;
    line-height 45px
    text-align left
    border 1px solid #E1BD85
    .iconfont {
      display block
      color #925F25
    }
    .title {
      display block
      width 80%
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
      margin-left -15px
    }
  }

  .three-dir {
    background-color: #FFFAF3;
    color: #333333;
    border-radius: 0!important
    text-indent : 2em
    .iconfont{
      margin-left -30px
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
