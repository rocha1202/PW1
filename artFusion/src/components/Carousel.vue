<template>
  <div class="carousel">
    <!-- Wrapper for all slides -->
    <div
      class="carousel-wrapper"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <slot></slot>
    </div>

    <!-- Controls for navigation -->
    <div class="carousel-controls">
      <button @click="prevSlide" :disabled="currentSlide === 0">‹</button>
      <button @click="nextSlide" :disabled="currentSlide === totalSlides - 1">
        ›
      </button>
    </div>

    <!-- Indicators -->
    <div class="carousel-indicators">
      <button
        v-for="(slide, index) in totalSlides"
        :key="index"
        :class="{ active: currentSlide === index }"
        @click="goToSlide(index)"
      ></button>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "Carousel",
  props: {
    slideCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentSlide: 0,
    };
  },
  computed: {
    totalSlides() {
      return this.slideCount;
    },
  },
  methods: {
    nextSlide() {
      if (this.currentSlide < this.totalSlides - 1) {
        this.currentSlide++;
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
    goToSlide(index) {
      this.currentSlide = index;
    },
  },
};
</script>
  
  <style>
.carousel {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.carousel-wrapper {
  display: flex;
  flex-wrap: nowrap;
  transition: transform 0.5s ease-in-out;
  width: 100%;
}

.carousel-wrapper > * {
  flex: 0 0 100%;
  max-width: 100%;
  display: flex; 
}

.carousel-controls {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
}

.carousel-controls button {
  background: #0f0a30;
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
}

.carousel-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel-indicators {
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.carousel-indicators button {
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.carousel-indicators button.active {
  background: rgba(255, 255, 255, 1);
}

.slide {
  display: flex;
  flex-direction: row; 
  width: 100%;
  height: 100%;
}

.image-container {
  flex: 3; /* Left 80% */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
}

.image-container img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.content-container {
  flex: 2; /* Right 20% */
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  background-color: #fff;
}

.content-container h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #0F0A30;
}

.content-container p {
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.5;
  color: #0F0A30;
}

.content-container button {
  padding: 10px 20px;
  background-color: #0F0A30;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.content-container button:hover {
  background-color: #150869FF;
}
</style>
  