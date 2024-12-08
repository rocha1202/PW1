<template>
  <div>
    <navbarTicket />
    <br>
    <br>
    <br>
    <br>
    <h1>info-artist</h1>
    <Footer />
  </div>   
</template>

<script>
import NavbarTicket from '@/components/navbarTicket.vue';
import Footer from '@/components/footer.vue';
export default {
  name: 'InfoArtist',
  components: {
    NavbarTicket,
    Footer,
  }
};
</script>