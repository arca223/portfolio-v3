/**
 * Shared button styles, so a native <button> can look exactly like <LinkButton>:
 *
 *   <button type="button" :class="buttonClasses('secondary', 'lg')">Copy</button>
 */

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'md' | 'lg'

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60'

export const BUTTON_VARIANTS: Readonly<Record<ButtonVariant, string>> = {
  primary: 'bg-accent text-on-accent hover:bg-accent-hover',
  secondary: 'border border-line bg-surface text-fg hover:border-accent/60 hover:text-accent',
  ghost: 'text-accent hover:bg-accent-soft',
}

export const BUTTON_SIZES: Readonly<Record<ButtonSize, string>> = {
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
}

/** Full class string for a button-looking element. */
export function buttonClasses(variant: ButtonVariant = 'primary', size: ButtonSize = 'md'): string {
  return `${BASE} ${BUTTON_SIZES[size]} ${BUTTON_VARIANTS[variant]}`
}
