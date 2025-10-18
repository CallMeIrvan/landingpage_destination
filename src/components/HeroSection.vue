<template>
  <section id="home" class="hero">
    <div class="hero__background">
      <div class="hero__overlay"></div>
      <div class="hero__video-container">
        <!-- Video background dengan fallback ke gambar -->
        <video
          ref="heroVideo"
          class="hero__bg-video"
          :poster="videoPoster"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
          @loadeddata="onVideoLoaded"
          @error="onVideoError"
          @canplay="onVideoCanPlay"
        >
          <source :src="videoSrc" type="video/mp4" />
          <!-- Fallback ke gambar jika video tidak didukung -->
          <img
            src="/images/hero/sumba-landscape-main.jpg"
            alt="Landscape Sumba yang menawan"
            class="hero__bg-image"
            @error="handleImageError"
          />
        </video>

        <!-- Fallback image yang akan ditampilkan jika video gagal load -->
        <img
          v-if="showFallbackImage"
          src="/images/hero/sumba-landscape-main.jpg"
          alt="Landscape Sumba yang menawan"
          class="hero__bg-image"
          @error="handleImageError"
        />
      </div>
    </div>

    <div class="hero__content">
      <div class="hero__container">
        <ScrollAnimation animation="fadeInUp" :delay="200">
          <div class="hero__text">
            <h1 class="hero__title">
              <span class="hero__title--main">Pulau Sumba</span>
              <span class="hero__title--sub">Keindahan Budaya yang Tak Ternilai</span>
            </h1>
            <p class="hero__description">
              Temukan keajaiban budaya tradisional, keindahan alam yang memukau, dan warisan leluhur
              yang masih terjaga di Pulau Sumba. Pengalaman wisata yang tak terlupakan menanti Anda.
            </p>
            <div class="hero__buttons">
              <button class="btn btn--primary" @click="scrollToSection('culture')">
                <span>Jelajahi Budaya</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <button class="btn btn--secondary" @click="scrollToSection('gallery')">
                <span>Lihat Galeri</span>
              </button>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fadeInUp" :delay="600">
          <div class="hero__stats">
            <div class="hero__stat">
              <h3>500+</h3>
              <p>Tahun Tradisi</p>
            </div>
            <div class="hero__stat">
              <h3>50+</h3>
              <p>Desa Adat</p>
            </div>
            <div class="hero__stat">
              <h3>1000+</h3>
              <p>Pengunjung Puas</p>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>

    <!-- Video Controls -->
    <div class="hero__video-controls" v-if="!showFallbackImage">
      <button
        class="hero__control-btn"
        @click="toggleVideoPlay"
        :title="isVideoPlaying ? 'Pause Video' : 'Play Video'"
      >
        <svg v-if="!isVideoPlaying" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
        </svg>
      </button>

      <button
        class="hero__control-btn"
        @click="toggleVideoMute"
        :title="isVideoMuted ? 'Unmute Video' : 'Mute Video'"
      >
        <svg v-if="isVideoMuted" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
          />
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
          />
        </svg>
      </button>
    </div>

    <div class="hero__scroll-indicator">
      <div class="hero__scroll-arrow" @click="scrollToSection('culture')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 13L12 18L17 13M7 6L12 11L17 6"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ScrollAnimation from './ScrollAnimation.vue'

// Video configuration
const videoSrc = ref('/images/hero/sumba-landscape-main.mp4') // Video yang sudah ada
const videoPoster = ref('/images/hero/sumba-landscape-main.jpg')
const heroVideo = ref(null)
const showFallbackImage = ref(false)
const imageError = ref(false)
const isVideoPlaying = ref(false)
const isVideoMuted = ref(true)

// Video control methods
const toggleVideoPlay = () => {
  if (heroVideo.value) {
    if (heroVideo.value.paused) {
      heroVideo.value.play()
      isVideoPlaying.value = true
    } else {
      heroVideo.value.pause()
      isVideoPlaying.value = false
    }
  }
}

const toggleVideoMute = () => {
  if (heroVideo.value) {
    // Untuk hero video, kita selalu tetap muted
    // Tombol ini hanya untuk menunjukkan status
    heroVideo.value.muted = true
    isVideoMuted.value = true
    console.log('Video tetap muted untuk pengalaman yang optimal')
  }
}

// Video event handlers
const onVideoLoaded = () => {
  console.log('Video loaded successfully')
  showFallbackImage.value = false
  isVideoPlaying.value = true
}

const onVideoCanPlay = () => {
  // Pastikan video selalu muted dan mulai play
  if (heroVideo.value) {
    heroVideo.value.muted = true
    heroVideo.value.play().catch((error) => {
      console.log('Autoplay prevented:', error)
      // Jika autoplay diblokir browser, tetap tampilkan video
      showFallbackImage.value = false
    })
  }
}

const onVideoError = (event) => {
  console.error('Video failed to load:', event)
  showFallbackImage.value = true
  isVideoPlaying.value = false
}

const handleImageError = (event) => {
  // Fallback ke gambar online jika gambar lokal tidak ditemukan
  event.target.src =
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  imageError.value = true
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Lifecycle hooks
onMounted(() => {
  // Pause video when page is not visible (untuk menghemat bandwidth)
  const handleVisibilityChange = () => {
    if (heroVideo.value) {
      if (document.hidden) {
        heroVideo.value.pause()
      } else if (!showFallbackImage.value) {
        heroVideo.value.play()
      }
    }
  }

  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%);
  z-index: 2;
}

.hero__video-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.hero__bg-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: opacity 0.3s ease;
}

.hero__bg-video:not([poster]) {
  opacity: 0;
}

.hero__bg-video[poster] {
  opacity: 1;
}

.hero__bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero__content {
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.hero__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero__text {
  color: white;
}

.hero__title {
  margin-bottom: 1.5rem;
}

.hero__title--main {
  display: block;
  font-family: 'Big Shoulders Stencil', cursive;
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
}

.hero__title--sub {
  display: block;
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  font-weight: 300;
  color: #f4e4bc;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  letter-spacing: 1px;
}

.hero__description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  color: #e8e8e8;
  max-width: 500px;
}

.hero__buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.btn--primary {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #333;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
}

.btn--secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn--secondary:hover {
  background: white;
  color: #333;
  transform: translateY(-2px);
}

.hero__stats {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.hero__stat {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.hero__stat h3 {
  font-family: 'Big Shoulders Stencil', cursive;
  font-size: 2.5rem;
  font-weight: 800;
  color: #d4af37;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.hero__stat p {
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  color: #e8e8e8;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.hero__video-controls {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 4;
  display: flex;
  gap: 0.5rem;
}

.hero__control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.hero__control-btn:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: scale(1.05);
}

.hero__control-btn:active {
  transform: scale(0.95);
}

.hero__scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}

.hero__scroll-arrow {
  color: white;
  cursor: pointer;
  animation: bounce 2s infinite;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.hero__scroll-arrow:hover {
  opacity: 1;
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@media (max-width: 768px) {
  .hero__container {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero__title--main {
    font-size: 2.5rem;
  }

  .hero__title--sub {
    font-size: 1.2rem;
  }

  .hero__description {
    font-size: 1rem;
  }

  .hero__buttons {
    justify-content: center;
  }

  .hero__stats {
    flex-direction: row;
    justify-content: space-around;
  }

  .hero__stat {
    padding: 1rem;
  }

  .hero__stat h3 {
    font-size: 1.8rem;
  }

  .hero__video-controls {
    top: 1rem;
    right: 1rem;
  }

  .hero__control-btn {
    width: 40px;
    height: 40px;
  }
}
</style>
