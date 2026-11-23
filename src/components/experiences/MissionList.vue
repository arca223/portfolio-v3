<script setup lang="ts">
import { computed } from 'vue'
import type { Mission } from '@/types/content'
import TagList from '@/components/ui/TagList.vue'
import PeriodRange from '@/components/ui/PeriodRange.vue'

interface Props {
  missions: Mission[]
  now: Date
  /** Expanded on first render (the visitor can still toggle it). */
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), { defaultOpen: false })

const count = computed(() => props.missions.length)
const heading = computed(() => `${count.value} client ${count.value === 1 ? 'mission' : 'missions'}`)
const clients = computed(() => props.missions.map((m) => m.client).join(', '))
</script>

<template>
  <details class="group mt-6 rounded-lg border border-line" :open="defaultOpen">
    <summary
      class="flex cursor-pointer list-none items-start gap-3 rounded-lg px-4 py-3 transition-colors hover:bg-subtle [&::-webkit-details-marker]:hidden"
    >
      <span class="min-w-0 flex-1">
        <span class="block text-sm font-semibold text-fg">{{ heading }}</span>
        <span class="mt-0.5 block text-xs text-pretty text-fg-muted">{{ clients }}</span>
      </span>
      <svg
        class="mt-0.5 size-5 shrink-0 text-fg-muted transition-transform duration-200 group-open:rotate-180"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path
          fill-rule="evenodd"
          d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd"
        />
      </svg>
    </summary>

    <ol class="space-y-6 border-t border-line px-4 py-5" :aria-label="heading">
      <li v-for="mission in missions" :key="mission.id" class="border-l-2 border-accent/40 pl-4">
        <h3 class="font-semibold text-fg">
          {{ mission.client }}
          <span v-if="mission.role" class="font-normal text-fg-muted">
            <span aria-hidden="true">· </span><span class="sr-only">, </span>{{ mission.role }}
          </span>
        </h3>
        <p class="mt-1 text-sm text-fg-muted">
          <PeriodRange :period="mission.period" :now="now" show-duration />
          <template v-if="mission.location">
            <span aria-hidden="true"> · </span><span class="sr-only">, </span>{{ mission.location }}
          </template>
        </p>
        <p v-if="mission.summary" class="mt-2 text-sm text-pretty text-fg">{{ mission.summary }}</p>
        <ul
          v-if="mission.highlights.length"
          class="mt-2 list-disc space-y-1 pl-5 text-sm text-pretty text-fg-muted marker:text-accent/70"
        >
          <li v-for="(highlight, i) in mission.highlights" :key="i">{{ highlight }}</li>
        </ul>
        <TagList v-if="mission.stack.length" class="mt-3" :tags="mission.stack" :label="`${mission.client} tech stack`" />
      </li>
    </ol>
  </details>
</template>
