<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref } from 'vue'
import { buttonClasses } from '@/components/ui/buttonClasses'

const props = defineProps<{ email: string }>()

type Status = 'idle' | 'copied' | 'failed'

const status = ref<Status>('idle')
/** Text of the polite live region; empty until an action happens. */
const announcement = ref('')
let resetTimer: ReturnType<typeof setTimeout> | undefined

/** Legacy fallback for browsers/contexts without the async Clipboard API (e.g. non-HTTPS). */
function legacyCopy(text: string): boolean {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }
  document.body.removeChild(textarea)
  return ok
}

async function copy(): Promise<void> {
  let ok = false
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(props.email)
      ok = true
    } else {
      ok = legacyCopy(props.email)
    }
  } catch {
    ok = legacyCopy(props.email)
  }

  // Any previous reset is obsolete: on failure the fallback email must stay visible
  // (and selectable) until the next click, so only a success schedules a reset.
  clearTimeout(resetTimer)
  resetTimer = undefined
  status.value = ok ? 'copied' : 'failed'

  // Clear then set on the next tick so screen readers re-announce repeated identical messages.
  announcement.value = ''
  await nextTick()
  announcement.value = ok
    ? 'Email copied to clipboard'
    : `Copy failed. The email address is ${props.email}`

  if (ok) {
    resetTimer = setTimeout(() => {
      status.value = 'idle'
      announcement.value = ''
    }, 2500)
  }
}

onBeforeUnmount(() => clearTimeout(resetTimer))
</script>

<template>
  <span class="inline-flex flex-col items-start gap-1">
    <button
      type="button"
      :class="buttonClasses('secondary', 'lg')"
      @click="copy"
    >
      <svg
        class="size-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path v-if="status === 'copied'" d="M20 6 9 17l-5-5" />
        <template v-else>
          <rect x="9" y="9" width="12" height="12" rx="2" />
          <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
        </template>
      </svg>
      <!-- Label stays stable for assistive tech; the live region announces the result. -->
      <span aria-hidden="true">{{ status === 'copied' ? 'Copied!' : 'Copy email' }}</span>
      <span class="sr-only">Copy email address</span>
    </button>
    <span
      v-if="status === 'failed'"
      class="text-sm text-fg-muted select-all"
      aria-hidden="true"
      >{{ email }}</span
    >
    <span class="sr-only" role="status" aria-live="polite">{{ announcement }}</span>
  </span>
</template>
