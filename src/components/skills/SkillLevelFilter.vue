<script setup lang="ts">
import { useId } from 'vue'
import type { SkillLevel } from '@/types/content'
import { SKILL_LEVELS } from './skillLevels'

/**
 * Minimum level filter: native radio group (arrow-key navigation and
 * radiogroup semantics for free), visually styled as pills.
 */
const model = defineModel<SkillLevel>({ required: true })

const name = `skill-level-${useId()}`

interface Option {
  value: SkillLevel
  label: string
}

const options: readonly Option[] = [
  { value: 1, label: 'All' },
  { value: 3, label: `${SKILL_LEVELS[3].label}+` },
  { value: 4, label: `${SKILL_LEVELS[4].label}+` },
  { value: 5, label: SKILL_LEVELS[5].label },
]
</script>

<template>
  <fieldset class="min-w-0">
    <legend class="mb-2 block py-[5px] sm:float-left sm:mb-0 sm:mr-3 text-sm font-medium text-fg-muted">
      Minimum level
    </legend>
    <div class="flex flex-wrap gap-2">
      <label v-for="option in options" :key="option.value" class="relative">
        <input
          v-model="model"
          type="radio"
          :name="name"
          :value="option.value"
          class="peer sr-only"
        />
        <span
          :class="[
            'block cursor-pointer rounded-full border px-3 py-1 text-sm font-medium transition-colors duration-150',
            'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent',
            model === option.value
              ? 'border-accent bg-accent text-on-accent'
              : 'border-line bg-surface text-fg-muted hover:border-accent/50 hover:text-fg',
          ]"
        >
          {{ option.label }}
        </span>
      </label>
    </div>
  </fieldset>
</template>
