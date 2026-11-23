import type { AboutSection, Education, PageIntro } from '@/types/content'

export const aboutIntro: PageIntro = {
  eyebrow: 'About',
  title: 'About me',
  description:
    "The story behind the code: how I got into tech, the consulting years, and what I'm up to today.",
}

export const aboutSections: AboutSection[] = [
  {
    id: 'intro',
    title: "Hi, I'm Maxime",
    paragraphs: [
      'Maxime Cocquempot, but my friends call me Le Coq, or just Coq — as in "rooster". Yes, really.',
      "I'm a French web engineer specialised in PHP and JavaScript stacks, working in the field since 2016.",
    ],
  },
  {
    id: 'how-it-started',
    title: 'How it started',
    paragraphs: [
      'I grew up around technology, mostly thanks to my brother, who was deep into it. He went through IT studies; I liked what I saw and followed him. We are now both IT engineers, though he is more into big companies while I clearly prefer startup environments.',
      'I took my first IT class in high school as an elective, at 16, but I think I already knew where I was heading. I then did a two-year DUT, a technical university degree in computer science, in Grenoble, and worked hard to get into an engineering school.',
      'I chose to do it as an apprentice, which gave me professional and technical experience from day one. Three years of studies and real work later, I graduated having learned a lot, both in theory and in practice, with great co-workers who taught me many best practices. It is also where I discovered Symfony, which would shape most of my career.',
    ],
  },
  {
    id: 'consulting-years',
    title: 'The consulting years',
    paragraphs: [
      "Finding a job after school wasn't hard. Finding a company that would let me focus on the stack I wanted was another story. My first pick was obviously a bad one: I was promised things that kept changing. A few months later, I joined abbeal to finally work on what I do best.",
      'That meant years of consulting with many clients, teams and stacks, always around PHP and JS. It made me both more specialised and more versatile, and I picked up a lot of best practices along the way. I adapt quickly to new projects and teams, and I consider that a real advantage.',
      'From late 2018 to early 2019, I spent four months in Japan to challenge myself and discover a new culture and work environment, then came back to abbeal. Later, I joined Yook, a Hamburg-based company, fully remote, to push climate action in e-commerce.',
    ],
  },
  {
    id: 'today',
    title: 'Today',
    paragraphs: [
      'From late 2022 to the end of 2023, I took a sabbatical: I travelled and spent time learning new technologies on my own, and built a portfolio along the way. I then joined MAX Digital Services, working on Symfony migrations and API integrations before landing on a streaming platform project.',
      "Today I'm freelancing as a software engineer at Bedrock Streaming, and I'm learning Python and AI on the side.",
      'I have always enjoyed challenges. Being bored at work is my worst nightmare: if there is nothing to do, I will learn something on my own anyway. This is probably why I love startup-like environments.',
    ],
  },
]

export const education: Education[] = [
  {
    id: 'engineering-degree',
    // TODO(Maxime): school name (v1 does not name the engineering school)
    school: 'Engineering school',
    degree: 'Engineering degree',
    employer: 'CCSD / CNRS',
    period: { start: { year: 2013, month: 9 }, end: { year: 2016, month: 9 } },
    description: [
      'Year 1: built a back-office for HAL, the main project, to manage its document thumbnails — UI, features, and a tool to monitor the status of every thumbnail.',
      'Year 2: worked as a DevOps engineer and migrated the whole machine fleet from an old deployment tool to SaltStack, porting existing modules and writing new ones.',
      'Year 3: developed a Symfony module for Sciencesconf.org to create, manage and update conference schedules.',
    ],
  },
  {
    id: 'dut',
    // TODO(Maxime): v1 says "DUT2 in Grenoble" — confirm it is IUT 2 Grenoble
    school: 'IUT 2',
    degree: 'DUT in Computer Science (two-year technical degree)',
    // TODO(Maxime): confirm dates — inferred
    period: { start: { year: 2011, month: 9 }, end: { year: 2013, month: 6 } },
    location: 'Grenoble, France',
    description: ['Two-year technical degree at a well-ranked institute in Grenoble.'],
  },
]
