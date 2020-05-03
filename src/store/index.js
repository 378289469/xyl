import Vue from 'vue'
import Vuex from 'vuex'

import {
  reqCourseIntroduce,
  reqCourseLearners,
  reqActivitys,
  reqTeachers
} from '../api/index'

Vue.use(Vuex)

const RECEIVE_COURSE_INTRODUCE = 'receive_course_introduce'
const RECEIVE_COURSE_LEARNERS = 'receive_course_learners'
const RECEIVE_ACTIVITYS = 'receive_activitys'
const RECEIVE_TEACHERS = 'receive_teachers'

export default new Vuex.Store({
  state: {
    courseintroduce: {},
    courselearners: 0,
    activitys: [],
    teachers: []
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
    },
    [RECEIVE_TEACHERS] (state, { teachers }) {
      state.teachers = teachers
    }
  },
  actions: {
    async getCourseIntroduce ({ commit, state }) {
      const result = await reqCourseIntroduce()
      if (result.code === 200) {
        // console.log(result)
        let courseintroduce = result.result.courseIntroduce
        courseintroduce = courseintroduce.replace(/<\/?.+?>/g, '')// 去掉所有html标签
        courseintroduce = courseintroduce.replace(/&\/?.+?;/g, '')// 去掉转义符
        courseintroduce = courseintroduce.slice(0, 65)// 提取前65字符
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
    getTeachers ({ commit }) {
      reqTeachers()
    }
  },
  modules: {
  }
})
