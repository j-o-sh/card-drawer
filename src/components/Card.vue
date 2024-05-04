<script setup>
const props = defineProps({
  backside: { type: Boolean }
})
</script>

<template>
  <component :is="$attrs.is || 'div'" class="card">
    <div class="backside" v-if="props.backside"></div>
    <slot v-else />
  </component>
</template>

<style scoped>
.card {
  border: 2px solid var(--ctp-base);
  transform: rotate(var(--skew-angle));
  --card-height: min(410px, 65vh);
  box-sizing: border-box;
  height: var(--card-height);

  display: inline-flex;
  align-items: center;
  justify-content: center;

  background-color: var(--ctp-sapphire);
  color: var(--ctp-base);
  aspect-ratio: .5;

  border-radius: calc(var(--card-height) / 13);
  padding: 1em;
}

.card:has(> .backside) {
  align-items: stretch;
  justify-content: stretch;
  padding: calc(var(--card-height) / 80);
}

.backside {
  box-sizing: border-box;
  /* border: 1px solid black; */
  flex: 1;
  border-radius: calc(var(--card-height) / 15);
  background: rgba(0, 0, 0, .2);
}
</style>
