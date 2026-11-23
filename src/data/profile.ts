import type { Profile } from '@/types/content'
import photo from '@/assets/img/profile/maxime.jpg'

export const profile: Profile = {
  fullName: 'Maxime Cocquempot',
  firstName: 'Maxime',
  initials: 'MC',
  title: 'Freelance Software Engineer',
  headline: 'PHP Symfony / Vue.js · Fullstack',
  location: 'Lyon, France',
  intro: [
    "I'm a web engineer working with PHP and JavaScript since 2016. After years in consulting, I've worked with many stacks, teams and industries, which made me both versatile and specialised.",
    "I'm now freelancing as a software engineer at Bedrock Streaming, and I'm currently learning Python and AI on the side.",
  ],
  keySkills: ['PHP', 'Symfony', 'Laravel', 'Vue.js', 'Docker', 'Go'],
  photo,
}
