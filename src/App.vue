<script setup lang="ts">
import SkipLink from '@/components/layout/SkipLink.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useThemeStore } from '@/stores/theme'
import { notifyRouteEnter } from '@/utils/routeTransition'

// Instantiate early so <html> stays in sync with the stored/OS theme.
useThemeStore()

/*
 * Scroll restoration and focus management (page h1, or the #hash target) run in
 * the router's scrollBehavior once the new view has entered: after-enter below
 * releases it (see src/utils/routeTransition.ts).
 */
</script>

<template>
  <SkipLink />
  <div class="flex min-h-dvh flex-col">
    <AppHeader />
    <main id="main" tabindex="-1" class="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6">
      <RouterView v-slot="{ Component }">
        <Transition name="route" mode="out-in" @after-enter="notifyRouteEnter">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
  </div>
</template>
