<script setup lang="ts">
import LinkButton from '@/components/ui/LinkButton.vue'
import { profile } from '@/data/profile'
import type { Experience } from '@/types/content'

defineProps<{
  /** Ongoing role; when undefined the "Currently…" pill is hidden. */
  currentExperience?: Pick<Experience, 'title' | 'company'>
}>()
</script>

<template>
  <header class="grid items-center gap-10 pt-12 pb-10 sm:pt-16 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12 md:pb-14">
    <div class="order-2 md:order-1">
      <p class="mb-3 text-sm font-semibold tracking-wide text-accent uppercase">Hi, I'm {{ profile.firstName }}</p>

      <!-- Page's only h1. tabindex=-1: the router's scrollBehavior moves focus here after each navigation (utils/scroll focusPageHeading). -->
      <h1 tabindex="-1" class="text-4xl font-bold tracking-tight text-balance text-fg sm:text-5xl">
        {{ profile.fullName }}
      </h1>

      <p class="mt-3 text-xl font-medium text-pretty text-fg sm:text-2xl">{{ profile.title }}</p>
      <p class="mt-1 text-base text-fg-muted">{{ profile.headline }}</p>

      <p
        v-if="currentExperience"
        class="mt-5 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface py-1.5 pr-4 pl-3 text-sm text-fg-muted"
      >
        <span class="relative flex size-2.5 shrink-0" aria-hidden="true">
          <span class="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
          <span class="relative inline-flex size-2.5 rounded-full bg-accent" />
        </span>
        <span>
          Currently {{ currentExperience.title }} at
          <strong class="font-semibold text-fg">{{ currentExperience.company }}</strong>
        </span>
      </p>

      <div class="mt-8 flex flex-col gap-3 min-[400px]:flex-row min-[400px]:flex-wrap">
        <LinkButton to="/experiences" variant="primary">View experiences</LinkButton>
        <LinkButton to="/contact" variant="secondary">Get in touch</LinkButton>
      </div>
    </div>

    <div class="order-1 justify-self-center md:order-2 md:justify-self-end">
      <div class="relative isolate">
        <div
          class="absolute -inset-3 -z-10 rounded-full bg-accent-soft blur-2xl"
          aria-hidden="true"
        />
        <img
          :src="profile.photo"
          :alt="`Portrait of ${profile.fullName}`"
          width="288"
          height="288"
          loading="eager"
          fetchpriority="high"
          class="size-44 rounded-full border border-line bg-subtle object-cover shadow-lg shadow-zinc-900/10 sm:size-56 md:size-64 lg:size-72 dark:shadow-black/30"
        />
      </div>
    </div>
  </header>
</template>
