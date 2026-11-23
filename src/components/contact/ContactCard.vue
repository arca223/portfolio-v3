<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import SocialIcon from '@/components/ui/SocialIcon.vue'
import type { SocialLink } from '@/types/content'

defineProps<{ link: SocialLink }>()
</script>

<template>
  <!-- The whole card is a single link: no nested interactive elements. -->
  <BaseCard
    as="a"
    interactive
    :href="link.url"
    :target="link.external ? '_blank' : undefined"
    :rel="link.external ? 'noopener noreferrer' : undefined"
    class="group flex h-full items-center gap-4"
  >
    <span
      class="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent"
    >
      <SocialIcon :platform="link.platform" />
    </span>
    <span class="min-w-0">
      <span class="block font-semibold text-fg group-hover:text-accent group-focus-visible:text-accent">{{ link.label }}</span>
      <span class="block text-sm text-fg-muted [overflow-wrap:anywhere]">{{ link.handle }}</span>
      <span v-if="link.external" class="sr-only"> (opens in a new tab)</span>
    </span>
  </BaseCard>
</template>
