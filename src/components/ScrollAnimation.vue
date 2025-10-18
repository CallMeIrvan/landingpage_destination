<template>
  <div
    :class="['scroll-animation', animationClass, { 'scroll-animation--visible': isVisible }]"
    :style="{ '--animation-delay': delay + 'ms' }"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  animation: {
    type: String,
    default: 'fadeInUp',
    validator: (value) =>
      ['fadeInUp', 'fadeInLeft', 'fadeInRight', 'fadeIn', 'scaleIn', 'slideInUp'].includes(value),
  },
  delay: {
    type: Number,
    default: 0,
  },
  threshold: {
    type: Number,
    default: 0.1,
  },
  rootMargin: {
    type: String,
    default: '0px 0px -50px 0px',
  },
})

const isVisible = ref(false)
const animationClass = ref(`scroll-animation--${props.animation}`)

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          // Stop observing after animation triggers
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: props.threshold,
      rootMargin: props.rootMargin,
    },
  )

  observer.observe(document.querySelector(`.scroll-animation--${props.animation}`))
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.scroll-animation {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: var(--animation-delay);
}

.scroll-animation--visible {
  opacity: 1;
  transform: translateY(0);
}

/* Animation Types */
.scroll-animation--fadeInUp {
  opacity: 0;
  transform: translateY(30px);
}

.scroll-animation--fadeInUp.scroll-animation--visible {
  opacity: 1;
  transform: translateY(0);
}

.scroll-animation--fadeInLeft {
  opacity: 0;
  transform: translateX(-30px);
}

.scroll-animation--fadeInLeft.scroll-animation--visible {
  opacity: 1;
  transform: translateX(0);
}

.scroll-animation--fadeInRight {
  opacity: 0;
  transform: translateX(30px);
}

.scroll-animation--fadeInRight.scroll-animation--visible {
  opacity: 1;
  transform: translateX(0);
}

.scroll-animation--fadeIn {
  opacity: 0;
}

.scroll-animation--fadeIn.scroll-animation--visible {
  opacity: 1;
}

.scroll-animation--scaleIn {
  opacity: 0;
  transform: scale(0.8);
}

.scroll-animation--scaleIn.scroll-animation--visible {
  opacity: 1;
  transform: scale(1);
}

.scroll-animation--slideInUp {
  opacity: 0;
  transform: translateY(50px);
}

.scroll-animation--slideInUp.scroll-animation--visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered animations for children */
.scroll-animation--stagger .scroll-animation__child {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.scroll-animation--stagger.scroll-animation--visible .scroll-animation__child {
  opacity: 1;
  transform: translateY(0);
}

.scroll-animation--stagger .scroll-animation__child:nth-child(1) {
  transition-delay: 0.1s;
}
.scroll-animation--stagger .scroll-animation__child:nth-child(2) {
  transition-delay: 0.2s;
}
.scroll-animation--stagger .scroll-animation__child:nth-child(3) {
  transition-delay: 0.3s;
}
.scroll-animation--stagger .scroll-animation__child:nth-child(4) {
  transition-delay: 0.4s;
}
.scroll-animation--stagger .scroll-animation__child:nth-child(5) {
  transition-delay: 0.5s;
}
.scroll-animation--stagger .scroll-animation__child:nth-child(6) {
  transition-delay: 0.6s;
}

/* Performance optimizations */
.scroll-animation {
  will-change: opacity, transform;
}

.scroll-animation--visible {
  will-change: auto;
}
</style>
