<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { NavItem } from '@/types/content'

defineProps<{ items: NavItem[] }>()

const PANEL_ID = 'mobile-nav-panel'

const open = ref(false)
const route = useRoute()
const toggleButton = useTemplateRef<HTMLButtonElement>('toggleButton')
const panel = useTemplateRef<HTMLElement>('panel')
const root = useTemplateRef<HTMLElement>('root')

function close(returnFocus = false): void {
  if (!open.value) return
  open.value = false
  if (returnFocus) toggleButton.value?.focus()
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') close(true)
}

function onPointerDown(event: PointerEvent): void {
  const target = event.target as Node | null
  if (!target || panel.value?.contains(target) || toggleButton.value?.contains(target)) return
  close()
}

/** Close when keyboard focus moves outside the toggle + panel (e.g. Tab past the last link). */
function onFocusOut(event: FocusEvent): void {
  const next = event.relatedTarget
  // null = focus left the document or went to a non-focusable spot (handled by pointerdown).
  if (!(next instanceof Node) || root.value?.contains(next)) return
  close()
}

watch(open, async (isOpen) => {
  if (isOpen) {
    document.addEventListener('keydown', onKeydown)
    document.addEventListener('pointerdown', onPointerDown)
    await nextTick()
    panel.value?.querySelector<HTMLAnchorElement>('a')?.focus()
  } else {
    document.removeEventListener('keydown', onKeydown)
    document.removeEventListener('pointerdown', onPointerDown)
  }
})

watch(() => route.fullPath, () => close())

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.removeEventListener('pointerdown', onPointerDown)
})
</script>

<template>
  <div ref="root" class="md:hidden" @focusout="onFocusOut">
    <button
      ref="toggleButton"
      type="button"
      class="inline-flex size-10 items-center justify-center rounded-lg text-fg-muted transition-colors hover:bg-subtle hover:text-fg"
      :aria-expanded="open"
      :aria-controls="PANEL_ID"
      @click="open = !open"
    >
      <span class="sr-only">{{ open ? 'Close menu' : 'Open menu' }}</span>
      <svg
        class="size-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path v-if="open" d="M6 6l12 12M18 6L6 18" />
        <path v-else d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <nav
        v-show="open"
        :id="PANEL_ID"
        ref="panel"
        aria-label="Main"
        class="absolute inset-x-0 top-full border-b border-line bg-canvas shadow-lg"
      >
        <ul class="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3 sm:px-6">
          <li v-for="item in items" :key="item.to">
            <!-- Close on any click. The current page's link triggers no navigation (so no
                 focus move): return focus to the toggle instead of dropping it to <body>. -->
            <RouterLink
              :to="item.to"
              @click="close(route.path === item.to)"
              class="block rounded-lg px-3 py-2.5 text-base font-medium text-fg-muted transition-colors hover:bg-subtle hover:text-fg aria-[current=page]:bg-accent-soft aria-[current=page]:text-accent"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </Transition>
  </div>
</template>
