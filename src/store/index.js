import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'

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
  reqEvaluateComponents,
  reqUserRegister,
  reqUserLogin,
  setUserPassword,
  getUserGroup,
  checkToken,
  uploadAvatar,
  editAvatar
} from '../api/index'

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
const RECEIVE_GET_EVALUATE_COMPONENTS = 'receive_get_evaluate_components'
const RECEIVE_USER_REGISTER = 'receive_user_register'
const RECEIVE_USER_LOGIN = 'receive_user_login'
const RECEIVE_USER_LOGIN_MSG = 'receive_user_login_msg'
const RECEIVE_SET_PWD = 'receive_set_pwd'
const RECEIVE_GET_USER_GROUP = 'receive_get_user_group'
const RECEIVE_CHECK_TOKEN = 'receive_check_token'
const RECEIVE_USER_AVATAR = 'receive_user_avatar'

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
    componentslist: [],
    register: {},
    userInfo: {},
    loginMsg: '',
    pwdInfo: {},
    UserGroup: [],
    isToken: false,
    userAvatar: ''
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
        state.searchActivitys = activitys
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
    [RECEIVE_GET_EVALUATE_COMPONENTS] (state, { componentslist }) {
      state.componentslist = componentslist
    },
    [RECEIVE_USER_REGISTER] (state, { register }) {
      state.register = register
    },
    [RECEIVE_USER_LOGIN] (state, { userInfo }) {
      state.userInfo = userInfo
    },
    [RECEIVE_USER_LOGIN_MSG] (state, { msg }) {
      state.loginMsg = msg
    },
    [RECEIVE_SET_PWD] (state, { pwdInfo }) {
      state.pwdInfo = pwdInfo
    },
    [RECEIVE_GET_USER_GROUP] (state, { UserGroup }) {
      state.UserGroup = UserGroup
    },
    [RECEIVE_CHECK_TOKEN] (state, { token }) {
      state.isToken = token
    },
    [RECEIVE_USER_AVATAR] (state, { userAvatar }) {
      state.userAvatar = userAvatar
    }
  },
  actions: {
    async getCourseIntroduce ({ commit, state }, cb) {
      const result = await reqCourseIntroduce()
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        // console.log(result)
        const courseintroduce = result.result.courseIntroduce
        commit(RECEIVE_COURSE_INTRODUCE, { courseintroduce })
        cb && cb()
      }
    },
    async getCourseLearners ({ commit, state }, cb) {
      const result = await reqCourseLearners()
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        // console.log(result)
        const courselearners = result.result.studentCount
        commit(RECEIVE_COURSE_LEARNERS, { courselearners })
        cb && cb()
      }
    },
    async reqActivitys ({ commit, state }, { page, activityName, cb }) {
      page = page || 1
      activityName = activityName || ''
      const result = await reqActivitys(page, activityName)
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        // console.log(result)
        const activitys = result.result.records
        commit(RECEIVE_ACTIVITYS, { activitys })
        cb && cb()
      }
    },
    async getTeachers ({ commit, state }, cb) {
      const result = await reqTeachers(state.usertype[0])
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        // console.log(result)
        const teachers = result.result.records
        commit(RECEIVE_TEACHERS, { teachers })
        cb && cb()
      }
    },
    async getCourseChapter ({ commit, state }, cb) {
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
        cb && cb()
      }
    },
    async getPdfFile ({ commit, state }, { mainId, id, cb }) {
      const result = await reqGetPdfFile(mainId, id)
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        const PdfFile = result.result.records
        commit(RECEIVE_GET_PDF_FILE, { PdfFile })
        cb && cb()
      }
    },
    async getNote ({ commit, state }, { mainId, cb }) {
      const result = await reqGetNote(mainId)
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        const notes = result.result.records
        commit(RECEIVE_GET_NOTE, { notes })
        cb && cb()
      }
    },
    async addEvaluate ({ commit, state }, { Evaluate, cb }) {
      const result = await reqEvaluate(Evaluate)
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        const msg = result.message
        commit(RECEIVE_ADD_EVALUATE, { msg })
        cb && cb()
      }
    },
    async getEvaluate ({ commit, state }, { context, isActiorchapter, userId, page, cb }) {
      const result = await reqEvaluateList(context, isActiorchapter, userId, page)
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        let evaluatelist = result.result
        evaluatelist = evaluatelist.filter(el => el.parentId === '0')
        commit(RECEIVE_GET_EVALUATE, { evaluatelist })
        cb && cb()
      }
    },
    async getEvaluateComponents ({ commit, state }, { parentId, page, cb }) {
      const result = await reqEvaluateComponents(parentId, page)
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        const componentslist = result.result.reverse()
        commit(RECEIVE_GET_EVALUATE_COMPONENTS, { componentslist })
        cb && cb()
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
        if (result.result) {
          window.localStorage.setItem('Authorization', result.result.token)
          window.localStorage.setItem('UserInfo', JSON.stringify(result.result.userInfo))
          const userInfo = result
          commit(RECEIVE_USER_LOGIN, { userInfo })
          const msg = result.message
          commit(RECEIVE_USER_LOGIN_MSG, { msg })
          cb && cb()
        } else {
          const msg = result.message
          commit(RECEIVE_USER_LOGIN_MSG, { msg })
          cb && cb()
        }
      }
    },
    async changPassword ({ commit, state }, { info, cb }) {
      const result = await setUserPassword(info)
      if (result.code === 200 || result.code === 0 || result.code === 500) {
        const pwdInfo = result
        commit(RECEIVE_SET_PWD, { pwdInfo })
        cb && cb()
      }
    },
    async getUserGroup ({ commit, state }, cb) {
      const result = await getUserGroup()
      if (result.code === 200) {
        const UserGroup = result.result
        commit(RECEIVE_GET_USER_GROUP, { UserGroup })
        cb && cb()
      }
    },
    async checkToken ({ commit, state }, { token, cb }) {
      const result = await checkToken(token)
      if (result.code === 200 || result.code === 600) {
        const token = result.success
        commit(RECEIVE_CHECK_TOKEN, { token })
        cb && cb()
      }
    },
    async UploadAvatar ({ commit, state }, { data, cb }) {
      const result = await uploadAvatar(data)
      if (result.code === 0 || result.code === 600) {
        const userAvatar = result.message
        commit(RECEIVE_USER_AVATAR, { userAvatar })
        const data = {
          avatar: result.message
        }
        const resultAvatar = await editAvatar(data)
        if (resultAvatar.code === 200 || resultAvatar.code === 600) {
          cb && cb()
        }
      }
    }
  },
  modules: {
    modules
  }
})
