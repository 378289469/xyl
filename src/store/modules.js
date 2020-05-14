
const TIP_MSG = 'tip_msg'

export default ({
  state: {
    tips: {
      type: 0,
      msg: ''
    }
  },
  mutations: {
    [TIP_MSG] (state, { tips }) {
      state.tips = tips
    }
  },
  actions: {
    tipMsg ({ commit, state }, tips) { // type 1加载中  2成功  3失败 4不能为空 5自定义消息
      tips.type = `${tips.type}${Date.now()}`
      commit(TIP_MSG, { tips })
    }
  },
  modules: {
  }
})
