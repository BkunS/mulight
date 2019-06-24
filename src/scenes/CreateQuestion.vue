<template>
  <div class="root">
    <el-form :model="questionForm" ref="questionForm" label-width="120px" class="questionForm">
      <el-form-item
        prop="question"
        label="Question"
        :rules="[
          { required: true, message: 'Please input question', trigger: 'blur' }
        ]"
      >
        <el-input v-model="questionForm.question"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in questionForm.choices"
        :label="'Choice ' + (index + 1)"
        :key="index"
        :prop="'choices.' + index + '.value'"
        :rules="{
          required: true, message: 'choice can not be empty', trigger: 'blur'
        }"
        class="formItem"
      >
        <el-input v-model="item.value" class="choiceInput"></el-input>
        <el-button @click.prevent="removeChoice(item)" type="danger" class="deleteBT">Delete</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('questionForm')"
          :disabled="questionForm.choices.length < 2" v-loading="isLoading">Submit</el-button>
        <el-button @click="addChoice">New Choice</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createQuestion } from '../apis'

export default {
  name: 'QuestionsList',
  data: () => ({
    questionForm: {
      question: '',
      choices: [
        {
          key: 0,
          value: ''
        },
        {
          key: 1,
          value: ''
        }
      ]
    },
    isLoading: false
  }),
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = {
            ...this.questionForm,
            choices: this.questionForm.choices.map(choice => choice.value)
          }

          this.isLoading = true
          return createQuestion(data).then(() => {
            this.$message.success('Submitted!')
            this.$router.go(-1)
          }).catch(err => {
            this.isLoading = false
            this.$message.error(err.toString())
          })
        } else {
          this.$message.error('Errors in form.')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeChoice(item) {
      var index = this.questionForm.choices.indexOf(item);
      if (index >= 0) {
        this.$delete(this.questionForm.choices, index);
      }
    },
    addChoice() {
      this.questionForm.choices.push({
        key: this.questionForm.choices.length,
        value: ''
      });
    }
  }
}
</script>

<style scoped>
.root {
  display: flex;
}

.questionForm {
  width: 100%;
  min-width: 350px;
  max-width: 960px;
}

.choiceInput {
  float: left;
  width: calc(100% - 100px);
}

.deleteBT {
  float: right;
}
</style>
