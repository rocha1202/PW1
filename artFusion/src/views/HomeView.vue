<template>
  <div>
    <!-- Navbar -->
    <Navbar />
    <div class="content">

      <!-- Hero Section -->
      <div class="hero">
        <div class="hero-text">
          <h1>Contemporary Art Festival 2025</h1>
          <p>Explore, get inspired and celebrate creativity.</p>
          <button @click="navigateTo('program')">See workshops</button>
        </div>
        <div class="hero-image">
          <img src="https://via.placeholder.com/600x400" alt="Arte Contemporânea" />
        </div>
      </div>

      <!-- Carousel Section -->
      <div class="carousel-section">
        <h1>Principais Artistas</h1>
        <div class="sponsors-logos">
          <img src="../assets/Sponsors2.png" alt="Patrocinador 2" />
          <img src="../assets/Sponsors1.png" alt="Patrocinador 1" />
          <img src="../assets/Sponsors3.png" alt="Patrocinador 3" />
        </div>
      </div>

      <!-- About Section -->
      <div class="about-section">
        <div class="about-content">
          <h1>About the Event</h1>
          <p>
            The Contemporary Art Festival brings together renowned and emerging artists
            in a celebration that transcends cultural and aesthetic boundaries.
            Enjoy exhibitions, live performances, workshops and more.
          </p>
          <button @click="navigateTo('about')">Learn More</button>
        </div>
        <div class="about-image">
          <img src="https://via.placeholder.com/600x400" alt="Sobre o Festival" />
        </div>
      </div>


      <!-- Sponsors Section -->
      <div class="sponsors-section">
        <h1>Support and Sponsors</h1>
        <div class="sponsors-logos">
          <img src="../assets/Sponsors2.png" alt="Patrocinador 2" />
          <img src="../assets/Sponsors1.png" alt="Patrocinador 1" />
          <img src="../assets/Sponsors3.png" alt="Patrocinador 3" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import Carousel from "@/components/Carousel.vue";
import AllPrograms from "@/components/allPrograms.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    AllPrograms,
    Carousel,
    Footer,
  },
  methods: {
    navigateTo(section) {
      // Função de navegação para rolar até uma seção específica
      const element = document.getElementById(section);
      element.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
/* Estilo Geral */
body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
}

.content {
  margin-top: 100px;
  margin-bottom:10px;
}

.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 60px 80px;
}


.hero-text p {
  margin: 20px 0;
}

.hero-text button {
  padding: 10px 20px;
  background-color: #F1F9FC;
  color: #0F0A30;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1rem;
}

.hero-image img {
  max-width: 500px;
  border-radius: 10px;
}

/* Carousel Section */
.carousel-section {
  background-color: #fff;
  padding: 40px 80px;
  text-align: center;
}

.carousel-section h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #222;
}

/* About Section */
.about-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 60px 80px;
}

.about-content h1 {
  font-size: 2.5rem;
  color: #F1F9FC;
}

.about-content p {
  margin: 20px 0;
  line-height: 1.6;
  font-size: 1.2rem;
}

.about-content button {
  padding: 10px 20px;
  background-color: #F1F9FC;
  color: #0F0A30;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.about-image img {
  max-width: 400px;
  border-radius: 10px;
}


/* Sponsors Section */
.sponsors-section {
  background-color: #F1F9FC;
  padding: 40px 80px;
  text-align: center;
}

.sponsors-section h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #0F0A30
}

.sponsors-logos {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.sponsors-logos img {
  max-width: 200px;
  opacity: 0.8;
}

.sponsors-logos img:hover {
  opacity: 1;
}

/* Footer */
footer {
  background-color: #0F0A30;
  color: #F1F9FC;
  text-align: center;
  padding: 20px;
}
</style>
