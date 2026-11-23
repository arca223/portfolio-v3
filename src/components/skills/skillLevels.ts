import type { SkillLevel } from '@/types/content'

export interface SkillLevelInfo {
  label: string
  description: string
}

/** UI vocabulary for the 1–5 scale (not content: lives with the components). */
export const SKILL_LEVELS: Readonly<Record<SkillLevel, SkillLevelInfo>> = {
  1: { label: 'Basic', description: 'Notions, occasional use' },
  2: { label: 'Familiar', description: 'Used on projects, still learning' },
  3: { label: 'Proficient', description: 'Autonomous in day-to-day work' },
  4: { label: 'Advanced', description: 'Deep experience, can guide others' },
  5: { label: 'Expert', description: 'Years of production use, go-to person' },
}

export const SKILL_LEVEL_VALUES: readonly SkillLevel[] = [1, 2, 3, 4, 5]

export const MAX_SKILL_LEVEL = 5

/** e.g. 'Advanced (4 of 5)' */
export function skillLevelText(level: SkillLevel): string {
  return `${SKILL_LEVELS[level].label} (${level} of ${MAX_SKILL_LEVEL})`
}
