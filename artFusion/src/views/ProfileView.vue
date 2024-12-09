<template>
    <div>
        <Navbar />
        <br>
      <br>
      <br>
      <br>
      <h1>Profile Thing</h1>
      <!-- Imagem de perfil -->
    <div class="profile-image-container">
      <img :src="profileImage" alt="Profile" class="profile-image" />
    </div>
        <Footer />
    </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import maranteImage from "../assets/marante.jpg";

    export default {
        components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      profileImage: maranteImage, // Caminho para a imagem
    };
  },
};
</script>

<style scoped>
.profile-image-container {
  text-align: center;
  margin-top: 20px;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%; /* Para a imagem ficar redonda */
  object-fit: cover;
  border: 3px solid #0F0A30;
}
</style>