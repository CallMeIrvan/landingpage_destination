// 🖼️ Konfigurasi Gambar untuk Landing Page Sumba Culture

export const imageConfig = {
  // Hero Section Images
  hero: {
    main: '/images/hero/sumba-landscape-main.jpg',
    fallback:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  },

  // Culture Section Images
  culture: {
    pasola: {
      main: '/images/culture/pasola-ritual.jpg',
      fallback:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    tenun: {
      main: '/images/culture/tenun-ikat.jpg',
      fallback:
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    rumahAdat: {
      main: '/images/culture/rumah-adat.jpg',
      fallback:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    tarian: {
      main: '/images/culture/tarian-tradisional.jpg',
      fallback:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    megalitik: {
      main: '/images/culture/megalitik.jpg',
      fallback:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    upacara: {
      main: '/images/culture/upacara-adat.jpg',
      fallback:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
  },

  // Attractions Section Images
  attractions: {
    walakiri: {
      main: '/images/attractions/pantai-walakiri.jpg',
      fallback:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    ratenggaro: {
      main: '/images/attractions/desa-ratenggaro.jpg',
      fallback:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    lapopu: {
      main: '/images/attractions/air-terjun-lapopu.jpg',
      fallback:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    wairinding: {
      main: '/images/attractions/bukit-wairinding.jpg',
      fallback:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    museum: {
      main: '/images/attractions/museum-sumba.jpg',
      fallback:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
    puruKambera: {
      main: '/images/attractions/pantai-puru-kambera.jpg',
      fallback:
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    },
  },

  // Gallery Section Images
  gallery: {
    generatePaths: (count = 12) => {
      return Array.from({ length: count }, (_, i) => ({
        main: `/images/gallery/gallery-${i + 1}.jpg`,
        fallback:
          'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      }))
    },
  },

  // Testimonials Section Images
  testimonials: {
    generatePaths: (count = 6) => {
      return Array.from({ length: count }, (_, i) => ({
        main: `/images/testimonials/avatar-${i + 1}.jpg`,
        fallback: `https://images.unsplash.com/photo-${1500000000000 + i}?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80`,
      }))
    },
  },
}

// 🛠️ Utility Functions
export const imageUtils = {
  // Handle image error dengan fallback
  handleImageError: (event, fallbackImage) => {
    if (event.target.src !== fallbackImage) {
      event.target.src = fallbackImage
    }
  },

  // Preload images untuk performa yang lebih baik
  preloadImages: (imagePaths) => {
    imagePaths.forEach((path) => {
      const img = new Image()
      img.src = path
    })
  },

  // Generate responsive image srcset
  generateSrcSet: (basePath, sizes = [400, 800, 1200]) => {
    return sizes.map((size) => `${basePath}?w=${size} ${size}w`).join(', ')
  },
}

// 📱 Responsive Image Sizes
export const responsiveSizes = {
  hero: {
    mobile: 800,
    tablet: 1200,
    desktop: 1920,
  },
  culture: {
    mobile: 400,
    tablet: 600,
    desktop: 800,
  },
  attractions: {
    mobile: 400,
    tablet: 600,
    desktop: 800,
  },
  gallery: {
    small: 300,
    medium: 600,
    large: 900,
  },
  testimonials: {
    mobile: 150,
    desktop: 300,
  },
}
