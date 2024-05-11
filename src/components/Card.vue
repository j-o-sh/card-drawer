<script setup>
import { computed } from 'vue';

const props = defineProps({
  backside: { type: Boolean },
  cornerStart: { type: String },
  cornerEnd: { type: String },
})
const emit = defineEmits('cornerStart', 'cornerEnd')

const hasCorners = computed(() => [props.cornerStart, props.cornerEnd]
  .find(x => x?.trim().length)
)
</script>

<template>
  <component :is="$attrs.is || 'div'" class="card">
    <div class="backside" v-if="props.backside">
      <nav class="corner-nav" v-if="hasCorners">
        <button :disabled="!props.cornerStart" @click="() => emit('cornerStart')">
          <i class="fa" :class="`fa-${props.cornerStart}`"></i>
        </button>
        <button :disabled="!props.cornerEnd" @click="() => emit('cornerEnd')">
          <i class="fa" :class="`fa-${props.cornerEnd}`"></i>
        </button>
      </nav>
      <slot />
      <nav class="corner-nav" v-if="hasCorners">
        <button :disabled="!props.cornerStart" @click="() => emit('cornerStart')">
          <i class="fa" :class="`fa-${props.cornerStart}`"></i>
        </button>
        <button :disabled="!props.cornerEnd" @click="() => emit('cornerEnd')">
          <i class="fa" :class="`fa-${props.cornerEnd}`"></i>
        </button>
      </nav>
    </div>
    <template v-else >
      <slot />
      <nav class="corner-nav" v-if="hasCorners">
        <button :disabled="!props.cornerStart" @click="() => emit('cornerStart')">
          <i class="fa" :class="`fa-${props.cornerStart}`"></i>
        </button>
        <button :disabled="!props.cornerEnd" @click="() => emit('cornerEnd')">
          <i class="fa" :class="`fa-${props.cornerEnd}`"></i>
        </button>
      </nav>
    </template>

  </component>
</template>

<style scoped>
.card {
  --card-height: clamp(410px, 80vh, 666px);

  font-size: 2rem;

  border: 2px solid var(--ctp-base);
  transform: rotate(var(--skew-angle));
  box-sizing: border-box;
  height: var(--card-height);

  display: inline-flex;
  overflow: hidden;
  flex-direction: column;
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

  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  overflow: hidden;
}

:where(.card, .backside) > *:has(+.corner-nav) {
  flex: 1;
  display: inline-flex;
  align-items: center;
}

.corner-nav {
  justify-self: end;
  align-self: stretch;
  display: inline-flex;
  justify-content: space-between;

  &:first-child {
    margin-bottom: -2rem;
    transform: rotate(180deg);
  }
  &:last-child {
    margin-top: -2rem;
  }
  & > :first-child {
    border-top-right-radius: 1rem;
  }
  & > :last-child {
    border-top-left-radius: 1rem;
  }

  & > * {
    background: var(--ctp-surface0);
    color: var(--ctp-text);
    padding: calc(var(--card-height) / 45);
    font-size: .8rem;
    border: none;

    &:disabled {
      color: transparent;
      background: none;
      pointer-events: none;
    }
  }

}
</style>
