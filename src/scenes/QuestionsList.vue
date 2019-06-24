<template>
  <div class="root" v-loading="isLoading">
    <div v-for="question in questions" :key="question.url" class="wrapper" @click="handleItemClick(question)">
      <question-item :question="question" @click="handleItemClick"></question-item>
    </div>
  </div>
</template>

<script>
import { getQuestions } from '../apis'
import QuestionItem from '../components/QuestionItem'

export default {
  name: 'QuestionsList',
  components: {
    'question-item': QuestionItem
  },
  data: () => ({
    isLoading: false
  }),
  created() {
    this.getQuestionsData()
  },
  computed: {
    questions: function() {
      return this.$store.state.questions
    }
  },
  methods: {
    getQuestionsData() {
      this.isLoading = true
      return getQuestions().then(data => {
        data = data.map(item => {
          item.published_atStr = item.published_at ? new Date(item.published_at).toLocaleString('en-US') : 'N/A'
          item.choicesLen = Array.isArray(item.choices) ? item.choices.length : 0
          return item
        })
        this.$store.dispatch('updateQuestions', data)
      }).catch((err) => {
        this.$message.error(err.toString())
      }).finally(() => {
        this.isLoading = false
      })
    },
    handleItemClick(question) {
      return this.$store.dispatch('updateSelectQuestion', question).then(() => {
        this.$router.push({ path: 'detail' })
      })
    }
  }
}
</script>

<style scoped>
.root {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 60px;
}

.wrapper {
  border: 1px solid transparent;
}

.wrapper:hover {
  cursor: pointer;
  border: 1px solid #E4E7ED;
}
</style>
