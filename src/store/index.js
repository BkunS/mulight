import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: []
  },
  getters: {
    questions(state) {
      return state.questions
    }
  },
  actions: {
    updateQuestions({ commit }, value) {
      commit('updateQuestions', value)
    }
  },
  mutations: {
    updateQuestions(state, value) {
      state.questions = value
    }
  }
})
