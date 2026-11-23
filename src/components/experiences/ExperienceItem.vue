<script setup lang="ts">
import { computed } from 'vue'
import type { Experience } from '@/types/content'
import BaseCard from '@/components/ui/BaseCard.vue'
import CompanyLogo from '@/components/ui/CompanyLogo.vue'
import TagList from '@/components/ui/TagList.vue'
import MissionList from './MissionList.vue'
import PeriodRange from '@/components/ui/PeriodRange.vue'
import { duration } from '@/utils/date'

interface Props {
  experience: Experience
  now: Date
}

const props = defineProps<Props>()

const isCurrent = computed(() => props.experience.period.end === null)
const isBreak = computed(() => props.experience.employmentType === 'Career break')
const length = computed(() => duration(props.experience.period, props.now))
const headingId = computed(() => `experience-${props.experience.id}`)
const chips = computed(() =>
  [props.experience.employmentType, props.experience.workMode].filter(
    (chip): chip is NonNullable<typeof chip> => chip !== undefined,
  ),
)
</script>

<template>
  <!--
    Timeline segment (::before): from this dot's centre to the next item's dot centre
    (gap + dot centre offset), hidden on the last item so the line never runs past the last dot.
    Mobile: x = 8px, dot centre y = 10px, gap 2.5rem. md+: x = 12rem, dot centre y = 34px, gap 3rem.
  -->
  <li
    class="relative grid gap-3 pl-8 before:absolute before:top-[10px] before:bottom-[calc(-2.5rem-10px)] before:left-[7px] before:w-0.5 before:bg-line last:before:hidden md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-8 md:pl-0 md:before:top-[34px] md:before:bottom-[calc(-3rem-34px)] md:before:left-[calc(12rem-1px)]"
  >
    <!-- Timeline dot, centred on the line segment (mobile: 8px, md+: 12rem). -->
    <span
      aria-hidden="true"
      :class="[
        'absolute top-0.5 left-0 size-4 rounded-full border-2 md:top-[1.625rem] md:left-[calc(12rem-0.5rem)]',
        isCurrent
          ? 'border-accent bg-accent ring-4 ring-accent-soft'
          : 'border-fg-muted/50 bg-canvas',
      ]"
    />

    <!-- Meta column (above the card on mobile, left of the line on md+). -->
    <div class="text-sm text-fg-muted md:pt-6 md:text-right">
      <!-- Mobile: one line with the duration; md+: duration on its own line in the narrow column. -->
      <p class="font-medium md:hidden">
        <PeriodRange :period="experience.period" :now="now" show-duration />
      </p>
      <p class="hidden font-medium md:block">
        <PeriodRange :period="experience.period" :now="now" />
        <span class="sr-only">, </span>
        <span class="block">{{ length }}</span>
      </p>
      <p v-if="experience.location" class="mt-0.5 text-xs text-pretty">
        {{ experience.location }}
      </p>
    </div>

    <BaseCard as="article" :aria-labelledby="headingId" :class="isBreak && 'border-dashed'">
      <header class="flex items-start gap-3 sm:gap-4">
        <!-- Smaller logo below sm so the title keeps room at 320px; name is in the h2, so decorative. -->
        <div class="shrink-0 sm:hidden">
          <CompanyLogo :name="experience.company" :src="experience.logo" size="sm" decorative />
        </div>
        <div class="hidden shrink-0 sm:block">
          <CompanyLogo :name="experience.company" :src="experience.logo" decorative />
        </div>
        <div class="min-w-0 flex-1">
          <h2 :id="headingId" class="text-lg leading-snug font-semibold text-balance text-fg">
            <span class="block">{{ experience.title }}</span>
            <span class="sr-only">, </span>
            <span class="block text-base font-medium text-fg-muted">{{ experience.company }}</span>
          </h2>
          <ul
            v-if="isCurrent || chips.length"
            class="mt-2 flex flex-wrap gap-1.5"
            aria-label="Position details"
          >
            <li
              v-if="isCurrent"
              class="rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent"
            >
              Current
            </li>
            <li
              v-for="chip in chips"
              :key="chip"
              class="rounded-full bg-subtle px-2 py-0.5 text-xs font-medium text-fg-muted"
            >
              {{ chip }}
            </li>
          </ul>
        </div>
      </header>

      <p v-if="experience.summary" class="mt-4 text-pretty text-fg">{{ experience.summary }}</p>

      <ul
        v-if="experience.highlights.length"
        class="mt-4 list-disc space-y-1.5 pl-5 text-sm text-pretty text-fg-muted marker:text-accent/70"
      >
        <li v-for="(highlight, i) in experience.highlights" :key="i">{{ highlight }}</li>
      </ul>

      <TagList
        v-if="experience.stack.length"
        class="mt-4"
        :tags="experience.stack"
        :label="`${experience.company} tech stack`"
      />

      <MissionList
        v-if="experience.missions.length"
        :missions="experience.missions"
        :now="now"
        :default-open="experience.missions.length <= 2"
      />
    </BaseCard>
  </li>
</template>
