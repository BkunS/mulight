import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './plugins/element.js'
import store from './store'

import QuestionsList from './scenes/QuestionsList'
import QuestionsDetail from './scenes/QuestionsDetail'
import CreateQuestion from './scenes/CreateQuestion'

Vue.config.productionTip = false

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/detail*', name: 'QuestionsDetail', component: QuestionsDetail },
    { path: '/create*', name: 'CreateQuestion', component: CreateQuestion },
    { path: '/*', name: 'QuestionsList', component: QuestionsList }
  ]
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
