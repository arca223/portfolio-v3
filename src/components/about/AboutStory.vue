<script setup lang="ts">
import type { AboutSection } from '@/types/content'
import AboutStorySection from './AboutStorySection.vue'

defineProps<{ sections: AboutSection[] }>()
</script>

<template>
  <!-- No v-reveal here: its translate would offset deep links (/about#section) to these sections. -->
  <div class="max-w-[65ch] space-y-12">
    <AboutStorySection v-for="section in sections" :key="section.id" :section="section" />
  </div>
</template>
