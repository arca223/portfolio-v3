<script setup lang="ts">
import { computed } from 'vue'
import type { Skill, SkillCategory } from '@/types/content'
import BaseCard from '@/components/ui/BaseCard.vue'
import SkillLevelMeter from './SkillLevelMeter.vue'

interface Props {
  category: SkillCategory
  /** Skills to display (already filtered/sorted by the parent). */
  skills: Skill[]
}

const props = defineProps<Props>()

/** Spoken languages use their own vocabulary (the note), not the 1–5 skill meter. */
const isLanguage = computed(() => props.category.scale === 'language')

const titleId = computed(() => `skills-${props.category.id}-title`)

/** Unique per page: category ids are unique and the index is stable within a category. */
function nameId(index: number): string {
  return `skills-${props.category.id}-${index}-name`
}
</script>

<template>
  <BaseCard as="article" :aria-labelledby="titleId">
    <h2 :id="titleId" class="text-lg font-semibold tracking-tight text-fg">
      {{ category.title }}
    </h2>
    <p v-if="category.description" class="mt-1 text-sm text-fg-muted">
      {{ category.description }}
    </p>
    <ul class="mt-4 divide-y divide-line">
      <li
        v-for="(skill, index) in skills"
        :key="skill.name"
        class="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 py-2.5 first:pt-0 last:pb-0"
      >
        <template v-if="isLanguage">
          <span class="min-w-0 font-medium text-fg">{{ skill.name }}</span>
          <span class="text-sm font-medium text-fg-muted">
            <span class="sr-only">:</span>
            {{ skill.note ?? '' }}
          </span>
        </template>
        <template v-else>
          <span class="min-w-0 flex-1 basis-36">
            <span :id="nameId(index)" class="block font-medium text-fg">{{
              skill.name
            }}</span>
            <span v-if="skill.note" class="block text-sm text-fg-muted">{{
              skill.note
            }}</span>
          </span>
          <SkillLevelMeter :level="skill.level" :labelledby="nameId(index)" />
        </template>
      </li>
    </ul>
  </BaseCard>
</template>
