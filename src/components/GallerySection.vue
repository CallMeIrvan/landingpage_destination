<template>
  <section id="gallery" class="gallery">
    <div class="gallery__container">
      <ScrollAnimation animation="fadeInUp" :delay="200">
        <div class="gallery__header">
          <h2 class="gallery__title">Galeri Keindahan Sumba</h2>
          <p class="gallery__subtitle">
            Koleksi foto yang menangkap momen-momen indah dari Pulau Sumba
          </p>
        </div>
      </ScrollAnimation>

      <ScrollAnimation animation="fadeInUp" :delay="400">
        <div class="gallery__filter">
          <button
            v-for="category in categories"
            :key="category"
            class="gallery__filter-btn"
            :class="{ 'gallery__filter-btn--active': activeCategory === category }"
            @click="setActiveCategory(category)"
          >
            {{ category }}
          </button>
        </div>
      </ScrollAnimation>

      <ScrollAnimation animation="fadeInUp" :delay="600" class="scroll-animation--stagger">
        <div class="gallery__grid" ref="galleryGrid">
          <div
            v-for="(photo, index) in filteredPhotos"
            :key="photo.id"
            class="gallery__item scroll-animation__child"
            :class="`gallery__item--${photo.size}`"
            @click="openLightbox(index)"
          >
          <div class="gallery__item-image">
            <img :src="photo.thumbnail" :alt="photo.title" loading="lazy" />
            <div class="gallery__item-overlay">
              <div class="gallery__item-info">
                <h3 class="gallery__item-title">{{ photo.title }}</h3>
                <p class="gallery__item-category">{{ photo.category }}</p>
              </div>
              <div class="gallery__item-actions">
                <button class="gallery__item-btn" @click.stop="openLightbox(index)">
                  <font-awesome-icon icon="expand" size="lg" />
                </button>
                <button class="gallery__item-btn" @click.stop="likePhoto(photo.id)">
                  <font-awesome-icon
                    :icon="photo.liked ? 'heart' : ['far', 'heart']"
                    size="lg"
                    :style="{ color: photo.liked ? '#ff4757' : 'currentColor' }"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
      </ScrollAnimation>

      <div class="gallery__load-more">
        <button class="btn btn--primary" @click="loadMorePhotos" v-if="hasMorePhotos">
          <span>Muat Lebih Banyak</span>
          <font-awesome-icon icon="arrow-right" />
        </button>
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="lightboxOpen" class="gallery__lightbox" @click="closeLightbox">
      <div class="gallery__lightbox-content" @click.stop>
        <button class="gallery__lightbox-close" @click="closeLightbox">
          <font-awesome-icon icon="times" size="lg" />
        </button>

        <button
          class="gallery__lightbox-nav gallery__lightbox-nav--prev"
          @click="previousPhoto"
          v-if="currentPhotoIndex > 0"
        >
          <font-awesome-icon icon="chevron-left" size="lg" />
        </button>

        <button
          class="gallery__lightbox-nav gallery__lightbox-nav--next"
          @click="nextPhoto"
          v-if="currentPhotoIndex < filteredPhotos.length - 1"
        >
          <font-awesome-icon icon="chevron-right" size="lg" />
        </button>

        <div class="gallery__lightbox-image">
          <img :src="currentPhoto?.fullSize" :alt="currentPhoto?.title" />
        </div>

        <div class="gallery__lightbox-info">
          <h3 class="gallery__lightbox-title">{{ currentPhoto?.title }}</h3>
          <div class="gallery__lightbox-meta">
            <span class="gallery__lightbox-category">{{ currentPhoto?.category }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ScrollAnimation from './ScrollAnimation.vue'

const activeCategory = ref('Semua')
const lightboxOpen = ref(false)
const currentPhotoIndex = ref(0)
const photosPerPage = 12
const currentPage = ref(1)

const categories = ['Semua', 'Alam', 'Budaya', 'Pantai', 'Tradisi', 'Arsitektur']

const allPhotos = ref([
  {
    id: 1,
    title: 'Sunset di Pantai Walakiri',
    category: 'Pantai',
    thumbnail: '/images/gallery/pantai-walakiri.jpg',
    fullSize: '/images/gallery/pantai-walakiri.jpg',
    size: 'medium',
    liked: false,
  },
  {
    id: 2,
    title: 'Rumah Adat Ratenggaro',
    category: 'Arsitektur',
    thumbnail: '/images/gallery/desa-ratenggaro.jpg',
    fullSize: '/images/gallery/desa-ratenggaro.jpg',
    size: 'medium',
    liked: true,
  },
  {
    id: 3,
    title: 'Tarian Pasola',
    category: 'Tradisi',
    thumbnail: '/images/gallery/pasola-ritual.jpg',
    fullSize: '/images/gallery/pasola-ritual.jpg',
    size: 'medium',
    liked: false,
  },
  {
    id: 4,
    title: 'Tenun Ikat Tradisional',
    category: 'Budaya',
    thumbnail: '/images/gallery/tenun-ikat.jpg',
    fullSize: '/images/gallery/tenun-ikat.jpg',
    size: 'small',
    liked: true,
  },
  {
    id: 5,
    title: 'Kuburan Megalitik',
    category: 'Budaya',
    thumbnail: '/images/gallery/megalitik.jpg',
    fullSize: '/images/gallery/megalitik.jpg',
    size: 'small',
    liked: true,
  },
  {
    id: 6,
    title: 'Upacara Adat',
    category: 'Tradisi',
    thumbnail: '/images/gallery/upacara-adat.jpg',
    fullSize: '/images/gallery/upacara-adat.jpg',
    size: 'small',
    liked: false,
  },
  {
    id: 7,
    title: 'Rumah Adat Sumba',
    category: 'Arsitektur',
    thumbnail: '/images/gallery/rumah-adat.jpg',
    fullSize: '/images/gallery/rumah-adat.jpg',
    size: 'small',
    liked: false,
  },
  {
    id: 8,
    title: 'Tarian Tradisional',
    category: 'Tradisi',
    thumbnail: '/images/gallery/tarian-tradisional.jpg',
    fullSize: '/images/gallery/tarian-tradisional.jpg',
    size: 'medium',
    liked: true,
  },
  {
    id: 9,
    title: 'Air Terjun Lapopu',
    category: 'Alam',
    thumbnail: '/images/gallery/air-terjun-lapopu.jpg',
    fullSize: '/images/gallery/air-terjun-lapopu.jpg',
    size: 'medium',
    liked: false,
  },
  {
    id: 10,
    title: 'Bukit Wairinding',
    category: 'Alam',
    thumbnail: '/images/gallery/bukit-wairinding.jpg',
    fullSize: '/images/gallery/bukit-wairinding.jpg',
    size: 'large',
    liked: true,
  },
  {
    id: 11,
    title: 'Museum Sumba',
    category: 'Budaya',
    thumbnail: '/images/gallery/museum-sumba.jpg',
    fullSize: '/images/gallery/museum-sumba.jpg',
    size: 'medium',
    liked: false,
  },
  {
    id: 12,
    title: 'Pantai Puru Kambera',
    category: 'Pantai',
    thumbnail: '/images/gallery/pantai-puru-kambera.jpg',
    fullSize: '/images/gallery/pantai-puru-kambera.jpg',
    size: 'medium',
    liked: true,
  },
  {
    id: 13,
    title: 'Pantai Walakiri',
    category: 'Pantai',
    thumbnail: '/images/gallery/pantai_walakiri.jpeg',
    fullSize: '/images/gallery/pantai_walakiri.jpeg',
    size: 'large',
    liked: false,
  },
  {
    id: 14,
    title: 'Bukit Piarakuku',
    category: 'Alam',
    thumbnail: '/images/gallery/bukit_piarakuku.jpeg',
    fullSize: '/images/gallery/bukit_piarakuku.jpeg',
    size: 'large',
    liked: false,
  },
])

const filteredPhotos = computed(() => {
  let filtered = allPhotos.value
  if (activeCategory.value !== 'Semua') {
    filtered = filtered.filter((photo) => photo.category === activeCategory.value)
  }
  return filtered.slice(0, currentPage.value * photosPerPage)
})

const hasMorePhotos = computed(() => {
  const totalFiltered =
    activeCategory.value === 'Semua'
      ? allPhotos.value.length
      : allPhotos.value.filter((photo) => photo.category === activeCategory.value).length
  return filteredPhotos.value.length < totalFiltered
})

const currentPhoto = computed(() => {
  return filteredPhotos.value[currentPhotoIndex.value]
})

const setActiveCategory = (category) => {
  activeCategory.value = category
  currentPage.value = 1
}

const loadMorePhotos = () => {
  currentPage.value++
}

const openLightbox = (index) => {
  currentPhotoIndex.value = index
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = 'auto'
}

const previousPhoto = () => {
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--
  }
}

