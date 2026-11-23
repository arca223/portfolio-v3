<script setup lang="ts">
import { computed } from 'vue'
import type { SkillLevel } from '@/types/content'
import SkillLevelBar from './SkillLevelBar.vue'
import { MAX_SKILL_LEVEL, SKILL_LEVELS, skillLevelText } from './skillLevels'

interface Props {
  level: SkillLevel
  /** Id of the visible element naming the meter (usually the skill name). */
  labelledby: string
}

const props = defineProps<Props>()

const levelLabel = computed(() => SKILL_LEVELS[props.level].label)
const valueText = computed(() => skillLevelText(props.level))
</script>

<template>
  <!-- Children of role=meter are presentational: the value is exposed via aria-valuetext. -->
  <div
    role="meter"
    :aria-labelledby="labelledby"
    aria-valuemin="1"
    :aria-valuemax="MAX_SKILL_LEVEL"
    :aria-valuenow="level"
    :aria-valuetext="valueText"
    class="flex shrink-0 items-center gap-2.5"
  >
    <SkillLevelBar :level="level" />
    <span
      aria-hidden="true"
      class="w-[4.5rem] text-xs font-medium text-fg-muted"
    >
      {{ levelLabel }}
    </span>
  </div>
</template>
