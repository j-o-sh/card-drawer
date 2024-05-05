<script setup>
const props = defineProps({
  /** @type {[name:string, options:{ icon: string }]} */
  'states': { type: Array, default: [] }
})
const model = defineModel({ type: String })

function update(e) {
  model.value = e.target.value
}
</script>

<template>
  <form>
    <label v-for="[name, {icon}] in props.states">
      <i class="fa" :class="icon"></i>
      <input type="radio"
             name="model" 
             :value="name"
             :checked="model === name" 
             @change="update"
      >
    </label>
  </form>
</template>

<style scoped>
input,
label:not(
  label:has(input:checked) + label,
  form:has(label:last-child > input:checked) > label:first-child
) { 
  position: fixed;
  margin-top: -100vh;
  color: transparent;
}
</style>
