<template>
  <v-app style="background-color: #0f0a30; color:#F1F9FC;">
    <Navbar />
    <v-container class="fill-height d-flex align-center justify-center">

    </v-container>
    <Footer/>
  </v-app>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
export default {
  components: {
    Navbar,
    Footer,
  },
}
</script>