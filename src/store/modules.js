
const TIP_MSG = 'tip_msg'
const ACTIVITY_ONE = 'activity_one'
const PDF_ONE = 'pdf_one'

export default ({
  state: {
    tips: {
      type: 0,
      msg: ''
    },
    activity: {},
    pdfFiles: {}
  },
  mutations: {
    [TIP_MSG] (state, { tips }) {
      state.tips = tips
    },
    [ACTIVITY_ONE] (state, { activity }) {
      state.activity = activity
    },
    [PDF_ONE] (state, { pdfFiles }) {
      state.pdfFiles = pdfFiles
    }
  },
  actions: {
    tipMsg ({ commit, state }, { tips, cb }) { // type 1加载中  2成功  3失败 4不能为空 5自定义消息
      tips.type = `${tips.type}${Date.now()}`
      commit(TIP_MSG, { tips })
      cb && cb()
    },
    activity ({ commit, state }, { activity, cb }) {
      commit(ACTIVITY_ONE, { activity })
      cb && cb()
    },
    pdfFiles ({ commit, state }, { pdfFiles, cb }) {
      commit(PDF_ONE, { pdfFiles })
      cb && cb()
    }
  },
  modules: {
  }
})
