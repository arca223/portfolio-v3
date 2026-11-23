<script setup lang="ts">
import { computed, useId } from 'vue'

interface Props {
  title?: string
  id?: string
  headingLevel?: 2 | 3
}

const props = withDefaults(defineProps<Props>(), { headingLevel: 2 })

const generatedId = useId()
const headingId = computed(() => (props.id ? `${props.id}-title` : `section-${generatedId}`))
</script>

<template>
  <section :id="id" :aria-labelledby="title ? headingId : undefined" class="py-10 sm:py-12">
    <component
      :is="`h${headingLevel}`"
      v-if="title"
      :id="headingId"
      :class="[
        'mb-6 font-semibold tracking-tight text-fg',
        headingLevel === 2 ? 'text-2xl' : 'text-xl',
      ]"
    >
      {{ title }}
    </component>
    <slot />
  </section>
</template>
