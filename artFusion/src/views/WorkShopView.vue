<template>
  <v-app style="background-color: #0f0a30; color: #f1f9fc;">
    <Navbar />
    <v-container class="fill-height d-flex align-center justify-center py-16">
      <div class="content">
        <h1 class="text-center mb-2">Workshops</h1>

        <!-- Botões de ordenação -->
        <v-row class="mb-4">
          <v-col cols="12" sm="4" md="3">
            <v-btn @click="sortWorkshops('name')" color="primary" full-width>Sort by Name</v-btn>
          </v-col>
          <v-col cols="12" sm="4" md="3">
            <v-btn @click="sortWorkshops('date')" color="primary" full-width>Sort by Date</v-btn>
          </v-col>
          <v-col cols="12" sm="4" md="3">
            <v-btn @click="sortWorkshops('price')" color="primary" full-width>Sort by Price</v-btn>
          </v-col>
        </v-row>

        <!-- Workshops em uma grid de 3 colunas -->
        <v-row dense>
          <v-col v-for="(workshop, index) in workshops" :key="index" cols="12" md="6" lg="4">
            <v-card class="elevation-2 card-size">
              <v-card-title class="text-h6">{{ workshop.name }}</v-card-title>
              <v-card-subtitle>{{ workshop.artist }}</v-card-subtitle>
              <v-card-text>
                <p><strong>Price:</strong> ${{ workshop.price }}</p>
                <p><strong>Quantity:</strong> {{ workshop.quantity }}</p>
                <p><strong>Date:</strong> {{ formatDate(workshop.date) }}</p> <!-- Adicionando a data -->
              </v-card-text>

              <v-btn color="success" @click="handleBuyTicket(workshop)"
                v-if="isUserAuthenticated && isFutureWorkshop(workshop.date)">
                Buy Tickets
              </v-btn>
              <v-btn color="error" v-if="canDeleteWorkshop" @click="deleteWorkshop(workshop.id)">
                Delete
              </v-btn>
              <v-btn class="read-more-btn" color="blue" @click="openDialog(workshop)">
                Learn More
              </v-btn>
            </v-card>
          </v-col>
        </v-row>

        <!-- Dialog para detalhes do workshop -->
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title class="text-h5">{{ selectedWorkshop?.name }}</v-card-title>
            <v-card-subtitle>{{ selectedWorkshop?.artist }}</v-card-subtitle>
            <v-card-text>
              <p><strong>Date:</strong> {{ formatDate(selectedWorkshop?.date) }}</p>
              <p><strong>Price:</strong> ${{ selectedWorkshop?.price }}</p>
              <p><strong>Quantity:</strong> {{ selectedWorkshop?.quantity }}</p>
              <p><strong>Description:</strong> {{ selectedWorkshop?.description }}</p>
            </v-card-text>

            <v-btn color="blue" @click="dialog = false">Close</v-btn>
          </v-card>
        </v-dialog>
      </div>
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
  data() {
    return {
      dialog: false,
      selectedWorkshop: null,
      workshops: [], // Lista de workshops
    };
  },
  computed: {
    canDeleteWorkshop() {
      const userStore = useUserStore();
      return userStore.userRole === "admin" || userStore.userRole === "organizer";
    },
    isUserAuthenticated() {
      const userStore = useUserStore();
      return userStore.isAuthenticated;
    },
  },
  async mounted() {
    await this.fetchWorkshops(); // Carrega os dados dos workshops ao montar o componente
  },
  methods: {
    async fetchWorkshops() {
      try {
        const response = await fetch("/api/workshops.json"); // Chama a API para obter os workshops
        if (!response.ok) {
          throw new Error(`Failed to fetch workshops: ${response.status}`);
        }
        const workshopsData = await response.json();
        this.workshops = workshopsData; // Preenche a lista de workshops
      } catch (error) {
        console.error("Error loading workshops:", error.message);
      }
    },
    deleteWorkshop(workshopId) {
      this.workshops = this.workshops.filter((workshop) => workshop.id !== workshopId);
      console.log(`Workshop ${workshopId} deleted successfully!`);
    },
    openDialog(workshop) {
      this.selectedWorkshop = workshop; // Define o workshop selecionado
      this.dialog = true; // Abre o dialog de detalhes
    },
    formatDate(dateString) {
      const [day, month, year] = dateString.split("-");
      if (!day || !month || !year) {
        return "Invalid Date";
      }
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      const date = new Date(formattedDate);
      if (isNaN(date)) {
        return "Invalid Date";
      }
      const options = { year: "numeric", month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    },
    isFutureWorkshop(workshopDate) {
      const [day, month, year] = workshopDate.split("-");
      if (!day || !month || !year) {
        return false;
      }
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      const workshopDateObj = new Date(formattedDate);
      const currentDate = new Date();
      return workshopDateObj > currentDate;
    },
    handleBuyTicket(ticket) {
      const userStore = useUserStore();
      try {
        userStore.buyTicket(ticket);
        alert(`Ticket "${ticket.name}" purchased successfully!`);
      } catch (error) {
        alert(error.message);
      }
    },
    sortWorkshops(criteria) {
      if (criteria === 'name') {
        this.workshops = [...this.workshops].sort((a, b) => a.name.localeCompare(b.name));
      } else if (criteria === 'date') {
        this.workshops = [...this.workshops].sort((a, b) => new Date(a.date) - new Date(b.date));
      } else if (criteria === 'price') {
        this.workshops = [...this.workshops].sort((a, b) => a.price - b.price);
      }
    }

  },
};
</script>

<style scoped>

.v-row {
  margin-top: 30px;
}

.v-col {
  padding: 15px;
}


.v-card-actions {
  display: flex;
  justify-content: space-between;
}

.card-size {
  height: 290px;
  /* Altura fixa para os cards */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-size .v-card-text {
  flex-grow: 1;
  /* Faz o conteúdo do card ocupar o máximo de espaço disponível */
}
</style>
