<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'
import RambuChatWidget from './components/RambuChatWidget.vue'

const alert = ref({ show: false, color: 'success', text: '' })

const handleAppAlert = (e) => {
  const { color, text } = e.detail || {}
  alert.value = { show: true, color: color || 'info', text: text || '' }
  window.clearTimeout(window.__alertTimer)
  window.__alertTimer = window.setTimeout(() => {
    alert.value.show = false
  }, 3500)
}

onMounted(() => {
  window.addEventListener('app-alert', handleAppAlert)
})

onUnmounted(() => {
  window.removeEventListener('app-alert', handleAppAlert)
  window.clearTimeout(window.__alertTimer)
})
</script>

<template>
  <div id="app">
    <div v-if="alert.show" class="app-alert-container">
      <CAlert :color="alert.color" dismissible @close="alert.show = false">
        {{ alert.text }}
      </CAlert>
    </div>
    <RouterView />
    <RambuChatWidget />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.app-alert-container {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 3000;
  max-width: 360px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
