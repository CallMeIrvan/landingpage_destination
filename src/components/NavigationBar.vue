<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="navbar__container">
      <div class="navbar__logo">
        <div class="navbar__logo-text">
          <h2 class="navbar__logo-title">Sumba Culture</h2>
          <span class="navbar__logo-subtitle">Wisata Budaya</span>
        </div>
      </div>

      <div class="navbar__menu" :class="{ 'navbar__menu--active': isMenuOpen }">
        <a href="#home" class="navbar__link" @click="closeMenu">
          <span class="navbar__link-text">Beranda</span>
          <div class="navbar__link-indicator"></div>
        </a>
        <a href="#culture" class="navbar__link" @click="closeMenu">
          <span class="navbar__link-text">Budaya</span>
          <div class="navbar__link-indicator"></div>
        </a>
        <a href="#attractions" class="navbar__link" @click="closeMenu">
          <span class="navbar__link-text">Destinasi</span>
          <div class="navbar__link-indicator"></div>
        </a>
        <a href="#gallery" class="navbar__link" @click="closeMenu">
          <span class="navbar__link-text">Galeri</span>
          <div class="navbar__link-indicator"></div>
        </a>
        <a href="#testimonials" class="navbar__link" @click="closeMenu">
          <span class="navbar__link-text">Testimoni</span>
          <div class="navbar__link-indicator"></div>
        </a>
        <a href="#contact" class="navbar__link" @click="closeMenu">
          <span class="navbar__link-text">Kontak</span>
          <div class="navbar__link-indicator"></div>
        </a>

        <!-- Mobile CTA Button -->
        <div class="navbar__mobile-cta">
          <button class="navbar__cta navbar__cta--mobile" @click="scrollToContact">
            <span>Pesan Sekarang</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div class="navbar__actions">
        <!-- Desktop CTA Button -->
        <button class="navbar__cta navbar__cta--desktop" @click="scrollToContact">
          <span>Pesan Sekarang</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <!-- Hamburger Menu -->
        <div
          class="navbar__hamburger"
          :class="{ 'navbar__hamburger--active': isMenuOpen }"
          @click="toggleMenu"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <div
      class="navbar__overlay"
      :class="{ 'navbar__overlay--active': isMenuOpen }"
      @click="closeMenu"
    ></div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  isScrolled: {
    type: Boolean,
    default: false,
  },
})

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const scrollToContact = () => {
  const element = document.getElementById('contact')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  closeMenu()
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
}

.navbar--scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
}

.navbar__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  min-height: 60px;
}

.navbar__logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.navbar__logo:hover {
  transform: scale(1.05);
}

.navbar__logo-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.navbar__logo-title {
  font-family: 'Pirata One', cursive;
  color: #2d5016;
  font-size: 1.8rem;
  font-weight: 400;
  margin: 0;
  line-height: 1;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.navbar__logo-subtitle {
  font-family: 'BBH Sans Bartle', sans-serif;
  font-size: 0.7rem;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: -2px;
  display: block;
}

.navbar__menu {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  position: relative;
}

/* Desktop: menu horizontal */
@media (min-width: 1025px) {
  .navbar__menu {
    display: flex;
  }
}

.navbar__link {
  text-decoration: none;
  color: #333;
  font-family: 'Oswald', sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: 0.5px;
}

.navbar__link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 12px;
}

.navbar__link:hover::before {
  opacity: 0.1;
}

.navbar__link:hover {
  color: #d4af37;
  transform: translateY(-2px);
}

.navbar__link-text {
  position: relative;
  z-index: 1;
}

.navbar__link-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  border-radius: 2px;
  transition: width 0.3s ease;
}

.navbar__link:hover .navbar__link-indicator {
  width: 80%;
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.navbar__cta {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #333;
  border: none;
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.navbar__cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

/* Tablet breakpoint */
@media (max-width: 1024px) {
  .navbar__container {
    padding: 0 1rem;
  }

  .navbar__menu {
    display: none !important;
  }

  .navbar__hamburger {
    display: flex !important;
  }

  .navbar__cta--desktop {
    display: none !important;
  }

  /* Mobile CTA hanya muncul di mobile menu, bukan di navbar actions */
  .navbar__cta--mobile {
    display: none !important;
  }
}

/* Mobile breakpoint */
@media (max-width: 768px) {
  .navbar__container {
    padding: 0 1rem;
    min-height: 56px;
  }

  .navbar__logo-title {
    font-size: 1.5rem;
  }

  .navbar__logo-subtitle {
    font-size: 0.6rem;
  }

  .navbar {
    padding: 0.5rem 0;
  }

  /* Pastikan hamburger menu muncul di mobile */
  .navbar__hamburger {
    display: flex !important;
  }

  /* Pastikan desktop CTA tersembunyi di mobile */
  .navbar__cta--desktop {
    display: none !important;
  }
}

.navbar__cta:hover::before {
  left: 100%;
}

.navbar__cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
}

.navbar__hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1002;
}

.navbar__cta--desktop {
  display: flex;
}

.navbar__cta--mobile {
  display: none;
}

.navbar__mobile-cta {
  display: none;
}

.navbar__hamburger:hover {
  background: rgba(212, 175, 55, 0.1);
}

.navbar__hamburger span {
  width: 25px;
  height: 3px;
  background: #333;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
  position: relative;
  display: block;
}

.navbar__hamburger--active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
  background: #d4af37;
}

.navbar__hamburger--active span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.navbar__hamburger--active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
  background: #d4af37;
}

.navbar__overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.navbar__overlay--active {
  opacity: 1;
  visibility: visible;
}

/* Overlay hanya muncul di mobile */
@media (min-width: 1025px) {
  .navbar__overlay {
    display: none !important;
  }
}

/* Mobile menu styles - hanya untuk tablet dan mobile */
@media (max-width: 1024px) {
  .navbar__menu {
    position: fixed !important;
    top: 0;
    right: -100%;
    width: 320px;
    height: 100vh;
    background: white;
    flex-direction: column;
    padding: 2rem;
    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1001;
    justify-content: flex-start;
    padding-top: 5rem;
    display: none !important; /* Hidden by default */
  }

  .navbar__menu--active {
    right: 0 !important;
    display: flex !important; /* Show when active */
  }

  .navbar__link {
    width: 100%;
    justify-content: flex-start;
    padding: 1rem 1.5rem;
    margin-bottom: 0.5rem;
    border-radius: 12px;
    font-size: 1rem;
    color: #333;
  }

  .navbar__link-indicator {
    display: none;
  }

  .navbar__mobile-cta {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(212, 175, 55, 0.2);
    display: block;
  }

  .navbar__cta--mobile {
    width: 100%;
    justify-content: center;
    padding: 1rem 2rem;
    font-size: 1rem;
    display: flex !important; /* Force display di mobile menu */
  }
}

/* Small mobile breakpoint */
@media (max-width: 480px) {
  .navbar__container {
    padding: 0 0.75rem;
    min-height: 52px;
  }

  .navbar__logo-title {
    font-size: 1.3rem;
  }

  .navbar__logo-subtitle {
    font-size: 0.55rem;
  }

  .navbar__menu {
    width: 100%;
    right: -100%;
  }

  .navbar {
    padding: 0.4rem 0;
  }
}
</style>
