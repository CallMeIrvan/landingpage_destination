<template>
  <section id="testimonials" class="testimonials">
    <div class="testimonials__container">
      <div class="testimonials__header">
        <h2 class="testimonials__title">Kata Mereka Tentang Sumba</h2>
        <p class="testimonials__subtitle">
          Pengalaman dan kesan mendalam dari para wisatawan yang telah mengunjungi Pulau Sumba
        </p>
      </div>

      <div class="testimonials__slider" ref="slider">
        <div
          class="testimonials__track"
          :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
        >
          <div
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="testimonials__slide"
          >
            <div class="testimonials__card">
              <div class="testimonials__card-header">
                <div class="testimonials__avatar">
                  <img
                    :src="testimonial.avatar"
                    :alt="testimonial.name"
                    @error="handleAvatarError"
                  />
                </div>
                <div class="testimonials__info">
                  <h3 class="testimonials__name">{{ testimonial.name }}</h3>
                  <p class="testimonials__location">{{ testimonial.location }}</p>
                  <div class="testimonials__rating">
                    <font-awesome-icon
                      v-for="star in 5"
                      :key="star"
                      icon="star"
                      :class="{ 'testimonials__star--filled': star <= testimonial.rating }"
                    />
                  </div>
                </div>
              </div>
              <div class="testimonials__content">
                <p class="testimonials__text">"{{ testimonial.text }}"</p>
                <div class="testimonials__tags">
                  <span v-for="tag in testimonial.tags" :key="tag" class="testimonials__tag">
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="testimonials__controls">
        <button
          class="testimonials__btn testimonials__btn--prev"
          @click="previousSlide"
          :disabled="currentSlide === 0"
        >
          <font-awesome-icon icon="chevron-left" />
        </button>

        <div class="testimonials__dots">
          <button
            v-for="(_, index) in testimonials"
            :key="index"
            class="testimonials__dot"
            :class="{ 'testimonials__dot--active': currentSlide === index }"
            @click="goToSlide(index)"
          ></button>
        </div>

        <button
          class="testimonials__btn testimonials__btn--next"
          @click="nextSlide"
          :disabled="currentSlide === testimonials.length - 1"
        >
          <font-awesome-icon icon="chevron-right" />
        </button>
      </div>

      <div class="testimonials__stats">
        <div class="testimonials__stat">
          <h3>4.9</h3>
          <p>Rating Rata-rata</p>
        </div>
        <div class="testimonials__stat">
          <h3>1000+</h3>
          <p>Wisatawan Puas</p>
        </div>
        <div class="testimonials__stat">
          <h3>98%</h3>
          <p>Rekomendasi</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
const slider = ref(null)
let autoSlideInterval = null

const testimonials = ref([
  {
    name: 'Sarah Johnson',
    location: 'Melbourne, Australia',
    avatar: '/images/testimonials/avatar-1.jpg',
    rating: 5,
    text: 'Pengalaman yang tak terlupakan! Budaya Sumba yang autentik dan keindahan alamnya benar-benar memukau. Pasola adalah pertunjukan yang luar biasa, dan keramahan penduduk lokal membuat perjalanan ini semakin berkesan.',
    tags: ['Budaya Autentik', 'Pasola', 'Keramahan Lokal'],
  },
  {
    name: 'Michael Chen',
    location: 'Singapore',
    avatar: '/images/testimonials/avatar-2.jpg',
    rating: 5,
    text: 'Sumba adalah surga tersembunyi yang wajib dikunjungi! Pantai Walakiri dengan pohon bakau-nya sangat unik, dan desa adat Ratenggaro memberikan gambaran kehidupan tradisional yang masih terjaga. Highly recommended!',
    tags: ['Pantai Unik', 'Desa Adat', 'Surga Tersembunyi'],
  },
  {
    name: 'Emma Williams',
    location: 'London, UK',
    avatar: '/images/testimonials/avatar-3.jpg',
    rating: 5,
    text: 'Sebagai fotografer, Sumba memberikan begitu banyak momen indah untuk diabadikan. Dari sunrise di Bukit Wairinding hingga ritual tradisional, setiap sudut memiliki cerita yang menarik. Tenun ikat-nya juga sangat cantik!',
    tags: ['Fotografi', 'Sunrise', 'Tenun Ikat'],
  },
  {
    name: 'David Rodriguez',
    location: 'Barcelona, Spain',
    avatar: '/images/testimonials/avatar-4.jpg',
    rating: 4,
    text: 'Perjalanan ke Sumba membuka mata saya tentang kekayaan budaya Indonesia. Arsitektur rumah adat yang unik dan situs megalitik yang misterius membuat saya terpesona. Pasti akan kembali lagi!',
    tags: ['Arsitektur Unik', 'Megalitik', 'Budaya Indonesia'],
  },
  {
    name: 'Lisa Anderson',
    location: 'New York, USA',
    avatar: '/images/testimonials/avatar-5.jpg',
    rating: 5,
    text: 'Sumba memberikan pengalaman wisata yang berbeda dari tempat lain. Kehidupan yang masih tradisional, alam yang masih perawan, dan masyarakat yang sangat ramah. Ini adalah perjalanan yang mengubah perspektif hidup saya.',
    tags: ['Kehidupan Tradisional', 'Alam Perawan', 'Mengubah Perspektif'],
  },
  {
    name: 'Ahmed Hassan',
    location: 'Dubai, UAE',
    avatar: '/images/testimonials/avatar-6.jpg',
    rating: 5,
    text: 'Sebagai traveler yang sudah mengunjungi banyak tempat, Sumba tetap menjadi yang terbaik. Air terjun Lapopu yang tersembunyi dan pantai-pantai yang masih alami memberikan kedamaian yang sulit ditemukan di tempat lain.',
    tags: ['Air Terjun', 'Pantai Alami', 'Kedamaian'],
  },
])

