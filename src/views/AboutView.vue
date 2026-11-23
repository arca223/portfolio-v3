<script setup lang="ts">
import PageHeader from '@/components/ui/PageHeader.vue'
import BaseSection from '@/components/ui/BaseSection.vue'
import AboutPhoto from '@/components/about/AboutPhoto.vue'
import AboutStory from '@/components/about/AboutStory.vue'
import AboutToc, { type TocLink } from '@/components/about/AboutToc.vue'
import EducationList from '@/components/about/EducationList.vue'
import { aboutIntro, aboutSections, education } from '@/data/about'

const EDUCATION_ID = 'education'

const tocLinks: TocLink[] = [
  ...aboutSections.map(({ id, title }) => ({ id, title })),
  { id: EDUCATION_ID, title: 'Education' },
]
</script>

<template>
  <div>
    <PageHeader v-bind="aboutIntro" />

    <div class="grid gap-10 pb-6 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
      <!-- Photo first in the DOM: above the story on mobile, side column on lg+ (only the TOC is sticky). -->
      <div class="lg:order-last">
        <div class="lg:contents">
          <AboutPhoto />
          <AboutToc :links="tocLinks" class="hidden lg:sticky lg:top-24 lg:mt-8 lg:block" />
        </div>
      </div>

      <AboutStory :sections="aboutSections" />
    </div>

    <BaseSection :id="EDUCATION_ID" title="Education">
      <EducationList :items="education" />
    </BaseSection>
  </div>
</template>
