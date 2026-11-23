// Semantic UI and Font Awesome from v1 intentionally dropped (obsolete in a Tailwind stack) — see docs/decisions.md D17.
import type { SkillCategory } from '@/types/content'

export const skillsIntro =
  "My missions have taken me through many stacks and teams, which made me both versatile across projects and specialised in PHP and JavaScript."

// Levels marked "// estimated" are not from the v1 portfolio and are best guesses.
export const skillCategories: SkillCategory[] = [
  {
    id: 'languages-frameworks',
    title: 'Back-end',
    description: 'My core stack, mostly PHP on the back-end.',
    skills: [
      { name: 'PHP', level: 5 },
      { name: 'Symfony', level: 4 },
      { name: 'Laravel', level: 4 }, // estimated
      { name: 'REST APIs', level: 5 }, // estimated
      { name: 'Domain-Driven Design', level: 3 }, // estimated
      { name: 'Node.js', level: 2 },
      { name: 'Go', level: 2 }, // estimated
      { name: 'Python', level: 2, note: 'Learning' }, // estimated
    ],
  },
  {
    id: 'front-end',
    title: 'Front-end',
    skills: [
      { name: 'JavaScript', level: 5 },
      { name: 'Vue.js', level: 4 },
      { name: 'TypeScript', level: 3 }, // estimated
      { name: 'AngularJS', level: 3 },
      { name: 'React', level: 2 }, // estimated
      { name: 'Stencil.js', level: 2 }, // estimated
      { name: 'CSS', level: 3 },
      { name: 'Bootstrap', level: 3 },
      { name: 'Shopify / Shopware plugins', level: 3 }, // estimated
    ],
  },
  {
    id: 'devops-tools',
    title: 'DevOps & tools',
    skills: [
      { name: 'Docker', level: 4 },
      { name: 'Git', level: 5 },
      { name: 'Nginx', level: 3 },
      { name: 'CircleCI', level: 3 },
      { name: 'Jenkins', level: 3 },
      { name: 'Sentry', level: 4 },
      { name: 'Datadog', level: 4 },
      { name: 'Grafana', level: 3 }, // estimated
      { name: 'RabbitMQ', level: 3 }, // estimated
      { name: 'Jira', level: 5 },
    ],
  },
  {
    id: 'quality-testing',
    title: 'Quality & testing',
    skills: [
      { name: 'PHPUnit', level: 4 }, // estimated
      { name: 'Behat', level: 3 }, // estimated
      { name: 'PHPStan', level: 4 }, // estimated
    ],
  },
  {
    id: 'ways-of-working',
    title: 'Ways of working',
    skills: [
      { name: 'Agile methodologies', level: 5, note: 'Agile methods' },
      { name: 'Teamwork', level: 5, note: 'Teamwork and participation' },
    ],
  },
  {
    id: 'spoken-languages',
    title: 'Spoken languages',
    scale: 'language',
    skills: [
      { name: 'French', level: 5, note: 'Native' },
      { name: 'English', level: 5, note: 'Fluent — C1 (CAE)' },
      { name: 'Japanese', level: 2, note: 'Beginner' },
      { name: 'Spanish', level: 2, note: 'Beginner' },
    ],
  },
]
