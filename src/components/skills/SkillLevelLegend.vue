<script setup lang="ts">
import SkillLevelBar from './SkillLevelBar.vue'
import { SKILL_LEVELS, SKILL_LEVEL_VALUES } from './skillLevels'
</script>

<template>
  <section
    aria-labelledby="skill-legend-title"
    class="rounded-xl border border-line bg-subtle/60 p-4 sm:p-5"
  >
    <h2 id="skill-legend-title" class="text-sm font-semibold text-fg">
      How to read the levels
    </h2>
    <ol class="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-5">
      <li
        v-for="level in SKILL_LEVEL_VALUES"
        :key="level"
        class="flex flex-col gap-1.5"
      >
        <span class="flex items-center gap-2">
          <SkillLevelBar :level="level" size="sm" />
          <span class="text-sm font-medium text-fg">
            <span class="sr-only">Level {{ level }}:</span>
            {{ SKILL_LEVELS[level].label }}
          </span>
        </span>
        <span class="text-xs text-fg-muted">{{
          SKILL_LEVELS[level].description
        }}</span>
      </li>
    </ol>
  </section>
</template>
