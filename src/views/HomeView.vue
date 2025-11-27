<script setup>
import { ref, onMounted } from 'vue'
import HeroSection from '../components/HeroSection.vue'
import CultureSection from '../components/CultureSection.vue'
import AttractionsSection from '../components/AttractionsSection.vue'
import GallerySection from '../components/GallerySection.vue'
import TestimonialsSection from '../components/TestimonialsSection.vue'
import ContactSection from '../components/ContactSection.vue'
import NavigationBar from '../components/NavigationBar.vue'
import AppFooter from '../components/AppFooter.vue'

const isScrolled = ref(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 50
  })
})
</script>

<template>
  <div class="landing-page">
    <NavigationBar :is-scrolled="isScrolled" />
    <HeroSection />
    <CultureSection />
    <AttractionsSection />
    <GallerySection />
    <TestimonialsSection />
    <ContactSection />
    <AppFooter />
  </div>
</template>

<style scoped>
.landing-page {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  line-height: 1.6;
  color: #333;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  overflow-x: hidden;
}
</style>
