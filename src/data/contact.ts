import { profile } from './profile'
import type { ContactIntro, SocialLink } from '@/types/content'

export const CONTACT_EMAIL = 'your.email@example.com' // TODO(Maxime): replace with real address

export const MAIL_SUBJECT = 'Freelance mission / opportunity'
export const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(MAIL_SUBJECT)}`

export const contactIntro: ContactIntro = {
  title: "Let's work together",
  description: "Have a project or an opportunity in mind? Send me a message and I'll get back to you.",
  location: `Based in ${profile.location}`,
}

export const socialLinks: SocialLink[] = [
  {
    platform: 'email',
    label: 'Email',
    handle: CONTACT_EMAIL,
    url: mailtoHref,
    external: false,
  },
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
