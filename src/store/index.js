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
  reqEvaluate,
  reqEvaluateList,
  reqUserRegister,
  reqUserLogin,
  setUserPassword,
  getUserGroup
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
const RECEIVE_GET_EVALUATE = 'receive_get_evaluate'
const RECEIVE_USER_REGISTER = 'receive_user_register'
const RECEIVE_USER_LOGIN = 'receive_user_login'
const RECEIVE_SET_PWD = 'receive_set_pwd'
const RECEIVE_GET_USER_GROUP = 'receive_get_user_group'

export default new Vuex.Store({
  state: {
    courseintroduce: {},
    courselearners: 0,
    activitys: false,
    searchActivitys: [],
    teachers: [],
    usertype: [1, 2],
    CourseChapter: [],
    mainId: '',
    PdfFile: [],
    notes: '',
    msg: '',
    evaluatelist: [],
    register: {},
    userInfo: {},
    pwdInfo: {},
    UserGroup: []
  },
  mutations: {
    [RECEIVE_COURSE_INTRODUCE] (state, { courseintroduce }) {
      state.courseintroduce = courseintroduce
    },
    [RECEIVE_COURSE_LEARNERS] (state, { courselearners }) {
      state.courselearners = courselearners
    },
    [RECEIVE_ACTIVITYS] (state, { activitys }) {
      if (activitys.length === 0) {
        state.activitys = true
      } else {
        state.activitys = false
        state.searchActivitys = activitys
      }
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
    },
    [RECEIVE_GET_EVALUATE] (state, { evaluatelist }) {
      state.evaluatelist = evaluatelist
    },
    [RECEIVE_USER_REGISTER] (state, { register }) {
      state.register = register
    },
    [RECEIVE_USER_LOGIN] (state, { userInfo }) {
      state.userInfo = userInfo
    },
    [RECEIVE_SET_PWD] (state, { pwdInfo }) {
      state.pwdInfo = pwdInfo
    },
    [RECEIVE_GET_USER_GROUP] (state, { UserGroup }) {
      state.UserGroup = UserGroup
    }
  },
  actions: {
    async getCourseIntroduce ({ commit, state }) {
      const result = await reqCourseIntroduce()
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        // console.log(result)
        const courseintroduce = result.result.courseIntroduce
        commit(RECEIVE_COURSE_INTRODUCE, { courseintroduce })
      }
    },
    async getCourseLearners ({ commit, state }) {
      const result = await reqCourseLearners()
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        // console.log(result)
        const courselearners = result.result.studentCount
        commit(RECEIVE_COURSE_LEARNERS, { courselearners })
      }
    },
    async reqActivitys ({ commit, state }, { page, cb }) {
      const result = await reqActivitys(page)
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        // console.log(result)
        const activitys = result.result.records
        commit(RECEIVE_ACTIVITYS, { activitys })
        cb && cb()
      }
    },
    async getTeachers ({ commit, state }) {
      const result = await reqTeachers(state.usertype[0])
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        // console.log(result)
        const teachers = result.result.records
        commit(RECEIVE_TEACHERS, { teachers })
      }
    },
    async getCourseChapter ({ commit, state }) {
      const result = await reqCourseChapter()
      if (result.code === 200 || result.code === 0 || result.code === 500) {
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
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        const PdfFile = result.result.records
        commit(RECEIVE_GET_PDF_FILE, { PdfFile })
      }
    },
    async getNote ({ commit, state }, mainId) {
      const result = await reqGetNote(mainId)
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        const notes = result.result.records
        commit(RECEIVE_GET_NOTE, { notes })
      }
    },
    async addEvaluate ({ commit, state }, Evaluate) {
      const result = await reqEvaluate(Evaluate)
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        const msg = result.result.message
        commit(RECEIVE_ADD_EVALUATE, { msg })
      }
    },
    async getEvaluate ({ commit, state }, topicType) {
      const result = await reqEvaluateList(topicType)
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        const evaluatelist = result.result
        commit(RECEIVE_GET_EVALUATE, { evaluatelist })
      }
    },
    async userRegister ({ commit, state }, { info, cb }) {
      const result = await reqUserRegister(info)
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        const register = result
        commit(RECEIVE_USER_REGISTER, { register })
        cb && cb()
      }
    },
    async userLogin ({ commit, state }, { info, cb }) {
      const result = await reqUserLogin(info)
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        const userInfo = result
        commit(RECEIVE_USER_LOGIN, { userInfo })
        cb && cb()
      }
    },
    async changPassword ({ commit, state }, { info, cb }) {
      const result = await setUserPassword(info)
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        const pwdInfo = result.result
        commit(RECEIVE_SET_PWD, { pwdInfo })
        cb && cb()
      }
    },
    async getUserGroup ({ commit, state }) {
      const result = await getUserGroup()
      if (result.code === 200) {
        const UserGroup = result.result
        commit(RECEIVE_GET_USER_GROUP, { UserGroup })
      }
    }
  },
  modules: {
    modules
  }
})
