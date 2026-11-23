<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  src?: string
  size?: 'sm' | 'md'
  /**
   * The company name is already rendered next to the logo: hide the logo from
   * assistive tech (alt="" + aria-hidden) to avoid "Abbeal logo Abbeal".
   */
  decorative?: boolean
}

const props = withDefaults(defineProps<Props>(), { size: 'md', decorative: false })

const SIZES = {
  sm: { box: 'size-8 text-xs', px: 32 },
  md: { box: 'size-12 text-sm', px: 48 },
} as const

const dims = computed(() => SIZES[props.size])
const alt = computed(() => (props.decorative ? '' : `${props.name} logo`))
const initials = computed(() =>
  props.name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join(''),
)
/** Monogram semantics: an image with a name, or nothing at all when decorative. */
const monogramAttrs = computed(() =>
  props.decorative
    ? { 'aria-hidden': 'true' as const }
    : { role: 'img', 'aria-label': alt.value },
)
</script>

<template>
  <img
    v-if="src"
    :src="src"
    :alt="alt"
    :aria-hidden="decorative ? 'true' : undefined"
    :width="dims.px"
    :height="dims.px"
    loading="lazy"
    decoding="async"
    :class="[dims.box, 'shrink-0 rounded-lg border border-line bg-white object-contain p-1']"
  />
  <span
    v-else
    v-bind="monogramAttrs"
    :class="[
      dims.box,
      'inline-flex shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent-soft font-bold text-accent',
    ]"
  >
    <span aria-hidden="true">{{ initials }}</span>
  </span>
</template>
