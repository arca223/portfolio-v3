import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'theme'
const THEME_COLORS: Record<Theme, string> = { dark: '#09090b', light: '#ffffff' }

function isTheme(value: unknown): value is Theme {
  return value === 'dark' || value === 'light'
}

function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return isTheme(value) ? value : null
  } catch {
    return null
  }
}

function writeStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Storage unavailable (private mode, blocked cookies): keep the in-memory value.
  }
}

/** Accessing `localStorage` throws when storage is blocked: guard the comparison. */
function isLocalStorage(area: Storage | null): boolean {
  try {
    return area === null || area === window.localStorage
  } catch {
    return false
  }
}

/** OS preference; defaults to dark when the OS expresses none. */
function systemTheme(): Theme {
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(theme: Theme): void {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
}

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<Theme>(readStoredTheme() ?? systemTheme())
  const isDark = computed(() => theme.value === 'dark')

  watch(theme, applyTheme, { immediate: true })

  // Follow OS changes until the visitor picks a theme explicitly.
  window.matchMedia?.('(prefers-color-scheme: light)').addEventListener('change', () => {
    if (readStoredTheme() === null) theme.value = systemTheme()
  })

  // Keep other open tabs in sync: `storage` fires in every *other* tab of this origin.
  // App-lifetime store → listener intentionally never removed.
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (event: StorageEvent) => {
      if (!isLocalStorage(event.storageArea)) return
      // key === null → storage cleared: fall back to the OS preference.
      if (event.key !== null && event.key !== STORAGE_KEY) return
      const next = isTheme(event.newValue) ? event.newValue : systemTheme()
      if (next !== theme.value) theme.value = next
    })
  }

  function set(value: Theme): void {
    theme.value = value
    writeStoredTheme(value)
  }

  function toggle(): void {
    set(isDark.value ? 'light' : 'dark')
  }

  return { theme, isDark, set, toggle }
})
