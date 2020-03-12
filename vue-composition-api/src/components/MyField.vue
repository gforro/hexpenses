<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control">
      <input
        class="input"
        v-bind="$attrs"
        :value="value"
        @change="$emit('change', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyField',
  props: ['label', 'value'],
  model: {
    prop: 'value',
    event: 'change'
  }
}
</script>

<style scoped></style>
