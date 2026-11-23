<script setup lang="ts">
import { computed } from 'vue'
import type { Experience } from '@/types/content'
import { yearsOfExperience } from '@/utils/date'

const props = defineProps<{
  experiences: Experience[]
  /** Page's shared reference date. */
  now?: Date
}>()

interface Stat {
  label: string
  value: string
}

const stats = computed<Stat[]>(() => {
  const jobs = props.experiences.filter((exp) => exp.employmentType !== 'Career break')
  const years = yearsOfExperience(props.experiences, props.now)
  const companies = new Set(jobs.map((exp) => exp.company.toLowerCase())).size
  const missions = jobs.reduce((total, exp) => total + exp.missions.length, 0)

  const list: Stat[] = []
  if (years > 0) list.push({ value: `${years}+`, label: 'Years of experience' })
  if (companies) list.push({ value: String(companies), label: companies === 1 ? 'Company' : 'Companies' })
  if (missions) list.push({ value: String(missions), label: missions === 1 ? 'Client mission' : 'Client missions' })
  return list
})
</script>

<template>
  <dl v-if="stats.length" class="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
    <div
      v-for="(stat, index) in stats"
      :key="stat.label"
      v-reveal="index * 80"
      class="flex flex-col-reverse rounded-xl border border-line bg-surface p-4 sm:p-5"
    >
      <dt class="mt-1 text-sm text-fg-muted">{{ stat.label }}</dt>
      <dd class="text-3xl font-bold tracking-tight text-fg tabular-nums">{{ stat.value }}</dd>
    </div>
  </dl>
</template>
