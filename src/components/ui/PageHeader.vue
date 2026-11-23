<script setup lang="ts">
interface Props {
  title: string
  eyebrow?: string
  description?: string
}

defineProps<Props>()
</script>

<template>
  <header class="pt-12 pb-8 sm:pt-16 sm:pb-10">
    <p v-if="eyebrow" class="mb-3 text-sm font-semibold tracking-wide text-accent uppercase">
      {{ eyebrow }}
    </p>
    <!-- tabindex=-1: the router's scrollBehavior moves focus here after each navigation (utils/scroll focusPageHeading). -->
    <h1 tabindex="-1" class="text-3xl font-bold tracking-tight text-balance text-fg sm:text-4xl">
      {{ title }}
    </h1>
    <p v-if="description" class="mt-4 max-w-2xl text-lg text-pretty text-fg-muted">
      {{ description }}
    </p>
    <slot />
  </header>
</template>
