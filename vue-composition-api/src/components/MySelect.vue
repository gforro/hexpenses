<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <div class="control">
      <div class="select is-fullwidth">
        <select @change="$emit('change', $event.target.value)" :value="value">
          <option
            v-for="option in options"
            :value="option.value"
            :key="option.value"
            >{{ option.text }}</option
          >
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MySelect',
  props: ['label', 'value', 'options'],
  model: {
    prop: 'value',
    event: 'change'
  }
}
</script>

<style scoped></style>
