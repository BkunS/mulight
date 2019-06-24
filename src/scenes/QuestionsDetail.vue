<template>
  <div v-if="question" class="root">
    <div class="question">
      Question: {{question.question}}
    </div>
    <el-table
      v-if="question && question.choices"
      :data="question.choices"
      style="width: 100%"
      :show-header="true">
      <el-table-column
        fixed
        prop="choice"
        label="Choice"
        min-width="70">
      </el-table-column>
      <el-table-column
        prop="votes"
        label="Votes">
      </el-table-column>
      <el-table-column
        prop="percent"
        label="Percent"
        min-width="80">
      </el-table-column>
      <el-table-column
        fixed="right"
        align="right"
        label="Vote"
        min-width="80">
        <template slot-scope="scope">
          <el-button @click="handleVoteClick(scope)" type="primary" size="small" v-loading="loadingIndex === scope.$index">Vote</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { voteChoiceByQuestionId } from '../apis'
export default {
  name: 'QuestionsDetail',
  data: () => ({
    loadingIndex: -1
  }),
  computed: {
    question: function() {
      const question = this.$store.state.selectQuestion
      if (!question || !question.question || !Array.isArray(question.choices)) {
        return this.$router.replace({ path: '/' })
      }

      let total = question.choices.reduce((sum, item) => {
        return sum + item.votes
      }, 0)
      total = total === 0 ? 1 : total
      question.choices = question.choices.map(choice => {
        choice.percent = `${(choice.votes / total * 100).toFixed(0)}%`
        return choice
      })
      return question
    }
  },
  methods: {
    handleVoteClick(scope) {
      const { $index, row } = scope
      const { choices } = this.question

      this.loadingIndex = $index
      return voteChoiceByQuestionId(row.url).then(data => {
        const updatedChoices = [
          ...choices.slice(0, $index),
          data,
          ...choices.slice($index + 1)
        ]
        const updatedQuestion = {
          ...this.question,
          choices: updatedChoices
        }
        this.$store.dispatch('updateSelectQuestion', updatedQuestion)
      }).catch((err) => {
        this.$message.error(err.toString())
      }).finally(() => {
        this.loadingIndex = -1
      })
    }
  }
}
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.question {
  margin: 20px 0;
  font-size: 18px;
  font-weight: 300;
}
</style>
