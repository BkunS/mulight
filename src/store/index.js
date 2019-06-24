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
      return localforage.setItem('selectQuestion', value).then(() => {
        commit('updateSelectQuestion', value)
      }).catch(() => {
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
