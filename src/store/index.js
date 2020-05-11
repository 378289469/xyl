import Vue from 'vue'
import Vuex from 'vuex'

import {
  reqCourseIntroduce,
  reqCourseLearners,
  reqActivitys,
  reqTeachers,
  reqCourseChapter,
  reqGetPdfFile,
  reqGetNote,
  reqEvaluate
} from '../api/index'

import modules from './modules'

Vue.use(Vuex)

const RECEIVE_COURSE_INTRODUCE = 'receive_course_introduce'
const RECEIVE_COURSE_LEARNERS = 'receive_course_learners'
const RECEIVE_ACTIVITYS = 'receive_activitys'
const RECEIVE_TEACHERS = 'receive_teachers'
const RECEIVE_COURSE_CHAPTER = 'receive_course_chapter'
const RECEIVE_GET_PDF_FILE = 'receive_get_pdf_file'
const RECEIVE_GET_NOTE = 'receive_get_note'
const RECEIVE_ADD_EVALUATE = 'receive_add_evaluate'

export default new Vuex.Store({
  state: {
    courseintroduce: {},
    courselearners: 0,
    activitys: [],
    searchActivitys: [],
    teachers: [],
    usertype: [1, 2],
    CourseChapter: [],
    mainId: '',
    PdfFile: [],
    notes: '',
    msg: ''
  },
  mutations: {
    [RECEIVE_COURSE_INTRODUCE] (state, { courseintroduce }) {
      state.courseintroduce = courseintroduce
    },
    [RECEIVE_COURSE_LEARNERS] (state, { courselearners }) {
      state.courselearners = courselearners
    },
    [RECEIVE_ACTIVITYS] (state, { activitys }) {
      state.activitys = activitys
      state.searchActivitys = activitys
    },
    [RECEIVE_TEACHERS] (state, { teachers }) {
      state.teachers = teachers
    },
    [RECEIVE_COURSE_CHAPTER] (state, { CourseChapter }) {
      state.CourseChapter = CourseChapter
    },
    [RECEIVE_GET_PDF_FILE] (state, { PdfFile }) {
      state.PdfFile = PdfFile
    },
    [RECEIVE_GET_NOTE] (state, { notes }) {
      state.notes = notes
    },
    [RECEIVE_ADD_EVALUATE] (state, { msg }) {
      state.msg = msg
    }
  },
  actions: {
    async getCourseIntroduce ({ commit, state }) {
      const result = await reqCourseIntroduce()
      if (result.code === 200) {
        // console.log(result)
        const courseintroduce = result.result.courseIntroduce
        commit(RECEIVE_COURSE_INTRODUCE, { courseintroduce })
      }
    },
    async getCourseLearners ({ commit, state }) {
      const result = await reqCourseLearners()
      if (result.code === 200) {
        // console.log(result)
        const courselearners = result.result.studentCount
        commit(RECEIVE_COURSE_LEARNERS, { courselearners })
      }
    },
    async reqActivitys ({ commit, state }) {
      const result = await reqActivitys()
      if (result.code === 200) {
        // console.log(result)
        const activitys = result.result.records
        commit(RECEIVE_ACTIVITYS, { activitys })
      }
    },
    async getTeachers ({ commit, state }) {
      const result = await reqTeachers(state.usertype[0])
      if (result.code === 200) {
        // console.log(result)
        const teachers = result.result.records
        commit(RECEIVE_TEACHERS, { teachers })
      }
    },
    async getCourseChapter ({ commit, state }) {
      const result = await reqCourseChapter()
      if (result.code === 200) {
        // console.log(result)
        let CourseChapter = result.result.records
        const oneChapter = CourseChapter.filter(cc => cc.chapterLevel === 1)
        const twoChapter = CourseChapter.filter(cc => cc.chapterLevel === 2)
        const threeChapter = CourseChapter.filter(cc => cc.chapterLevel === 3)
        const temp = []
        oneChapter.forEach(one => {
          temp.push(one)
          twoChapter.forEach(two => {
            if (two.parentId === one.id) {
              temp.push(two)
              threeChapter.forEach(three => {
                if (three.parentId === two.id) {
                  temp.push(three)
                }
              })
            }
          })
        })
        CourseChapter = temp
        commit(RECEIVE_COURSE_CHAPTER, { CourseChapter })
      }
    },
    async getPdfFile ({ commit, state }, { mainId, id }) {
      const result = await reqGetPdfFile(mainId, id)
      if (result.code === 200) {
        const PdfFile = result.result.records
        commit(RECEIVE_GET_PDF_FILE, { PdfFile })
      }
    },
    async getNote ({ commit, state }, mainId) {
      const result = await reqGetNote(mainId)
      if (result.code === 200) {
        const notes = result.result.records
        commit(RECEIVE_GET_NOTE, { notes })
      }
    },
    async addEvaluate ({ commit, state }, Evaluate) {
      const result = await reqEvaluate(Evaluate)
      if (result.code === 200) {
        const msg = result.result.message
        commit(RECEIVE_ADD_EVALUATE, { msg })
      }
    }
  },
  modules: {
    modules
  }
})
