/** Calendar month, month is 1-12. */
export interface YearMonth {
  year: number
  month: number
}

/** end === null means "Present". */
export interface Period {
  start: YearMonth
  end: YearMonth | null
}

export type EmploymentType = 'Freelance' | 'Permanent' | 'Career break' | 'Apprenticeship'
export type WorkMode = 'On-site' | 'Hybrid' | 'Remote'

export interface Mission {
  id: string
  client: string
  role?: string
  location?: string
  period: Period
  summary?: string
  highlights: string[]
  stack: string[]
}

export interface Experience {
  id: string
  company: string
  title: string
  employmentType?: EmploymentType
  period: Period
  location?: string
  workMode?: WorkMode
  summary?: string
  highlights: string[]
  stack: string[]
  missions: Mission[]
  /** Resolved asset URL (imported image), undefined -> monogram fallback. */
  logo?: string
}

export type SkillLevel = 1 | 2 | 3 | 4 | 5

export interface Skill {
  name: string
  level: SkillLevel
  note?: string
}

export interface SkillCategory {
  id: string
  title: string
  description?: string
  /** 'skill' (default) = proficiency; 'language' = spoken-language fluency. */
  scale?: 'skill' | 'language'
  skills: Skill[]
}

/** Plain text paragraphs — never rendered with v-html. */
export interface AboutSection {
  id: string
  title: string
  paragraphs: string[]
}

export interface Education {
  id: string
  school: string
  degree: string
  employer?: string
  period: Period
  location?: string
  description: string[]
}

export type SocialPlatform = 'email' | 'github' | 'linkedin'

export interface SocialLink {
  platform: SocialPlatform
  label: string
  /** Display text, e.g. "arca223" or the email address. */
  handle: string
  url: string
  external: boolean
}

export interface NavItem {
  label: string
  /** Route path, e.g. '/experiences'. */
  to: string
}

export interface Profile {
  fullName: string
  firstName: string
  initials: string
  title: string
  headline: string
  location: string
  /** Short intro paragraphs for Home. */
  intro: string[]
  keySkills: string[]
  /** Resolved asset URL of the profile photo. */
  photo: string
}

/** Page header copy (eyebrow, h1, lead paragraph). */
export interface PageIntro {
  eyebrow: string
  title: string
  description: string
}

export interface ContactIntro {
  title: string
  description: string
  location: string
}
