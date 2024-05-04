<script setup>
import { onMounted, reactive } from 'vue';

let names = []

const x = reactive({
  deck: [],
  skew: [],
  drawn: [],
  mode: 'play',

  reshuffle() {
    this.drawn = []
    this.deck = names.toSorted(() => Math.random() - .5)
    this.skew = [...this.deck].map(() => Math.random() * 10 - 5)
    this.draw()
  },

  draw() {
    const next = this.deck.pop()
    if (next) {
      this.drawn.push(next)
    } else {
      this.drawn = []
    }
  },

  skewAt(index) {
    return this.skew[index] || 0
  }
})

onMounted(() => {
  names = location.search
    .substring(1)
    .split('&')
})
</script>

<template>
  <h1>Card Shuffler</h1>
  <p>
    Create a random stack of cards, shuffle it and draw from the deck. 
    Simple ✌️ 
  </p>
  <main class="card-deck">
    <Card 
      v-if="x.drawn.length"
      v-for="card, i in x.drawn"
      is="section" 
      @click="() => x.draw()" 
      :style="`--skew-angle: ${x.skewAt(i)}deg;`"
    >{{ card }}</Card>
    <Card v-else backside @click="() => x.reshuffle()"/>
  </main>
  <aside>
    <Toggle 
      v-model="x.mode" 
      :states="[ 
        ['play', { icon: 'fa-dice' }], 
        ['foo', { icon: 'fa-book' }], 
        ['foobar', { icon: 'fa-house' }], 
        ['edit', { icon: 'fa-pencil' }] 
      ]"
    />
  </aside>
</template>

<style scoped>
h1, p {
  text-align: center;
  margin: 1em auto;
}
.card-deck {
  display: flex;
  position: relative;
  justify-content: center;
  gap: .5em;
  padding: 2em;

  & > * {
    font-size: 2.5em;
    position: absolute;
    border: 2px solid var(--ctp-base);

    transform: rotate(var(--skew-angle));
  }
}
.vertical-menu {
  margin-top: 1em;
  flex-direction: column;
  margin-right: -2.5em;
  width: 2em;
}
</style>
