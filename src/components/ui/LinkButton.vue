<script setup lang="ts">
import { computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { buttonClasses, type ButtonSize, type ButtonVariant } from './buttonClasses'

interface Props {
  /** Internal route (renders a RouterLink). */
  to?: RouteLocationRaw
  /** Plain URL, mailto:, file… (renders an <a>). Ignored when `to` is set. */
  href?: string
  variant?: ButtonVariant
  /** 'md' (default) or 'lg' (px-6 py-3 text-base, for hero CTAs). */
  size?: ButtonSize
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  external: false,
})

const classes = computed(() => buttonClasses(props.variant, props.size))

/** Without a destination an <a> would be unfocusable and misleading: render a <span>. */
const hasHref = computed(() => props.href !== undefined && props.href !== '')

if (import.meta.env.DEV && props.to === undefined && !hasHref.value) {
  console.warn('[LinkButton] neither `to` nor `href` was provided; rendering a non-interactive <span>.')
}

const externalAttrs = computed(() =>
  props.external ? { target: '_blank', rel: 'noopener noreferrer' } : {},
)
</script>

<template>
  <RouterLink v-if="to !== undefined" :to="to" :class="classes">
    <slot />
  </RouterLink>
  <a v-else-if="hasHref" :href="href" :class="classes" v-bind="externalAttrs">
    <slot />
    <span v-if="external" class="sr-only"> (opens in a new tab)</span>
  </a>
  <span v-else :class="classes">
    <slot />
  </span>
</template>
