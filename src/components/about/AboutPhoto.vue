<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <!-- Above the fold on mobile (first in the DOM): load it right away. -->
  <img
    :src="profile.photo"
    :alt="`Portrait of ${profile.fullName}`"
    width="800"
    height="800"
    loading="eager"
    fetchpriority="high"
    class="aspect-square size-32 rounded-2xl border border-line bg-subtle object-cover sm:size-40 lg:h-auto lg:w-full"
  />
</template>
