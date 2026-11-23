<script setup lang="ts">
interface Props {
  /** Rendered element, e.g. 'article' or 'li'. */
  as?: string
  /** Hover lift + accent border (use when the card is or contains a link). */
  interactive?: boolean
  /** Default inner padding; set false to control it yourself. */
  padded?: boolean
}

withDefaults(defineProps<Props>(), { as: 'div', interactive: false, padded: true })
</script>

<template>
  <component
    :is="as"
    :class="[
      'rounded-xl border border-line bg-surface',
      padded && 'p-5 sm:p-6',
      interactive &&
        'transition duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg hover:shadow-zinc-900/5 focus-within:border-accent/50 dark:hover:shadow-black/20',
    ]"
  >
    <slot />
  </component>
</template>
