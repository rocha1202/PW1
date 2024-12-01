<template>
  <div>
    <Navbar />
    <div class="content">
      <Carousel :slideCount="3">
      <!-- First Slide -->
      <div class="slide">
        <div class="image-container">
          <img src="https://via.placeholder.com/600x400" alt="Placeholder Image" />
        </div>
        <div class="content-container">
          <h2>Slide 1 Title</h2>
          <p>Slide 1 description goes here. You can write a longer description to explain the content.</p>
          <button>Learn More</button>
        </div>
      </div>

      <!-- Second Slide -->
      <div class="slide">
        <div class="image-container">
          <img src="https://via.placeholder.com/600x400" alt="Placeholder Image" />
        </div>
        <div class="content-container">
          <h2>Slide 2 Title</h2>
          <p>Slide 2 description goes here. This is where you add unique content for each slide.</p>
          <button>Discover</button>
        </div>
      </div>

      <!-- Third Slide -->
      <div class="slide">
        <div class="image-container">
          <img src="https://via.placeholder.com/600x400" alt="Placeholder Image" />
        </div>
        <div class="content-container">
          <h2>Slide 3 Title</h2>
          <p>Slide 3 description goes here. Make your call-to-action compelling!</p>
          <button>Read More</button>
        </div>
      </div>
    </Carousel>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";

import Carousel from "@/components/Carousel.vue";

export default {
  name: "Museums",
  components: {
    Navbar,
    Footer,
    Carousel,
  },
};
</script>

<style scoped>


.content {
  margin-top: 100px;
}


</style>

 