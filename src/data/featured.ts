import type { FeaturedProject } from '@/types/content'

export const featuredProject: FeaturedProject = {
  sectionTitle: 'Featured project',
  eyebrow: 'Bedrock Streaming · Freelance',
  title: 'Migrating 280,000 lines of PHP to Go with AI',
  problem: 'A large PHP codebase had to move to Go without changing its behaviour.',
  approach: [
    'Locked behaviour down with oracles, a test harness and golden tests to prove parity between PHP and Go.',
    '100% AI-driven development with Claude Code, Codex and Fable, with reviews by Astra.',
    'GitHub pull requests and issues as the discussion channel between agents and engineers.',
  ],
  result: 'The Go code runs in production, and the project has since moved to fully agentic development.',
  stack: ['Go', 'PHP', 'Claude Code', 'Codex', 'Golden testing'],
}
