import Vue from 'vue'
import Vuex from 'vuex'
import localforage from 'localforage'

localforage.setDriver([
  localforage.INDEXEDDB,
  localforage.WEBSQL,
  localforage.LOCALSTORAGE
]);

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    questions: [],
    selectQuestion: ''
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
    updateQuestions({ commit }, value) {
      commit('updateQuestions', value)
    },
    updateSelectQuestion({ commit }, value) {
      commit('updateSelectQuestion', value)
      return localforage.ready().then(() => {
        return localforage.setItem('selectQuestion', value)
      }).catch(() => {

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
