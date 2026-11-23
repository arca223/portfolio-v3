<script setup lang="ts">
function skipToMain(): void {
  const main = document.getElementById('main')
  if (!main) return
  main.focus()
  main.scrollIntoView()
}
</script>

<template>
  <a
    href="#main"
    class="sr-only z-50 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
    @click.prevent="skipToMain"
  >
    Skip to main content
  </a>
</template>
