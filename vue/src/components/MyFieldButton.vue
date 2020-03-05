<template>
  <div class="field">
    <div class="control">
      <button class="button is-primary" v-bind="$attrs">{{ text }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyFieldButton',
  props: {
    text: {
      type: String,
      default: 'Button'
    }
  }
}
</script>

<style scoped></style>
