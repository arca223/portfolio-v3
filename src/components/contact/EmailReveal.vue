<script setup lang="ts">
import { nextTick, ref, useTemplateRef } from 'vue'
import CopyEmailButton from '@/components/contact/CopyEmailButton.vue'
import { buttonClasses } from '@/components/ui/buttonClasses'
import LinkButton from '@/components/ui/LinkButton.vue'
import { contactMailtoHref, revealContactEmail } from '@/data/contact'

const regionId = 'contact-email-region'
const isDev = import.meta.env.DEV

/** Only offer the reveal when an address is configured (the value itself is decoded on click). */
const isConfigured = revealContactEmail() !== null

const email = ref<string | null>(null)
const addressEl = useTemplateRef<HTMLElement>('address')

async function reveal(): Promise<void> {
  email.value = revealContactEmail()
  if (email.value === null) return
  // The button is replaced by the address: move focus there so it is read out.
  await nextTick()
  addressEl.value?.focus()
}
</script>

<template>
  <div v-if="isConfigured" class="flex flex-col items-start gap-4">
    <button
      v-if="email === null"
      type="button"
      :class="buttonClasses('primary', 'lg')"
      aria-expanded="false"
      :aria-controls="regionId"
      @click="reveal"
    >
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
      Show email address
    </button>

    <div :id="regionId">
      <template v-if="email !== null">
        <p
          ref="address"
          tabindex="-1"
          class="rounded text-lg font-semibold text-fg [overflow-wrap:anywhere] select-all"
        >
          <span class="sr-only">Email address: </span>{{ email }}
        </p>
        <div class="mt-4 flex flex-wrap items-start gap-3">
          <LinkButton :href="contactMailtoHref(email)" size="lg">
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
          <CopyEmailButton :email="email" />
        </div>
      </template>
    </div>
  </div>
  <p v-else-if="isDev" class="text-sm text-fg-muted">
    Email not configured (set CONTACT_EMAIL in .env.local)
  </p>
</template>
