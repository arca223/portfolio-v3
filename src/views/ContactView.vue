<script setup lang="ts">
import ContactCard from '@/components/contact/ContactCard.vue'
import CopyEmailButton from '@/components/contact/CopyEmailButton.vue'
import BaseSection from '@/components/ui/BaseSection.vue'
import LinkButton from '@/components/ui/LinkButton.vue'
import PageHeader from '@/components/ui/PageHeader.vue'
import { CONTACT_EMAIL, contactIntro, mailtoHref, socialLinks } from '@/data/contact'
</script>

<template>
  <div class="pb-12">
    <PageHeader
      eyebrow="Contact"
      :title="contactIntro.title"
      :description="contactIntro.description"
    >
      <div class="mt-8 flex flex-wrap items-start gap-3">
        <LinkButton :href="mailtoHref" size="lg">
          <svg
            class="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          Email me
        </LinkButton>
        <CopyEmailButton :email="CONTACT_EMAIL" />
      </div>
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
      <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="(link, i) in socialLinks" :key="link.platform" v-reveal="i * 80">
          <ContactCard :link="link" />
        </li>
      </ul>
    </BaseSection>
  </div>
</template>
