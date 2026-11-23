<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import CompanyLogo from '@/components/ui/CompanyLogo.vue'
import PeriodRange from '@/components/ui/PeriodRange.vue'
import type { Experience } from '@/types/content'

const props = defineProps<{
  experience: Experience
  /** Page's shared reference date. */
  now?: Date
}>()

const meta = computed(() =>
  [props.experience.employmentType, props.experience.workMode].filter(
    (value): value is NonNullable<typeof value> => Boolean(value),
  ),
)
</script>

<template>
  <BaseCard as="article" interactive class="relative">
    <div class="flex items-start gap-4">
      <CompanyLogo :name="experience.company" :src="experience.logo" decorative />
      <div class="min-w-0 flex-1">
        <p class="text-xs font-semibold tracking-wide text-accent uppercase">Current role</p>
        <h3 class="mt-1 text-lg font-semibold text-fg">
          <!-- Stretched link: the whole card is clickable, one tab stop. -->
          <RouterLink to="/experiences" class="after:absolute after:inset-0 after:rounded-xl">
            {{ experience.title }}
            <span class="text-fg-muted"> · {{ experience.company }}</span>
          </RouterLink>
        </h3>
        <dl class="mt-2 flex flex-col gap-1 text-sm text-fg-muted sm:flex-row sm:flex-wrap sm:gap-x-4">
          <div>
            <dt class="sr-only">Period</dt>
            <dd>
              <PeriodRange :period="experience.period" :now="now" />
            </dd>
          </div>
          <div v-if="experience.location">
            <dt class="sr-only">Location</dt>
            <dd>{{ experience.location }}</dd>
          </div>
          <div v-if="meta.length">
            <dt class="sr-only">Contract</dt>
            <dd>{{ meta.join(' · ') }}</dd>
          </div>
        </dl>
        <p v-if="experience.summary" class="mt-3 text-sm text-pretty text-fg-muted">{{ experience.summary }}</p>
        <p class="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent" aria-hidden="true">
          View all experiences<span>→</span>
        </p>
      </div>
    </div>
  </BaseCard>
</template>
