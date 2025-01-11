<template>
    <!-- Navbar -->
    <Navbar />

    <v-container class="about-container content">
        <!-- Hero Section -->
        <v-row class="hero-section" align="center" justify="space-between">
            <v-col cols="12" md="6" class="text-section">
                <h1 class="display-2 font-weight-bold text-white">About ArtFusion</h1>
                <p class="subtitle-1 mt-4 text-white">
                    The 2025 Contemporary Art Festival celebrates creativity in all its forms.
                    Our mission is to bring together artists, creators and art lovers in a space to inspire
                    and share ideas.
                </p>
                <v-btn color="primary" class="mt-4"><router-link to="/workshop">Workshops</router-link>
                </v-btn>
            </v-col>

            <v-col cols="12" md="6">
                <v-img :src="logoImage" alt="Imagem do Evento" class="rounded-lg" contain></v-img>
            </v-col>
        </v-row>

        <v-row class="values-section py-12" justify="center" align="stretch">
            <v-col cols="12" md="4" class="value-box">
                <v-icon color="primary" large>mdi-palette</v-icon>
                <h3 class="font-weight-bold mt-4">Creativity</h3>
                <p>We foster an environment for artists to express themselves freely and explore new ideas.</p>
            </v-col>

            <v-col cols="12" md="4" class="value-box">
                <v-icon color="primary" large>mdi-handshake</v-icon>
                <h3 class="font-weight-bold mt-4">Collaboration</h3>
                <p>A space where creators can connect, collaborate and innovate together.</p>
            </v-col>

            <v-col cols="12" md="4" class="value-box">
                <v-icon color="primary" large>mdi-earth</v-icon>
                <h3 class="font-weight-bold mt-4">Inclusivity</h3>
                <p>We celebrate cultural and artistic diversity, bringing together people from all backgrounds.</p>
            </v-col>
        </v-row>


        <!-- História -->
        <v-row class="history-section py-12" align="center" justify="space-between">
            <v-col cols="12" md="6">
                <v-img :src="historyImage" alt="História do Festival" class="rounded-lg" contain></v-img>
            </v-col>

            <v-col cols="12" md="6" class="text-section">
                <h2 class="display-1 font-weight-bold">Our History</h2>
                <p class="subtitle-1 mt-4">
                    Since its inception in 2010, the Contemporary Art Festival has become one of the most anticipated
                    cultural events of the year. With over 100 participating artists each year, the festival features
                    exhibitions, live performances, workshops and lectures, creating a unique and immersive experience.
                </p>
                <p class="subtitle-1">
                    This event's main objective is to transcend cultural boundaries and promote unity through art.
                </p>
            </v-col>
        </v-row>
    </v-container>

    <!-- Footer -->
    <Footer />
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import logoImage from "@/assets/logo.png";
import historyImage from "@/assets/logo.png";

export default {
    name: "About",
    components: {
        Navbar,
        Footer,
    },
    data() {
        return {
            logoImage,
            historyImage,
        };
    },
};
</script>


<style scoped>
body {
  font-family: "Arial", sans-serif;
  margin: 0;
  padding: 0;
}

.about-container {
    margin-top: 100px;
    margin-bottom: 10px;
}

.hero-section {
    margin-top: 50px;
}

.text-section {
    text-align: left;
}

.values-section {
    text-align: center;
    border-radius: 8px;
    display: flex;
    flex-wrap: nowrap; 
}


.value-box {
    padding: 20px;
    text-align: center;
    background-color: #F1F9FC; 
    color:#0F0A30;
    border-radius: 8px; 
    margin: 30px;
    
}


.v-btn {
    text-transform: none;
    font-size: 1rem;
    padding: 10px 20px;
}

.text-white {
    color: #F1F9FC !important;
}
</style>