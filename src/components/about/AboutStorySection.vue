<script setup lang="ts">
import type { AboutSection } from '@/types/content'

defineProps<{ section: AboutSection }>()
</script>

<template>
  <section :id="section.id" :aria-labelledby="`${section.id}-title`">
    <h2 :id="`${section.id}-title`" class="mb-4 text-2xl font-semibold tracking-tight text-fg">
      {{ section.title }}
    </h2>
    <div class="space-y-4 text-base/7 text-pretty text-fg sm:text-lg/8">
      <p v-for="(paragraph, index) in section.paragraphs" :key="index">
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>