const nextSlide = () => {
  if (currentSlide.value < testimonials.value.length - 1) {
    currentSlide.value++
  } else {
    currentSlide.value = 0
  }
}

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  } else {
    currentSlide.value = testimonials.value.length - 1
  }
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 5000)
}

const stopAutoSlide = () => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
    autoSlideInterval = null
  }
}

onMounted(() => {
  startAutoSlide()
})

onUnmounted(() => {
  stopAutoSlide()
})

const handleAvatarError = (event) => {
  // Fallback ke gambar online jika gambar lokal tidak ditemukan
  const fallbackImages = [
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
  ]

  // Ambil index dari src untuk menentukan fallback yang sesuai
  const currentSrc = event.target.src
  const avatarIndex = currentSrc.match(/avatar-(\d+)\.jpg/)
  if (avatarIndex) {
    const index = parseInt(avatarIndex[1]) - 1
    if (fallbackImages[index]) {
      event.target.src = fallbackImages[index]
    }
  }
}
</script>

<style scoped>
.testimonials {
  padding: 6rem 0;
  background: white;
}

.testimonials__container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.testimonials__header {
  text-align: center;
  margin-bottom: 4rem;
}

.testimonials__title {
  font-family: 'Big Shoulders Stencil', cursive;
  font-size: 3rem;
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 1rem;
  position: relative;
  letter-spacing: 2px;
}

.testimonials__title::after {
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

.testimonials__subtitle {
  font-size: 1.2rem;
  color: #34495e;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

.testimonials__slider {
  position: relative;
  overflow: hidden;
  margin-bottom: 3rem;
}

.testimonials__track {
  display: flex;
  transition: transform 0.5s ease;
}

.testimonials__slide {
  min-width: 100%;
  padding: 0 1rem;
}

.testimonials__card {
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid #f0f0f0;
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.testimonials__card::before {
  content: '"';
  position: absolute;
  top: -10px;
  left: 30px;
  font-size: 6rem;
  color: #d4af37;
  font-family: serif;
  line-height: 1;
}

.testimonials__card-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.testimonials__avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #d4af37;
  flex-shrink: 0;
}

.testimonials__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonials__info {
  flex: 1;
}

.testimonials__name {
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
}

.testimonials__location {
  color: #5a6c7d;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.testimonials__rating {
  display: flex;
  gap: 0.2rem;
}

.testimonials__rating .fa-icon {
  font-size: 16px;
  transition: all 0.3s ease;
}

.testimonials__star--filled {
  color: #d4af37;
}

.testimonials__star:not(.testimonials__star--filled) {
  color: #e0e0e0;
}

.testimonials__content {
  margin-left: 95px;
}

.testimonials__text {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #34495e;
  margin-bottom: 2rem;
  font-style: italic;
}

.testimonials__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.testimonials__tag {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  color: #2c3e50;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.testimonials__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 4rem;
}

.testimonials__btn {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
}

.testimonials__btn .fa-icon {
  font-size: 18px;
  transition: all 0.3s ease;
}

.testimonials__btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
}

.testimonials__btn:hover:not(:disabled) .fa-icon {
  transform: scale(1.1);
}

.testimonials__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.testimonials__dots {
  display: flex;
  gap: 0.5rem;
}

.testimonials__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
}

.testimonials__dot--active {
  background: linear-gradient(135deg, #d4af37 0%, #f4e4bc 100%);
  transform: scale(1.2);
}

.testimonials__stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  text-align: center;
}

.testimonials__stat {
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 20px;
  border: 1px solid #e0e0e0;
}

.testimonials__stat h3 {
  font-family: 'Big Shoulders Stencil', cursive;
  font-size: 3rem;
  font-weight: 800;
  color: #d4af37;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}

.testimonials__stat p {
  font-size: 1.1rem;
  color: #5a6c7d;
  font-weight: 600;
}

@media (max-width: 768px) {
  .testimonials__title {
    font-size: 2rem;
  }

  .testimonials__card {
    padding: 2rem;
  }

  .testimonials__card-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .testimonials__content {
    margin-left: 0;
  }

  .testimonials__card::before {
    left: 50%;
    transform: translateX(-50%);
  }

  .testimonials__stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .testimonials__stat h3 {
    font-size: 2rem;
  }
}
</style>
