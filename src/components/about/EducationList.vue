<script setup lang="ts">
import type { Education } from '@/types/content'
import BaseCard from '@/components/ui/BaseCard.vue'
import PeriodRange from '@/components/ui/PeriodRange.vue'

defineProps<{ items: Education[] }>()
</script>

<template>
  <ul class="space-y-4">
    <BaseCard v-for="(item, index) in items" :key="item.id" v-reveal="index * 80" as="li">
      <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 class="text-lg font-semibold text-fg">{{ item.degree }}</h3>
        <PeriodRange :period="item.period" class="shrink-0 text-sm text-fg-muted tabular-nums" />
      </div>
      <p class="mt-1 text-fg-muted">
        {{ item.school }}<template v-if="item.location"> · {{ item.location }}</template>
      </p>
      <p v-if="item.employer" class="mt-1 text-sm text-fg-muted">
        Apprenticeship with <span class="font-medium text-fg">{{ item.employer }}</span>
      </p>
      <ul
        v-if="item.description.length"
        class="mt-4 list-disc space-y-2 pl-5 text-fg marker:text-accent"
      >
        <li v-for="(line, lineIndex) in item.description" :key="lineIndex">{{ line }}</li>
      </ul>
    </BaseCard>
  </ul>
</template>
