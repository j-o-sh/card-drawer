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
  <main>
    <div class="card-deck">
      <Card 
        v-if="x.drawn.length"
        v-for="card, i in x.drawn"
        is="section" 
        @click="() => x.draw()" 
        :style="`--skew-angle: ${x.skewAt(i)}deg;`"
      >{{ card }}</Card>
      <Card v-else backside @click="() => x.reshuffle()"/>
    </div>
    <Toggle 
      class="toggle"
      v-model="x.mode" 
      :states="[ 
        ['play', { icon: 'fa-dice' }], 
        ['edit', { icon: 'fa-pencil' }] 
      ]"
    />
  </main>
</template>

<style scoped>
h1, p {
  text-align: center;
  margin: 1rem auto;
}
.card-deck, main {
  display: flex;
  position: relative;
  justify-content: center;
  gap: .5em;
}
.toggle {
  width: 1em;
  margin-right: -1.5em;
  align-self: end;
}
</style>
