<script setup lang="ts">
import PageHeader from '@/components/ui/PageHeader.vue'
import ExperienceItem from '@/components/experiences/ExperienceItem.vue'
import { yearsOfExperience } from '@/utils/date'
import { experiences, experiencesIntro } from '@/data/experiences'

// Static data: plain constants, no reactivity needed. One shared "now" keeps every duration consistent.
const now = new Date()

const years = yearsOfExperience(experiences, now)
const missionCount = experiences.reduce((sum, experience) => sum + experience.missions.length, 0)

const intro = experiencesIntro(years, missionCount)
</script>

<template>
  <div class="pb-16 sm:pb-20">
    <PageHeader v-bind="intro" />

    <!-- Each <li> draws its own line segment down to the next dot (none after the last one). -->
    <ol aria-label="Career timeline" class="space-y-10 md:space-y-12">
      <ExperienceItem
        v-for="(experience, i) in experiences"
        :key="experience.id"
        v-reveal="i < 3 ? i * 80 : 0"
        :experience="experience"
        :now="now"
      />
    </ol>
  </div>
</template>
