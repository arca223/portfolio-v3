import type { Experience, Period, YearMonth } from '@/types/content'

/**
 * Pure, typed date helpers shared by every page.
 *
 * - Months are 1-12 (see `YearMonth`); `end === null` means "Present".
 * - "Now" is the visitor's *local* calendar month; every function that needs it
 *   takes an optional `now` so a page can pass one shared value and all
 *   numbers agree.
 * - Formatting runs in UTC so the visitor's timezone can never shift a month.
 */

const monthYearFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

/** Employment type excluded from years of experience. */
const CAREER_BREAK = 'Career break'

/** Months since year 0 (`year * 12 + month - 1`), for comparisons and arithmetic. */
export function toIndex({ year, month }: YearMonth): number {
  return year * 12 + (month - 1)
}

/** Calendar month of `now` in the visitor's local time. */
export function currentYearMonth(now: Date = new Date()): YearMonth {
  return { year: now.getFullYear(), month: now.getMonth() + 1 }
}

/** `{ year: 2024, month: 9 }` → `"Sep 2024"`. */
export function formatYearMonth(ym: YearMonth): string {
  return monthYearFormatter.format(new Date(Date.UTC(ym.year, ym.month - 1, 1)))
}

/** `{ year: 2024, month: 9 }` → `"2024-09"` (valid `<time datetime>` value). */
export function toDatetime({ year, month }: YearMonth): string {
  return `${year}-${String(month).padStart(2, '0')}`
}

/**
 * Calendar months covered by `period`, both ends included (LinkedIn-style),
 * an ongoing period counting up to `now`. Minimum 1.
 */
export function monthsIn(period: Period, now: Date = new Date()): number {
  const end = period.end ?? currentYearMonth(now)
  return Math.max(1, toIndex(end) - toIndex(period.start) + 1)
}

/** LinkedIn-style duration: `15` → `"1 yr 3 mos"`, `12` → `"1 yr"`, `2` → `"2 mos"`, `1` → `"1 mo"`. */
export function formatDuration(months: number): string {
  const total = Math.max(0, Math.floor(months))
  const years = Math.floor(total / 12)
  const rest = total % 12
  const parts: string[] = []
  if (years > 0) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`)
  if (rest > 0 || years === 0) parts.push(`${rest} ${rest === 1 ? 'mo' : 'mos'}`)
  return parts.join(' ')
}

/** Human duration of a period, e.g. `"1 yr 3 mos"`. */
export function duration(period: Period, now: Date = new Date()): string {
  return formatDuration(monthsIn(period, now))
}

/**
 * Distinct months covered by several periods (ends included): overlapping
 * months are counted once, gaps are not counted.
 */
export function totalMonths(periods: readonly Period[], now: Date = new Date()): number {
  const nowIndex = toIndex(currentYearMonth(now))
  const ranges = periods
    .map((p) => [toIndex(p.start), p.end ? toIndex(p.end) : nowIndex] as const)
    .sort((a, b) => a[0] - b[0])

  let total = 0
  let cursor = -Infinity // last month already counted
  for (const [start, end] of ranges) {
    const from = Math.max(start, cursor + 1)
    if (end >= from) {
      total += end - from + 1
      cursor = end
    }
  }
  return total
}

/** Whole years of professional experience: overlaps merged, career breaks excluded. */
export function yearsOfExperience(
  experiences: readonly Pick<Experience, 'period' | 'employmentType'>[],
  now: Date = new Date(),
): number {
  const periods = experiences.filter((e) => e.employmentType !== CAREER_BREAK).map((e) => e.period)
  return Math.floor(totalMonths(periods, now) / 12)
}
