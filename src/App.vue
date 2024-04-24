<script setup>
</script>

<template>
  <h1>Card Shuffler</h1>
  <p>
    Create a random stack of cards, shuffle it and draw from the deck. 
    Simple ✌️ 
  </p>
  <main class="card-deck">
    <Card is="section">Test the <i class="fa fa-book" /> test</Card>
    <Menu class="vertical-menu"/>
  </main>
</template>

<style scoped>
h1, p {
  text-align: center;
  margin: 1em auto;
}
.card-deck {
  display: flex;
  justify-content: center;
  gap: .5em;
}
.vertical-menu {
  margin-top: 1em;
  flex-direction: column;
  margin-right: -2.5em;
  width: 2em;
}
</style>
