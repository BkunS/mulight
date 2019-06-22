import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './plugins/element.js'

import QuestionsList from './scenes/QuestionsList'
import QuestionsDetail from './scenes/QuestionsDetail'

Vue.config.productionTip = false

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', name: 'QuestionsList', component: QuestionsList },
    { path: '/detail', name: 'QuestionDetails', component: QuestionsDetail }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
