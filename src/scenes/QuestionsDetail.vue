<template>
  <div v-if="question" class="root">
    <el-table
      v-if="question && question.choices"
      :data="question.choices"
      style="width: 100%"
      :show-header="true">
      <el-table-column
        fixed
        prop="choice"
        label="Choice"
        min-width="120">
      </el-table-column>
      <el-table-column
        prop="votes"
        label="Votes">
      </el-table-column>
      <el-table-column
        prop="percentage"
        label="Percentage">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Operations"
        width="100">
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
      if (Array.isArray(question.choices)) {
        let total = question.choices.reduce((sum, item) => {
          return sum + item.votes
        }, 0)
        total = total === 0 ? 1 : total
        question.choices = question.choices.map(choice => {
          choice.percentage = `${(choice.votes / total * 100).toFixed(0)}%`
          return choice
        })
        return question
      }
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
}
</style>
