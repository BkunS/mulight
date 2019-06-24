<template>
  <div id="app">
    <el-container>
      <el-header height="50px"><Header :title="title" /></el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'app',
  components: {
    Header
  },
  data: () => ({
    title: 'Questions'
  }),
  created() {
    this.updateTitle(this.$route.name)
  },
  watch: {
    '$route' (to) {
      this.updateTitle(to.name)
    }
  },
  methods: {
    updateTitle(pathName) {
      switch(pathName) {
        case 'QuestionsList':
          return this.title = 'Questions'
        case 'QuestionsDetail':
          return this.title = 'Questions Detail'
        case 'CreateQuestion':
          return this.title = 'Create Question'
      }
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
  margin-top: 30px;
}
</style>
