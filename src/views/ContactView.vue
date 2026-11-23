<script setup lang="ts">
import ContactCard from '@/components/contact/ContactCard.vue'
import EmailReveal from '@/components/contact/EmailReveal.vue'
import BaseSection from '@/components/ui/BaseSection.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { contactIntro, socialLinks } from '@/data/contact'
</script>

<template>
  <div class="pb-12">
    <PageHeader
      eyebrow="Contact"
      :title="contactIntro.title"
      :description="contactIntro.description"
    >
      <EmailReveal class="mt-8" />
      <p class="mt-6 flex items-center gap-2 text-sm text-fg-muted">
        <svg
          class="size-4 shrink-0 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>{{ contactIntro.location }}</span>
      </p>
    </PageHeader>

    <BaseSection id="contact-channels" title="Find me online">
      <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <li v-for="(link, i) in socialLinks" :key="link.platform" v-reveal="i * 80">
          <ContactCard :link="link" />
        </li>
      </ul>
    </BaseSection>
  </div>
</template>
