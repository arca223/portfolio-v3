<script setup lang="ts">
import { profile } from '@/data/profile'
import { navItems } from '@/data/navigation'
import MobileNav from './MobileNav.vue'
import ThemeToggle from './ThemeToggle.vue'
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line/70 bg-canvas/80 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/70">
    <div class="relative mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
      <RouterLink
        to="/"
        class="inline-flex size-10 items-center justify-center rounded-lg border border-line text-sm font-bold tracking-tight text-fg transition-colors hover:border-accent hover:text-accent"
        :aria-label="`${profile.fullName}, home`"
      >
        <span aria-hidden="true">{{ profile.initials }}</span>
      </RouterLink>

      <div class="flex items-center gap-1 sm:gap-2">
        <nav aria-label="Main" class="hidden md:block">
          <ul class="flex items-center gap-1">
            <li v-for="item in navItems" :key="item.to">
              <RouterLink
                :to="item.to"
                class="rounded-lg px-3 py-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg aria-[current=page]:text-accent"
              >
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>
        <ThemeToggle />
        <MobileNav :items="navItems" />
      </div>
    </div>
  </header>
</template>