const nextPhoto = () => {
  if (currentPhotoIndex.value < filteredPhotos.value.length - 1) {
    currentPhotoIndex.value++
  }
}

const likePhoto = (photoId) => {
  const photo = allPhotos.value.find((p) => p.id === photoId)
  if (photo) {
    photo.liked = !photo.liked
  }
}

const handleKeydown = (event) => {
  if (lightboxOpen.value) {
    if (event.key === 'Escape') {
      closeLightbox()
    } else if (event.key === 'ArrowLeft') {
      previousPhoto()
    } else if (event.key === 'ArrowRight') {
      nextPhoto()
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.gallery {
  padding: 6rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.gallery__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.gallery__header {
  text-align: center;
  margin-bottom: 3rem;
}

.gallery__title {
  font-family: 'Big Shoulders Stencil', cursive;
  font-size: 3rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 1rem;
  position: relative;
  letter-spacing: 2px;
}

.gallery__title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  border-radius: 2px;
}

.gallery__subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.gallery__filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.gallery__filter-btn {
  padding: 0.8rem 1.5rem;
  border: 2px solid #e9ecef;
  background: white;
  border-radius: 25px;
  font-family: 'Oswald', sans-serif;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.gallery__filter-btn:hover {
  border-color: #d4af37;
  color: #d4af37;
}

.gallery__filter-btn--active {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  border-color: #d4af37;
  color: #333;
}

.gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.gallery__item {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.gallery__item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.gallery__item--small {
  grid-row: span 1;
}

.gallery__item--medium {
  grid-row: span 2;
}

.gallery__item--large {
  grid-row: span 3;
}

.gallery__item-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.gallery__item--medium .gallery__item-image {
  height: 350px;
}

.gallery__item--large .gallery__item-image {
  height: 450px;
}

.gallery__item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.gallery__item:hover .gallery__item-image img {
  transform: scale(1.1);
}

.gallery__item-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gallery__item:hover .gallery__item-overlay {
  opacity: 1;
}

.gallery__item-info {
  color: white;
}

.gallery__item-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
}

.gallery__item-category {
  font-size: 0.9rem;
  color: #d4af37;
  font-weight: 600;
}

.gallery__item-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.gallery__item-btn {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
}

.gallery__item-btn::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: transparent;
  z-index: -1;
}

.gallery__item-btn:hover {
  background: #d4af37;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
}

/* Font Awesome Icons Styling */
.gallery__item-btn .fa-icon,
.gallery__lightbox-close .fa-icon,
.gallery__lightbox-nav .fa-icon,
.btn .fa-icon {
  transition: all 0.3s ease;
  color: inherit;
}

.gallery__item-btn:hover .fa-icon,
.gallery__lightbox-nav:hover .fa-icon,
.btn:hover .fa-icon {
  transform: scale(1.1);
}

.gallery__lightbox-nav:hover .fa-icon {
  transform: scale(1.2);
}

/* Legacy SVG support (if any remaining) */
.gallery__item-btn svg {
  transition: all 0.3s ease;
  color: inherit;
  fill: currentColor;
}

.gallery__item-btn svg path {
  fill: currentColor;
  stroke: currentColor;
}

.gallery__item-btn:hover svg {
  transform: scale(1.1);
}

/* Special styling for like button */
.gallery__item-btn:last-child:hover {
  background: #ff4757;
  color: white;
  box-shadow: 0 6px 20px rgba(255, 71, 87, 0.4);
}

.gallery__item-btn:last-child:hover .fa-icon {
  transform: scale(1.1);
  color: white;
}

/* Zoom button hover effect */
.gallery__item-btn:first-child:hover .fa-icon {
  transform: scale(1.1);
}

.gallery__load-more {
  text-align: center;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
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

.gallery__lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
}

.gallery__lightbox-content {
  position: relative;
  max-width: 1000px;
  max-height: 90vh;
  width: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  display: grid;
  grid-template-columns: 2fr 1fr;
  min-height: 400px;
}

.gallery__lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 1;
  transition: all 0.3s ease;
}

.gallery__lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
}

.gallery__lightbox-nav--prev {
  left: 1rem;
}

.gallery__lightbox-nav--next {
  right: 1rem;
}

.gallery__lightbox-nav:hover {
  background: rgba(212, 175, 55, 0.8);
}

.gallery__lightbox-image {
  height: 100%;
  overflow: hidden;
  border-radius: 16px 0 0 16px;
}

.gallery__lightbox-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery__lightbox-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: auto;
  min-height: auto;
}

.gallery__lightbox-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
  line-height: 1.2;
  flex-shrink: 0;
}

.gallery__lightbox-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  margin-top: 1rem;
  flex-shrink: 0;
}

.gallery__lightbox-category {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #333;
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .gallery__title {
    font-size: 2rem;
  }

  .gallery__grid {
    grid-template-columns: 1fr;
  }

  .gallery__item--medium,
  .gallery__item--large {
    grid-row: span 1;
  }

  .gallery__item-image,
  .gallery__item--medium .gallery__item-image,
  .gallery__item--large .gallery__item-image {
    height: 250px;
  }

  .gallery__lightbox {
    padding: 1rem;
  }

  .gallery__lightbox-content {
    max-width: 100%;
    border-radius: 12px;
    grid-template-columns: 1fr;
    min-height: auto;
    max-height: 95vh;
  }

  .gallery__lightbox-image {
    height: 60vh;
    border-radius: 12px 12px 0 0;
  }

  .gallery__lightbox-info {
    padding: 1rem;
    height: auto;
  }

  .gallery__lightbox-title {
    font-size: 1.5rem;
  }

  .gallery__lightbox-nav {
    display: none;
  }

  .gallery__lightbox-close {
    top: 1rem;
    right: 1rem;
  }
}
</style>
