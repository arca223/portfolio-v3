<script setup lang="ts">
interface Props {
  tags: string[]
  /** Accessible name for the list, e.g. "Tech stack". */
  label?: string
}

defineProps<Props>()
</script>

<template>
  <ul v-if="tags.length" class="flex flex-wrap gap-2" :aria-label="label">
    <li
      v-for="tag in tags"
      :key="tag"
      class="rounded-full border border-line bg-subtle px-2.5 py-0.5 text-xs font-medium text-fg-muted"
    >
      {{ tag }}
    </li>
  </ul>
</template>
