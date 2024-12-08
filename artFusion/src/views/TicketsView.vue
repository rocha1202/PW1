<template>
  <div>
    <NavbarTicket />
    <div class="content">
      <AllPrograms />
    </div>
    <Footer />
  </div>
</template>

<script>
import NavbarTicket from "@/components/navbarTicket.vue";
import Footer from "@/components/footer.vue";

  export default {
    name: 'TicketsPage',
    components: {
      NavbarTicket,
      Footer,
    },
  };
  </script>

<style scoped>
.content {
  margin-top: 100px;
}
</style>