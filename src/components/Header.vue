<template>
  <div class="root">
    <div class="title">{{ title }}</div>
    <el-button v-if="showCreateBT" size="small" type="primary" @click="handleCreateClick">Create</el-button>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: 'Questions',
      required: true,
      validator: function (value) {
        return value && value !== ''
      }
    }
  },
  computed: {
    showCreateBT: function() {
      return this.$route.name === 'QuestionsList'
    }
  },
  methods: {
    handleCreateClick() {
      this.$router.push({ path: 'create' })
    }
  }
}
</script>

<style scoped>
.root {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.title {
  font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 26px;
  font-weight: 100;
}
</style>
