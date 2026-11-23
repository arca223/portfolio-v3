<script setup lang="ts">
import { profile } from '@/data/profile'
import { emailChannel, socialLinks } from '@/data/contact'
import SocialIcon from '@/components/ui/SocialIcon.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line">
    <div
      class="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 text-sm text-fg-muted sm:flex-row sm:justify-between sm:px-6"
    >
      <div class="text-center sm:text-left">
        <p>&copy; {{ year }} {{ profile.fullName }}</p>
        <p class="mt-1">Built with Vue 3, TypeScript &amp; Tailwind CSS</p>
      </div>

      <ul class="flex items-center gap-1" aria-label="Social links">
        <li>
          <!-- No address here: the email is only revealed on the Contact page. -->
          <RouterLink
            to="/contact"
            class="inline-flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-subtle hover:text-accent"
          >
            <SocialIcon :platform="emailChannel.platform" />
            <span class="sr-only">Contact</span>
          </RouterLink>
        </li>
        <li v-for="link in socialLinks" :key="link.platform">
          <a
            :href="link.url"
            class="inline-flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-subtle hover:text-accent"
            v-bind="link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}"
          >
            <SocialIcon :platform="link.platform" />
            <span class="sr-only">
              {{ link.label }}<template v-if="link.external"> (opens in a new tab)</template>
            </span>
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>
