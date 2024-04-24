<script setup></script>

<template>
  <component :is="$attrs.is || 'div'" class="card"><slot /></component>
</template>

<style scoped>
.card {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background-color: var(--ctp-sapphire);
  color: var(--ctp-base);
  aspect-ratio: .5;

  border-radius: 1em;
  padding: 1em;
}
</style>
