<script setup lang="ts">
import BaseSection from '@/components/ui/BaseSection.vue'
import TagList from '@/components/ui/TagList.vue'
import { profile } from '@/data/profile'
</script>

<template>
  <BaseSection id="intro" title="Introduction">
    <div class="max-w-2xl space-y-4 text-lg leading-relaxed text-pretty text-fg-muted">
      <p v-for="(paragraph, index) in profile.intro" :key="index">{{ paragraph }}</p>
    </div>

    <div v-reveal="80" class="mt-8">
      <h3 id="key-skills-title" class="mb-3 text-sm font-semibold tracking-wide text-fg uppercase">Key skills</h3>
      <!-- No `label`: the visible h3 names the list (attr falls through to TagList's <ul>). -->
      <TagList :tags="profile.keySkills" aria-labelledby="key-skills-title" />
      <RouterLink
        to="/skills"
        class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline"
      >
        See all skills<span aria-hidden="true">→</span>
      </RouterLink>
    </div>
  </BaseSection>
</template>
