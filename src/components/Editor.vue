<script setup>
/** @type {{value: Array[string]}} */
const model = defineModel()
function onchange({ target }) {
  if (target.name === 'new') {
    model.value.push(target.value)
    target.value = ""
  } else if (!target.value || target.value.trim() === '') {
    //TODO there is something weired here with the focs ordering... It skips, 
    //     since we delete the input.
    model.value.splice(Number(target.name), 1)
  } else {
    model.value[Number(target.name)] = target.value
  }
}
</script>

<template>
  <Card><form class="scribble">
    <label v-for="name, i in model">
      <input :name="i" :value="name" @change="onchange">
    </label>
    <label><input name="new" value="" @change="onchange"></label>
  </form></Card>
</template>

<style scoped>
input {
  font: inherit;
  font-size: 1.25rem;
  background: none;
  font-family: Caveat;
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--ctp-surface2);

}
</style>
