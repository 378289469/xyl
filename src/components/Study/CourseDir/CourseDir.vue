<template>
  <div id="course">
    <h2>课程目录</h2>
    <div class="courseDir">
      <ul>
        <li v-for="(chapters,index) in chapter " :key="index">
          <div  class="dir" :class="chapters.chapterLevel? dirClass[chapters.chapterLevel] : dirClass[4]" @click="show(index)">
            <span v-show="chapters.oldName" class="iconfont" :class="{'icon-pdf':chapters.oldName}" ></span>
            <span v-show="chapters.chapterName" class="title ellipsis">{{chapters.chapterName}}</span>
            <span v-show="chapters.oldName" class="title ellipsis">{{chapters.oldName}}</span>
            <!-- <img :src="imgUrl" alt="" v-if="chapters.chapterLevel === 3"> -->
            <span v-show="chapters.chapterName" class="iconfont" :class="chapters.isShow? 'icon-up' : 'icon-down'"></span>
          </div>
        </li>
      </ul>
    </div>
    <tip/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BScroll from 'better-scroll'
import routerMain from '../../../router/main.js'
import tip from '../../Tip/tip'
export default {
  data () {
    return {
      dirClass: ['', 'one=dir', 'two-dir', 'three-dir', 'resource-dir'],
      id: 0,
      one: false,
      two: false,
      three: false,
      imgUrl: require('../../../../public/imgs/eye.png')
    }
  },
  components: {
    tip
  },
  mounted () {
    this.bscroll = new BScroll('.courseDir', { // eslint-disable-line
      scrollY: true,
      click: true,
      pullDownRefresh: {
        threshold: 30, // 下拉距离
        stop: 30 // 停止距离
      }
    })
    this.bscroll.on('pullingDown', () => {
      this.$store.dispatch('getCourseChapter')
      this.bscroll.finishPullDown()
    })
  },
  computed: {
    ...mapState(['CourseChapter', 'PdfFile', 'isToken']),
    chapter () {
      const { CourseChapter } = this
      let chapter = []
      if (CourseChapter.length > 0) {
        chapter = CourseChapter.filter(cc => cc.parentId === '0' || cc.isShow)
      }
      return chapter
    }
  },
  methods: {
    ...routerMain,
    show (index) {
      this.id = this.chapter[index].id
      // if (this.chapter[index] && this.chapter[index].oldName) {
      //   let pdf = {
      //     url: this.chapter[index].path,
      //     id: this.chapter[index].id
      //   }
      //   pdf = JSON.stringify(pdf)
      //   window.localStorage.setItem('pdf', pdf)
      //   this.to('PDF')
      //   return
      // }
      this.CourseChapter.forEach((cc, key) => {
        if (cc.id === this.id) {
          cc.isShow = true
        }
        if ((cc.parentId * 1) === (this.id * 1)) {
          if (cc.isShow) {
            this.chapter[index].chapterLevel === 1 && (this.one = false)
            this.chapter[index].chapterLevel === 2 && (this.two = false)
            this.chapter[index].chapterLevel === 3 && (this.three = false)
            cc.isShow = false
          } else {
            this.chapter[index].chapterLevel === 1 && (this.one = true)
            this.chapter[index].chapterLevel === 2 && (this.two = true)
            this.chapter[index].chapterLevel === 3 && (this.three = true)
            cc.isShow = true
          }
        }
        if (cc.id === this.id && cc.chapterLevel === 3) {
          if (cc.isPDF) {
            return
          }
          this.$store.dispatch('getPdfFile', {
            mainId: cc.id,
            id: 1,
            cb: () => {
              cc.isPDF = true
              const PdfFile = this.PdfFile[0]
              if (PdfFile) {
                let pdf = {
                  url: this.chapter[index].path,
                  id: this.chapter[index].id
                }
                pdf = JSON.stringify(pdf)
                window.localStorage.setItem('pdf', pdf)
                this.to('PDF')
                // PdfFile.parentId = this.chapter[index].id
                // PdfFile.isShow = true
                // this.CourseChapter.splice(key + 1, 0, PdfFile)
              } else {
                this.$store.dispatch('tipMsg', {
                  tips: { type: 5, msg: '当前目录暂无内容' }
                }) // type 1加载中  2成功  3失败 4不能为空 5自定义消息
              }
            }
          })
        }
      })
      if (!this.one) {
        this.CourseChapter.forEach((cc, key) => {
          if (cc.chapterLevel === 2 || cc.chapterLevel === 3 || cc.oldName) {
            cc.isShow = false
          }
        })
      }
      if (!this.two) {
        this.CourseChapter.forEach((cc, key) => {
          if (cc.chapterLevel === 3 || cc.oldName) {
            cc.isShow = false
          }
        })
      }
      if (!this.three) {
        this.CourseChapter.forEach((cc, key) => {
          if (cc.oldName) {
            cc.isShow = false
          }
        })
      }
      this.CourseChapter.splice(0, 0)
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
  .courseDir{
    height 70vh
    overflow hidden
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
      width 85%
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
    .icon-up, icon-down{
      margin-left -30px
      margin-top -30px
      transform rotate(90deg)
    }
    img{
      width 15px
      height 15px
      margin-top 15px
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
