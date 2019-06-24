<template>
  <div class="root">
    <div v-if="question" class="question">
      Question: {{question.question}}
    </div>
    <el-table
      v-if="question"
      :data="question.choices"
      style="width: 100%"
      v-loading="loadingTable"
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
import localforage from 'localforage'
import { getQuestionById, voteChoiceByQuestionId } from '../apis'

export default {
  name: 'QuestionsDetail',
  data: () => ({
    loadingTable: false,
    loadingIndex: -1,
    question: {}
  }),
  created() {
    let questionUrl = this.$store.state.selectQuestion
    let promise
    if (questionUrl) {
       promise = this.getQuestionData(questionUrl)
    } else {
      promise = localforage.getItem('selectQuestion').then(questionUrl => {
        return this.getQuestionData(questionUrl)
      })
    }

    return promise.catch(err => {
      this.$message.error(err.toString())
      this.$router.replace({ path: '/' })
    })
  },
  methods: {
    getQuestionData(questionUrl) {
      if (!questionUrl) throw new Error('Question url not found.')

      this.loadingTable = true
      return getQuestionById(questionUrl).then(ret => {
        if (!ret || !ret.question || !Array.isArray(ret.choices)) return

        let total = ret.choices.reduce((sum, item) => {
          return sum + item.votes
        }, 0)
        total = total === 0 ? 1 : total
        ret.choices = ret.choices.map(choice => {
          choice.percent = `${(choice.votes / total * 100).toFixed(0)}%`
          return choice
        })
        this.question = ret
      }).finally(() => {
        this.loadingTable = false
      })
    },
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
