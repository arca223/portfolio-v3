<script setup lang="ts">
import BaseSection from '@/components/ui/BaseSection.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import TagList from '@/components/ui/TagList.vue'
import { featuredProject } from '@/data/featured'
</script>

<template>
  <BaseSection id="featured-project" :title="featuredProject.sectionTitle">
    <div v-reveal>
      <BaseCard as="article" aria-labelledby="featured-project-name">
        <p class="text-xs font-semibold tracking-wide text-accent uppercase">{{ featuredProject.eyebrow }}</p>
        <h3 id="featured-project-name" class="mt-1 text-xl font-semibold text-balance text-fg sm:text-2xl">
          {{ featuredProject.title }}
        </h3>

        <div class="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div class="space-y-6">
            <div>
              <h4 class="text-sm font-semibold tracking-wide text-fg uppercase">The challenge</h4>
              <p class="mt-2 text-pretty text-fg-muted">{{ featuredProject.problem }}</p>
            </div>
            <div>
              <h4 class="text-sm font-semibold tracking-wide text-fg uppercase">Result</h4>
              <p class="mt-2 text-pretty text-fg-muted">{{ featuredProject.result }}</p>
            </div>
          </div>

          <div>
            <h4 class="text-sm font-semibold tracking-wide text-fg uppercase">Approach</h4>
            <ul class="mt-2 list-disc space-y-2 pl-5 text-pretty text-fg-muted marker:text-accent">
              <li v-for="(step, index) in featuredProject.approach" :key="index">{{ step }}</li>
            </ul>
          </div>
        </div>

        <div class="mt-6 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <TagList :tags="featuredProject.stack" label="Tech stack" />
          <RouterLink
            to="/experiences"
            class="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            See all experiences<span aria-hidden="true">→</span>
          </RouterLink>
        </div>
      </BaseCard>
    </div>
  </BaseSection>
</template>
