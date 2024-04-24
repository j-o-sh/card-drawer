<script setup>
</script>

<template>
  <nav>
    <a href="#new" aria-current>
      <i class="fa fa-wand-magic-sparkles"/>
      <span>start from scratch</span>
    </a>
    <a href="#edit">
      <i class="fa fa-pen-to-square"/>
      <span>Edit the deck</span>
    </a>
    <a href="#shuffle">
      <i class="fa fa-dice"/>
      <span>Reshuffle</span>
    </a>
    <a href="#draw">
      <i class="fa fa-forward"/>
      <span>Draw cards</span>
    </a>
  </nav>
</template>

<style scoped>
a > :not(:first-child) {
  position:fixed;
  top: 100%;
}

nav {
  display: flex;
  gap: .5em;
}

a[aria-current] {
  color: var(--ctp-green);
  pointer-events: none;
}
</style>
