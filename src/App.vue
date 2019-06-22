<template>
  <div id="app">
    <el-container>
      <el-header><Header :title="title" /></el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import QuestionsList from './scenes/QuestionsList.vue'

export default {
  name: 'app',
  components: {
    Header,
    QuestionsList
  },
  computed: {
    title: function() {
      return this.$route.name === 'QuestionsList' ? 'Questions' : 'Questions Detail'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 50px;
}
</style>
