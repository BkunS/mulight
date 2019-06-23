import Vue from 'vue'
import Vuex from 'vuex'
import localforage from 'localforage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    selectQuestion: {}
  },
  getters: {
    questions(state) {
      return state.questions
    },
    selectQuestion(state) {
      return state.selectQuestion
    }
  },
  actions: {
    initStore({ commit }) {
      const promises = [localforage.getItem('selectQuestion')]
      return Promise.all(promises).then(res => {
        commit('updateSelectQuestion', res[0] ? res[0] : {})
      })
    },
    updateQuestions({ commit }, value) {
      commit('updateQuestions', value)
    },
    updateSelectQuestion({ commit }, value) {
      localforage.setItem('selectQuestion', value).then(() => {
        commit('updateSelectQuestion', value)
      })
    }
  },
  mutations: {
    updateQuestions(state, value) {
      state.questions = value
    },
    updateSelectQuestion(state, value) {
      state.selectQuestion = value
    }
  }
})
