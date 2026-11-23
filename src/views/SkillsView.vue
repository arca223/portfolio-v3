<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SkillCategory, SkillLevel } from '@/types/content'
import { skillCategories, skillsIntro } from '@/data/skills'
import PageHeader from '@/components/ui/PageHeader.vue'
import SkillCategoryCard from '@/components/skills/SkillCategoryCard.vue'
import SkillLevelFilter from '@/components/skills/SkillLevelFilter.vue'
import SkillLevelLegend from '@/components/skills/SkillLevelLegend.vue'
import { SKILL_LEVELS } from '@/components/skills/skillLevels'

const minLevel = ref<SkillLevel>(1)

/** Spoken languages are not on the 1–5 skill scale: they are only listed when the filter is 'All'. */
const isLanguage = (category: SkillCategory) => category.scale === 'language'

const countSkills = (categories: SkillCategory[]) =>
  categories.reduce((sum, category) => sum + category.skills.length, 0)

const totalSkills = countSkills(skillCategories.filter((c) => !isLanguage(c)))
const totalLanguages = countSkills(skillCategories.filter(isLanguage))

const plural = (count: number, one: string, many: string) =>
  `${count} ${count === 1 ? one : many}`

/** Data order is kept (it is curated); categories left empty by the filter are hidden. */
const visibleCategories = computed(() =>
  skillCategories
    .map((category) => ({
      category,
      skills: isLanguage(category)
        ? minLevel.value === 1
          ? category.skills
          : []
        : category.skills.filter((skill) => skill.level >= minLevel.value),
    }))
    .filter(({ skills }) => skills.length > 0),
)

const visibleSkillCount = computed(() =>
  visibleCategories.value
    .filter(({ category }) => !isLanguage(category))
    .reduce((sum, { skills }) => sum + skills.length, 0),
)

const statusText = computed(() => {
  if (minLevel.value === 1) {
    const languages =
      totalLanguages > 0
        ? ` and ${plural(totalLanguages, 'spoken language', 'spoken languages')}`
        : ''
    return `Showing all ${plural(totalSkills, 'skill', 'skills')}${languages}`
  }
  const level =
    minLevel.value === 5
      ? `${SKILL_LEVELS[5].label} level`
      : `${SKILL_LEVELS[minLevel.value].label} level or above`
  const shown = visibleSkillCount.value
  return `Showing ${shown} of ${plural(totalSkills, 'skill', 'skills')}, ${level}`
})
</script>

<template>
  <div class="pb-16">
    <PageHeader eyebrow="Expertise" title="Skills" :description="skillsIntro" />

    <SkillLevelLegend />

    <div
      class="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
    >
      <SkillLevelFilter v-model="minLevel" />
      <p role="status" class="text-sm text-fg-muted">{{ statusText }}</p>
    </div>

    <ul class="mt-6 grid items-start gap-5 lg:grid-cols-2">
      <li
        v-for="({ category, skills }, i) in visibleCategories"
        :key="category.id"
        v-reveal="Math.min(i, 5) * 60"
      >
        <SkillCategoryCard :category="category" :skills="skills" />
      </li>
    </ul>
  </div>
</template>
