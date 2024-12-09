<template>
  <div>
    <Navbar />
    <br>
    <br>
    <br>
    <br>
    <h1>Store</h1>
    <Footer />
  </div>   
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Footer from '@/components/footer.vue';
export default {
  name: 'InfoArtist',
  components: {
    Navbar,
    Footer,
  }
};
</script>