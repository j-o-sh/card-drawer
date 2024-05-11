<script setup>

/** @type {{value: Array[string]}} */
const model = defineModel()
const emit = defineEmits('submit')

function onchange({ target }) {
  if (!target.value || target.value.trim() === '') {
    //TODO there is something weired here with the focs ordering... It skips, 
    //     since we delete the input.
    model.value.splice(Number(target.name), 1)
  } else {
    model.value[Number(target.name)] = target.value
  }
}

function addOnChange({ target }) {
  model.value.push(target.value)
  target.value = ""
  setTimeout(() => target.scrollIntoView({
    block: 'start',
    behaviour: 'smooth'
  }))
}

function reset() {
  model.value = []
}

function intoView(e) {
  e.target.scrollIntoView({
    block: 'center',
    behaviour: 'smooth'
  })
}
</script>

<template>
  <Card class="form-card">
    <form class="scribble" @submit.prevent="" @reset="reset">
    <slot />
    <label v-for="name, i in model">
      <input :name="i" :value="name" @change="onchange" @focus="intoView">
    </label>
    <label><input 
        name="new" 
        value=""
        placeholder="Add a name here"
        @change="addOnChange"
        @focus="intoView"
      ></label>

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
  </form>
  </Card>
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
  transition: all 125ms;

  & input {
    position: fixed;
    margin-top: -200vh;
  }

  &:not(:has([disabled])):hover {
    transform: scale(1.15);
    text-shadow: 0 0 2px var(--ctp-overlay0);
  }
}

label:has(input[type=submit]) {
  font-size: 1.25rem;
}

label:has(input[disabled]) {
  color: var(--ctp-overlay0);
}

label:has(.fa):focus-within {
  color: var(--ctp-text);
  text-shadow: 0 0 3px var(--ctp-crust);
}

form {
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}

.form-card {
  padding: 1rem;
  --card-color: var(--ctp-lavender);
  background-color: var(--card-color);
  font-size: 1rem;
}

.controls {
  display: flex;
  gap: .5rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  background: var(--card-color);

  position: sticky;
  bottom: 0;
}

</style>
