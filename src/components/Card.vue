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
    <div class="cardface" :class="{ backside: props.backside }">
      <nav class="corner-nav" v-if="hasCorners">
        <button :disabled="!props.cornerStart" @click.stop="() => emit('cornerStart')">
          <i class="fa" :class="`fa-${props.cornerStart}`"></i>
        </button>
        <button :disabled="!props.cornerEnd" @click.stop="() => emit('cornerEnd')">
          <i class="fa" :class="`fa-${props.cornerEnd}`"></i>
        </button>
      </nav>
      <slot />
      <nav class="corner-nav" v-if="hasCorners">
        <button :disabled="!props.cornerStart" @click.stop="() => emit('cornerStart')">
          <i class="fa" :class="`fa-${props.cornerStart}`"></i>
        </button>
        <button :disabled="!props.cornerEnd" @click.stop="() => emit('cornerEnd')">
          <i class="fa" :class="`fa-${props.cornerEnd}`"></i>
        </button>
      </nav>
    </div>
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

.card:has(> .cardface) {
  align-items: stretch;
  justify-content: stretch;
  padding: calc(var(--card-height) / 180);
}
.card:has(> .backside) {
  padding: calc(var(--card-height) / 80);
}

.cardface {
  box-sizing: border-box;
  /* border: 1px solid black; */
  flex: 1;
  border-radius: calc(var(--card-height) / 15);

  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  overflow: hidden;
}

.backside {
  background: rgba(0, 0, 0, .2);
}

.cardface:has(> .corner-nav) {
  justify-content: space-between;
}

.cardface > *:not(.corner-nav) {
  flex: 1;
  display: inline-flex;
  align-items: center;
}

.corner-nav {
  justify-self: end;
  align-self: stretch;
  display: inline-flex;
  justify-content: space-between;
  flex: 0;

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
    background: none;
    color: var(--ctp-subtext2);
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

.backside .corner-nav > * {
    background: var(--ctp-surface0);
    color: var(--ctp-text);
}
</style>
