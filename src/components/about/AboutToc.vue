<script setup lang="ts">
import { useRoute } from 'vue-router'
import { scrollToHash } from '@/utils/scroll'

export interface TocLink {
  id: string
  title: string
}

defineProps<{ links: TocLink[] }>()

const route = useRoute()

/**
 * The router ignores a click on the hash that is already current, so scroll
 * and focus ourselves in that case. Other clicks go through the router, whose
 * scrollBehavior scrolls to and focuses the target.
 */
function onClick(event: MouseEvent, hash: string): void {
  if (event.defaultPrevented || event.button !== 0) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  if (route.hash !== hash) return
  if (scrollToHash(hash)) event.preventDefault()
}
</script>

<template>
  <nav aria-labelledby="about-toc-title">
    <p id="about-toc-title" class="mb-3 text-xs font-semibold tracking-wide text-fg-muted uppercase">
      On this page
    </p>
    <ul class="space-y-1 border-l border-line text-sm">
      <li v-for="link in links" :key="link.id">
        <RouterLink
          :to="{ hash: `#${link.id}` }"
          class="-ml-px block border-l border-transparent py-1 pl-4 text-fg-muted transition-colors hover:border-accent hover:text-accent-hover"
          @click="onClick($event, `#${link.id}`)"
        >
          {{ link.title }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
