<template>
  <v-app style="background-color: #0f0a30; color:#F1F9FC;">
    <!-- Navbar -->
    <Navbar />
    <v-main>
      <v-container class="mt-12">
        <!-- Hero Section -->
        <v-row>
          <v-col cols="12" md="6" class="d-flex flex-column justify-center">
            <h1 class="display-1">Contemporary Art Festival 2025</h1>
            <p class="subheading mb-4">Explore, get inspired and celebrate creativity.</p>
            <v-btn color="primary" :to="'/workshop'">See workshops</v-btn>
          </v-col>
          <v-col cols="12" md="6">
            <v-img :src="event2" alt="Arte Contemporânea" class="rounded-lg" contain></v-img>
          </v-col>
        </v-row>

        <!-- Carousel Section -->
        <h1 class="display-1" style="color: #F1F9FC;">Main Artists</h1>
        <v-row class="values-section py-12" justify="center" align="center">
          <v-col cols="12" md="4" align="center">
            <v-icon color="primary" large>mdi-palette</v-icon>
            <v-img :src="Patrocinador2" alt="Patrocinador 2" max-width="200" class="mx-4" contain />
          </v-col>
          <v-col cols="12" md="4" align="center">
            <v-icon color="primary" large>mdi-palette</v-icon>
            <v-img :src="Patrocinador1" alt="Patrocinador 1" max-width="200" class="mx-4" contain />
          </v-col> <v-col cols="12" md="4" align="center">
            <v-icon color="primary" large>mdi-palette</v-icon>
            <v-img :src="Patrocinador3" alt="Patrocinador 3" max-width="200" class="mx-4" contain />
          </v-col>
        </v-row>

        <!-- About Section -->
        <v-row class="my-6" align="center">
          <v-col cols="12" md="6">
            <v-img :src="event2" alt="Arte Contemporânea" class="rounded-lg" contain></v-img>
          </v-col>
          <v-col cols="12" md="6" class="d-flex flex-column justify-center">
            <h1 class="display-1"style="color: #F1F9FC;">About the Event</h1>
            <p class="subheading">
              The Contemporary Art Festival brings together renowned and emerging artists
              in a celebration that transcends cultural and aesthetic boundaries.
              Enjoy exhibitions, live performances, workshops and more.
            </p>
            <v-btn color="primary" :to="'/about'">Learn More</v-btn>
          </v-col>

        </v-row>

        <!-- Sponsors Section -->
        <h1 class="display-1"style="color: #F1F9FC;">Support and Sponsors</h1>
        <v-row class="values-section py-12" justify="center" align="center">
          <v-col cols="12" md="4" align="center">
            <v-icon color="primary" large>mdi-palette</v-icon>
            <v-img :src="Patrocinador2" alt="Patrocinador 2" max-width="200" class="mx-4" contain />
          </v-col>
          <v-col cols="12" md="4" align="center">
            <v-icon color="primary" large>mdi-palette</v-icon>
            <v-img :src="Patrocinador1" alt="Patrocinador 1" max-width="200" class="mx-4" contain />
          </v-col> <v-col cols="12" md="4" align="center">
            <v-icon color="primary" large>mdi-palette</v-icon>
            <v-img :src="Patrocinador3" alt="Patrocinador 3" max-width="200" class="mx-4" contain />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- Footer -->
    <Footer />
  </v-app>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import event2 from "@/assets/event2.jpg";
import Patrocinador1 from "@/assets/Sponsors1.png";
import Patrocinador2 from "@/assets/Sponsors2.png";
import Patrocinador3 from "@/assets/Sponsors3.png";


export default {
  name: "Home",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      event2,
      Patrocinador1,
      Patrocinador2,
      Patrocinador3,

    };
  },
};
</script>

<style scoped>
.v-main {
  margin-top: 70px;
}

.v-img {
  border-radius: 10px;
}

.bg-light {
  background-color: #F1F9FC;
}

.text-primary {
 color: #F1F9FC;
}
.values-section {
    text-align: center;
    border-radius: 8px;
    display: flex;
    flex-wrap: nowrap; 
}

</style>
