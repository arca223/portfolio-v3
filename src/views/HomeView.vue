<script setup lang="ts">
import BaseSection from '@/components/ui/BaseSection.vue'
import HomeHero from '@/components/home/HomeHero.vue'
import HomeIntro from '@/components/home/HomeIntro.vue'
import HomeStats from '@/components/home/HomeStats.vue'
import CurrentRoleCard from '@/components/home/CurrentRoleCard.vue'
import FeaturedProject from '@/components/home/FeaturedProject.vue'
import { experiences } from '@/data/experiences'

/** One shared reference date so every number on the page agrees. */
const now = new Date()

/** Ongoing job (a career break is never the "current role"); undefined hides the pill and card. */
const currentExperience = experiences.find(
  (exp) => exp.period.end === null && exp.employmentType !== 'Career break',
)
</script>

<template>
  <div>
    <HomeHero :current-experience="currentExperience" />
    <HomeIntro />
    <FeaturedProject />
    <BaseSection id="at-a-glance" title="At a glance">
      <div class="space-y-4">
        <HomeStats :experiences="experiences" :now="now" />
        <div v-if="currentExperience" v-reveal="80">
          <CurrentRoleCard :experience="currentExperience" :now="now" />
        </div>
      </div>
    </BaseSection>
  </div>
</template>
