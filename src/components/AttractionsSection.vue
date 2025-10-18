<template>
  <section id="attractions" class="attractions">
    <div class="attractions__container">
      <ScrollAnimation animation="fadeInUp" :delay="200">
        <div class="attractions__header">
          <h2 class="attractions__title">Destinasi Wisata Unggulan</h2>
          <p class="attractions__subtitle">
            Temukan keindahan alam dan keunikan budaya di setiap sudut Pulau Sumba
          </p>
        </div>
      </ScrollAnimation>

      <div class="attractions__filter">
        <button
          v-for="category in categories"
          :key="category"
          class="attractions__filter-btn"
          :class="{ 'attractions__filter-btn--active': activeCategory === category }"
          @click="setActiveCategory(category)"
        >
          {{ category }}
        </button>
      </div>

      <div class="attractions__grid">
        <div
          v-for="attraction in filteredAttractions"
          :key="attraction.id"
          class="attractions__card"
          @click="openModal(attraction)"
        >
          <div class="attractions__card-image">
            <img :src="attraction.image" :alt="attraction.name" />
            <div class="attractions__card-overlay">
              <div class="attractions__card-rating">
                <font-awesome-icon icon="star" />
                <span>{{ attraction.rating }}</span>
              </div>
              <div class="attractions__card-category">
                {{ attraction.category }}
              </div>
            </div>
          </div>
          <div class="attractions__card-content">
            <h3 class="attractions__card-name">{{ attraction.name }}</h3>
            <p class="attractions__card-location">
              <font-awesome-icon icon="map-marker-alt" />
              {{ attraction.location }}
            </p>
            <p class="attractions__card-description">{{ attraction.description }}</p>
            <div class="attractions__card-features">
              <span
                v-for="feature in attraction.features"
                :key="feature"
                class="attractions__feature"
              >
                {{ feature }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="selectedAttraction" class="attractions__modal" @click="closeModal">
      <div class="attractions__modal-content" @click.stop>
        <button class="attractions__modal-close" @click="closeModal">
          <font-awesome-icon icon="times" size="lg" />
        </button>
        <div class="attractions__modal-body">
          <div class="attractions__modal-image">
            <img :src="selectedAttraction.image" :alt="selectedAttraction.name" />
          </div>
          <div class="attractions__modal-info">
            <div class="attractions__modal-header">
              <h3 class="attractions__modal-name">{{ selectedAttraction.name }}</h3>
              <div class="attractions__modal-rating">
                <font-awesome-icon icon="star" />
                <span>{{ selectedAttraction.rating }}</span>
              </div>
            </div>
            <p class="attractions__modal-location">
              <font-awesome-icon icon="map-marker-alt" />
              {{ selectedAttraction.location }}
            </p>
            <p class="attractions__modal-description">{{ selectedAttraction.fullDescription }}</p>
            <div class="attractions__modal-features">
              <h4>Fasilitas & Aktivitas:</h4>
              <div class="attractions__modal-features-grid">
                <span
                  v-for="feature in selectedAttraction.features"
                  :key="feature"
                  class="attractions__modal-feature"
                >
                  {{ feature }}
                </span>
              </div>
            </div>
            <div class="attractions__modal-actions">
              <button class="btn btn--primary" @click="bookNow(selectedAttraction)">
                <span>Pesan Sekarang</span>
                <font-awesome-icon icon="arrow-right" />
              </button>
              <button class="btn btn--secondary" @click="shareAttraction(selectedAttraction)">
                <span>Bagikan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import ScrollAnimation from './ScrollAnimation.vue'

const activeCategory = ref('Semua')
const selectedAttraction = ref(null)

const categories = ['Semua', 'Alam', 'Budaya', 'Pantai', 'Sejarah']

const attractions = ref([
  {
    id: 1,
    name: 'Pantai Walakiri',
    location: 'Sumba Timur',
    category: 'Pantai',
    rating: 4.8,
    image: '/images/attractions/pantai-walakiri.jpg',
    description: 'Pantai dengan pohon bakau yang unik dan sunset yang memukau',
    fullDescription:
      'Pantai Walakiri terkenal dengan pohon bakau yang tumbuh di tengah laut, menciptakan pemandangan yang sangat unik. Saat air surut, Anda bisa berjalan di antara pohon-pohon bakau ini sambil menikmati sunset yang spektakuler. Pantai ini juga menjadi habitat berbagai jenis burung dan biota laut.',
    features: ['Sunset View', 'Mangrove Forest', 'Bird Watching', 'Photography Spot'],
  },
  {
    id: 2,
    name: 'Desa Adat Ratenggaro',
    location: 'Sumba Barat Daya',
    category: 'Budaya',
    rating: 4.9,
    image: '/images/attractions/desa-ratenggaro.jpg',
    description: 'Desa tradisional dengan rumah adat dan budaya yang masih terjaga',
    fullDescription:
      'Desa Ratenggaro adalah salah satu desa adat terbaik di Sumba yang masih mempertahankan arsitektur tradisional dan budaya asli. Di sini Anda bisa melihat rumah-rumah adat dengan atap menjulang tinggi, kuburan megalitik, dan menyaksikan kehidupan sehari-hari masyarakat yang masih memegang teguh tradisi leluhur.',
    features: ['Traditional Houses', 'Megalithic Tombs', 'Cultural Experience', 'Local Crafts'],
  },
  {
    id: 3,
    name: 'Air Terjun Lapopu',
    location: 'Sumba Tengah',
    category: 'Alam',
    rating: 4.7,
    image: '/images/attractions/air-terjun-lapopu.jpg',
    description: 'Air terjun tersembunyi di tengah hutan yang masih perawan',
    fullDescription:
      'Air Terjun Lapopu adalah air terjun yang tersembunyi di tengah hutan Sumba Tengah. Untuk mencapainya, Anda harus trekking melalui hutan yang masih perawan selama sekitar 2 jam. Air terjun ini memiliki ketinggian sekitar 50 meter dan dikelilingi oleh vegetasi tropis yang lebat.',
    features: ['Trekking', 'Swimming', 'Nature Photography', 'Forest Adventure'],
  },
  {
    id: 4,
    name: 'Bukit Wairinding',
    location: 'Sumba Timur',
    category: 'Alam',
    rating: 4.6,
    image: '/images/attractions/bukit-wairinding.jpg',
    description: 'Bukit dengan pemandangan 360 derajat yang menakjubkan',
    fullDescription:
      'Bukit Wairinding menawarkan pemandangan 360 derajat yang menakjubkan dari ketinggian. Dari sini Anda bisa melihat hamparan sawah, pantai, dan lautan yang membentang luas. Tempat ini sangat populer untuk menikmati sunrise dan sunset dengan pemandangan yang spektakuler.',
    features: ['Panoramic View', 'Sunrise/Sunset', 'Photography', 'Hiking'],
  },
  {
    id: 5,
    name: 'Museum Sumba',
    location: 'Waingapu',
    category: 'Sejarah',
    rating: 4.5,
    image: '/images/attractions/museum-sumba.jpg',
    description: 'Museum yang menyimpan koleksi artefak dan sejarah Sumba',
    fullDescription:
      'Museum Sumba di Waingapu menyimpan koleksi lengkap artefak, tenun tradisional, dan benda-benda bersejarah dari berbagai daerah di Sumba. Museum ini memberikan gambaran komprehensif tentang sejarah, budaya, dan peradaban Sumba dari masa lampau hingga sekarang.',
    features: ['Historical Artifacts', 'Traditional Textiles', 'Cultural Education', 'Guided Tour'],
  },
  {
    id: 6,
    name: 'Pantai Puru Kambera',
    location: 'Sumba Timur',
    category: 'Pantai',
    rating: 4.8,
    image: '/images/attractions/pantai-puru-kambera.jpg',
    description: 'Pantai dengan bukit pasir yang unik dan ombak yang sempurna',
    fullDescription:
      'Pantai Puru Kambera terkenal dengan bukit-bukit pasir yang unik dan ombak yang sempurna untuk surfing. Pantai ini memiliki pemandangan yang sangat indah dengan kontras antara pasir putih, laut biru, dan bukit-bukit pasir yang membentuk formasi unik.',
    features: ['Sand Dunes', 'Surfing', 'Beach Activities', 'Unique Landscape'],
  },
])

const filteredAttractions = computed(() => {
  if (activeCategory.value === 'Semua') {
    return attractions.value
  }
  return attractions.value.filter((attraction) => attraction.category === activeCategory.value)
})

const setActiveCategory = (category) => {
  activeCategory.value = category
}

const openModal = (attraction) => {
  selectedAttraction.value = attraction
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedAttraction.value = null
  document.body.style.overflow = 'auto'
}

const bookNow = (attraction) => {
  window.dispatchEvent(
    new CustomEvent('app-alert', {
      detail: { color: 'info', text: `Booking untuk ${attraction.name} akan segera tersedia!` },
    }),
  )
}

const shareAttraction = (attraction) => {
  if (navigator.share) {
    navigator.share({
      title: attraction.name,
      text: attraction.description,
      url: window.location.href,
    })
  } else {
    // Fallback untuk browser yang tidak mendukung Web Share API
    navigator.clipboard.writeText(`${attraction.name} - ${attraction.description}`)
    window.dispatchEvent(
      new CustomEvent('app-alert', {
        detail: { color: 'primary', text: 'Link telah disalin ke clipboard!' },
      }),
    )
  }
}
</script>

<style scoped>
.attractions {
  padding: 6rem 0;
  background: white;
}

.attractions__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.attractions__header {
  text-align: center;
  margin-bottom: 3rem;
}

.attractions__title {
  font-family: 'Big Shoulders Stencil', cursive;
  font-size: 3rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 1rem;
  position: relative;
  letter-spacing: 2px;
}

.attractions__title::after {
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

.attractions__subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.attractions__filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.attractions__filter-btn {
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

.attractions__filter-btn:hover {
  border-color: #d4af37;
  color: #d4af37;
}

.attractions__filter-btn--active {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  border-color: #d4af37;
  color: #333;
}

.attractions__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.attractions__card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.attractions__card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.attractions__card-image {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.attractions__card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.attractions__card:hover .attractions__card-image img {
  transform: scale(1.1);
}

.attractions__card-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.attractions__card-rating {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  font-weight: 600;
}

.attractions__card-category {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #333;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
}

.attractions__card-content {
  padding: 2rem;
}

.attractions__card-name {
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
}

.attractions__card-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.attractions__card-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.attractions__card-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.attractions__feature {
  background: #f8f9fa;
  color: #666;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.attractions__modal {
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

.attractions__modal-content {
  background: white;
  border-radius: 16px;
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.attractions__modal-close {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
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

.attractions__modal-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  min-height: 500px;
}

.attractions__modal-image {
  height: 100%;
  overflow: hidden;
  border-radius: 16px 0 0 16px;
}

.attractions__modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.attractions__modal-info {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.attractions__modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-shrink: 0;
}

.attractions__modal-name {
  font-family: 'Oswald', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  line-height: 1.2;
  margin-right: 1rem;
  letter-spacing: 0.5px;
}

.attractions__modal-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f8f9fa;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  color: #d4af37;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.attractions__modal-location {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  margin-bottom: 1.5rem;
  flex-shrink: 0;
}

.attractions__modal-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
  flex: 1;
}

.attractions__modal-features h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  flex-shrink: 0;
}

.attractions__modal-features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-shrink: 0;
}

.attractions__modal-feature {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #333;
  padding: 0.6rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.attractions__modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: auto;
  flex-shrink: 0;
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
  letter-spacing: 0.5px;
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
  color: #666;
  border: 2px solid #e9ecef;
}

.btn--secondary:hover {
  background: #f8f9fa;
  border-color: #d4af37;
  color: #d4af37;
}

@media (max-width: 768px) {
  .attractions__title {
    font-size: 2rem;
  }

  .attractions__grid {
    grid-template-columns: 1fr;
  }

  .attractions__modal {
    padding: 1rem;
  }

  .attractions__modal-content {
    max-width: 100%;
    border-radius: 12px;
  }

  .attractions__modal-body {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .attractions__modal-image {
    height: 250px;
    border-radius: 12px 12px 0 0;
  }

  .attractions__modal-info {
    padding: 1.5rem;
  }

  .attractions__modal-name {
    font-size: 1.5rem;
  }

  .attractions__modal-features-grid {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .attractions__modal-actions {
    flex-direction: column;
    gap: 0.75rem;
  }

  .attractions__modal-close {
    top: 1rem;
    left: 1rem;
  }
}

/* Font Awesome Icons Styling */
.attractions__card-rating .fa-icon,
.attractions__card-location .fa-icon,
.attractions__modal-close .fa-icon,
.attractions__modal-rating .fa-icon,
.attractions__modal-location .fa-icon,
.btn .fa-icon {
  transition: all 0.3s ease;
  color: inherit;
}

.attractions__card-rating .fa-icon,
.attractions__modal-rating .fa-icon {
  color: #ffd700;
}

.attractions__card-location .fa-icon,
.attractions__modal-location .fa-icon {
  color: #666;
}

.attractions__modal-close:hover .fa-icon,
.btn:hover .fa-icon {
  transform: scale(1.1);
}
</style>
