import type { Profile } from '@/types/content'
import photo from '@/assets/img/profile/maxime.jpg'

export const profile: Profile = {
  fullName: 'Maxime Cocquempot',
  firstName: 'Maxime',
  initials: 'MC',
  title: 'Freelance Software Engineer',
  headline: 'PHP · Go · AI-driven engineering',
  location: 'Lyon, France',
  intro: [
    "I'm a web engineer working with PHP and JavaScript since 2016. After years in consulting, I've worked with many stacks, teams and industries, which made me both versatile and specialised.",
    "I'm now freelancing at Bedrock Streaming, where I actively contribute to AI-driven projects such as a 280,000-line PHP-to-Go migration now running in production.",
  ],
  keySkills: ['PHP', 'Go', 'Symfony', 'AI-driven engineering', 'Laravel', 'Vue.js', 'Docker'],
  photo,
}
