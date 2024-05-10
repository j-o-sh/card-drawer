<script setup>
/** @type {{value: Array[string]}} */
const model = defineModel()
const emit = defineEmits('submit')

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

function reset() {
  model.value = []
}
</script>

<template>
  <Card><form class="scribble" @submit.prevent="" @reset="reset">
    <label v-for="name, i in model">
      <input :name="i" :value="name" @change="onchange">
    </label>
    <label><input name="new" value="" @change="onchange"></label>

    <!-- HTML you quirky sometimes 🤪 -->
    <input type="submit" style="display:none" disabled>

    <div class="controls">
      <label>
        <i class="fa fa-dice"></i>
        <input type="submit" :disabled="!model?.length">
      </label>
      <label>
        <i class="fa fa-eraser"></i>
        <input type="reset" :disabled="!model?.length">
      </label>
    </div>
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

label:has(input[type=submit], input[type=reset]) {
  font-size: 1rem;
  & input {
    position: fixed;
    margin-top: -200vh;
  }
}

label:has(input[disabled]) {
  color: var(--ctp-overlay0);
}

label:has(.fa):focus-within {
  color: var(--ctp-text);
  text-shadow: 0 0 3px var(--ctp-crust);
}

.controls {
  display: flex;
  gap: .5rem;
  justify-content: center;
  margin-top: 1rem;
}
</style>
