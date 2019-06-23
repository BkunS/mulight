<template>
  <div v-if="question" class="root">
    <div class="questionRow">{{ question.question }}</div>
    <div class="publishAtRow">{{ question.published_atStr }}</div>
    <div class="choicesLenRow">{{ question.choicesLen }} Choice(s)</div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    question: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
.root {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 220px;
  max-width: 220px;
  padding: 20px;
}

.questionRow {
  margin: 5px 0;
  font-size: 18px;
  font-weight: 200;
  text-align: left;
}

.publishAtRow, .choicesLenRow {
  margin: 5px 0;
  font-size: 14px;
  font-weight: 100;
  text-align: left;
}
</style>
