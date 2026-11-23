<script setup lang="ts">
import type { SkillLevel } from '@/types/content'
import { SKILL_LEVEL_VALUES } from './skillLevels'

/** Purely visual 5-segment bar. Always aria-hidden: callers provide the text. */
interface Props {
  level: SkillLevel
  size?: 'sm' | 'md'
}

withDefaults(defineProps<Props>(), { size: 'md' })
</script>

<template>
  <span class="flex items-center gap-1" aria-hidden="true">
    <span
      v-for="step in SKILL_LEVEL_VALUES"
      :key="step"
      :class="[
        'rounded-full',
        size === 'sm' ? 'h-1.5 w-2.5' : 'h-1.5 w-4',
        step <= level ? 'bg-accent' : 'bg-track',
      ]"
    />
  </span>
</template>
