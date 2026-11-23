<script setup lang="ts">
import { computed } from 'vue'
import type { Period } from '@/types/content'
import { duration, formatYearMonth, toDatetime } from '@/utils/date'

interface Props {
  period: Period
  /** Reference date for ongoing periods (pass the page's shared value so all numbers agree). */
  now?: Date
  /** Append " · 1 yr 3 mos". */
  showDuration?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  now: () => new Date(),
  showDuration: false,
})

const start = computed(() => ({
  datetime: toDatetime(props.period.start),
  label: formatYearMonth(props.period.start),
}))
const end = computed(() =>
  props.period.end
    ? { datetime: toDatetime(props.period.end), label: formatYearMonth(props.period.end) }
    : null,
)
const length = computed(() => duration(props.period, props.now))
</script>

<template>
  <span>
    <time :datetime="start.datetime">{{ start.label }}</time>
    <span aria-hidden="true"> – </span>
    <span class="sr-only"> to </span>
    <time v-if="end" :datetime="end.datetime">{{ end.label }}</time>
    <span v-else class="font-semibold text-accent">Present</span>
    <template v-if="showDuration">
      <span aria-hidden="true"> · </span>
      <span class="sr-only">, </span>
      <span>{{ length }}</span>
    </template>
  </span>
</template>
