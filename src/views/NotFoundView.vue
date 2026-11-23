<script setup lang="ts">
import PageHeader from '@/components/ui/PageHeader.vue'
import LinkButton from '@/components/ui/LinkButton.vue'
</script>

<template>
  <div class="pb-16">
    <PageHeader
      eyebrow="Error 404"
      title="Page not found"
      description="The page you are looking for doesn't exist or has moved."
    />
    <div class="flex flex-wrap gap-3">
      <LinkButton to="/">Back to home</LinkButton>
      <LinkButton to="/contact" variant="secondary">Contact me</LinkButton>
    </div>
  </div>
</template>
