<template>
  <div>
    <Navbar />
    <AllPrograms />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import AllPrograms from "@/components/allPrograms.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    AllPrograms,
  },
};
</script>

<style scoped>
div {
  font-family: Arial, sans-serif;
}
</style>
