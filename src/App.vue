<script setup>
import { computed, onMounted, reactive, watch } from 'vue';

const x = reactive({
  names: [],
  deck: [],
  skew: [],
  drawn: [],
  mode: 'play',

  play() {
    this.drawn = []
    this.mode = 'play'
  },

  reshuffle() {
    this.drawn = []
    this.deck = this.names.toSorted(() => Math.random() - .5)
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
  x.names = location.search
    .substring(1)
    .split('&')
    .filter(n => n.trim() !== '')
    .map(decodeURIComponent)
  if (!x.names.length) x.mode = 'edit'
})

watch(x, ({ names }) => { 
  const nextsearch = '?' + names.join('&')
  if (location.search !== nextsearch) {
    history.replaceState({}, undefined, nextsearch)
  }
})
</script>

<template>
  <h1>Card Shuffler</h1>
  <main>
    <div class="card-deck" v-if="x.mode === 'play'">
      <Card 
        v-if="x.drawn?.length"
        v-for="card, i in x.drawn"
        is="section" 
        corner-start="dice" 
        corner-end="pencil" 
        @cornerStart="() => x.play()"
        @cornerEnd="() => x.mode = 'edit'"
        @click="() => x.draw()" 
        :style="`--skew-angle: ${x.skewAt(i)}deg;`"
      ><span class="card-in-play">{{ card }}</span></Card>
      <Card 
        v-else 
        backside 
        corner-end="pencil" 
        @cornerEnd="() => x.mode = 'edit'"
        @click="() => x.reshuffle()"
      >
        <p class="explainer">Draw a card
        <i class="fa fa-dice single-card-icon"></i>
        </p>
      </Card>
    </div>

    <Editor 
      v-model="x.names"
      class="card-deck editor" 
      v-else-if="x.mode === 'edit'"
      @submit="x.play()"
    ><p class="explainer">
    Create a stack of cards, shuffle it and draw from the deck. 
    Simple ✌️ 
  </p></Editor>
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
.card-deck > :not(:first-child) { position: absolute; }

.explainer {
  font-family: Caveat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 2rem;
}

.card-in-play {
  font-size: 1.5rem;
  text-align: center;
  padding: .25rem;
}

.single-card-icon {
  font-size: 2.5rem;
}
</style>
