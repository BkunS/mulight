<template>
  <div class="root">
    {{ title }}
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
  }
}
</script>

<style scoped>
.root {
  display: flex;
  width: 100%;
}
</style>
