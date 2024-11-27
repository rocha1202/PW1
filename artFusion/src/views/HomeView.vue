<template>
  <div>
    <Navbar />
    <div class="content">
      <AllPrograms />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import AllPrograms from "@/components/allPrograms.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    AllPrograms,
    Footer,
  },
};
</script>

<style scoped>


.content {
  margin-top: 100px;
}
</style>
