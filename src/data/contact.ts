import { profile } from './profile'
import type { ContactIntro, SocialLink, SocialPlatform } from '@/types/content'

export const MAIL_SUBJECT = 'Freelance mission / opportunity'

/** Basic shape check: something@something.tld, no whitespace. */
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Decodes the build-time obfuscated contact email (base64 of the reversed address).
 * Returns null when it is not configured or does not look like an email address.
 */
export function revealContactEmail(): string | null {
  const encoded = __CONTACT_EMAIL_ENC__
  if (!encoded) return null
  try {
    const bytes = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0))
    const reversed = new TextDecoder().decode(bytes)
    const email = [...reversed].reverse().join('')
    return EMAIL_SHAPE.test(email) ? email : null
  } catch {
    return null
  }
}

export function contactMailtoHref(email: string): string {
  return `mailto:${email}?subject=${encodeURIComponent(MAIL_SUBJECT)}`
}

/** The email channel, without its address (revealed on demand on the Contact page). */
export const emailChannel: { platform: SocialPlatform; label: string } = {
  platform: 'email',
  label: 'Email',
}

export const contactIntro: ContactIntro = {
  title: "Let's work together",
  description: "Have a project or an opportunity in mind? Send me a message and I'll get back to you.",
  location: `Based in ${profile.location}`,
}

export const socialLinks: SocialLink[] = [
  {
    platform: 'github',
    label: 'GitHub',
    handle: 'arca223',
    url: 'https://github.com/arca223',
    external: true,
  },
  {
    platform: 'linkedin',
    label: 'LinkedIn',
    handle: 'maxime-cocquempot',
    url: 'https://www.linkedin.com/in/maxime-cocquempot-866944b2',
    external: true,
  },
]
