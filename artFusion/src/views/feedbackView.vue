<template>
    <v-app style="background-color: #0f0a30; color: #f1f9fc;">
        <Navbar />
        <v-container class="fill-height d-flex align-center justify-center py-16">
            <h1>feedback</h1>
        </v-container>
        <Footer />
    </v-app>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import { useUserStore } from "@/stores/userStore";

export default {
    components: {
        Navbar,
        Footer,
    },
};
</script>

<style scoped></style>