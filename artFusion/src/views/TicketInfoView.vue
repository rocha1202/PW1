<template>
  <v-app style="background-color: #0f0a30; color: #f1f9fc;">
    <Navbar />
    <v-container class="fill-height">
      <div class="content">
        <!-- Título e Filtro de Favoritos sempre fixos no topo -->
        <div class="header">
          <h1 class="text-center">My Tickets</h1>

          <!-- Filtro de Favoritos -->
          <v-switch
            v-model="showFavorites"
            label="Show Only Favorites"
            color="primary"
            class="mb-4"
          />
        </div>

        <!-- Lista de Tickets com rolagem -->
        <v-row dense class="ticket-list">
          <v-col v-for="ticket in filteredTickets" :key="ticket.id" cols="12" md="6" lg="4">
            <v-card class="elevation-2">
              <v-card-title class="text-h6">{{ ticket.name }}</v-card-title>
              <v-card-subtitle>{{ ticket.description }}</v-card-subtitle>
              <v-card-text>
                <p><strong>Date:</strong> {{ ticket.date }}</p>
                <p><strong>Price:</strong> ${{ ticket.price }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="error" @click="deleteTicket(ticket.id)">
                  Delete
                </v-btn>
                <v-btn color="primary" @click="openDialog(ticket)">
                  View More
                </v-btn>
                <v-btn
                  :color="ticket.isFavorite ? 'yellow' : 'grey'"
                  @click="toggleFavorite(ticket)"
                >
                  {{ ticket.isFavorite ? 'Favorited' : 'Add to Favorites' }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Dialog for event details -->
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title class="text-h5">{{ selectedTicket?.name }}</v-card-title>
            <v-card-subtitle>{{ selectedTicket?.description }}</v-card-subtitle>

            <!-- Exibe a imagem do ingresso, se disponível -->
            <v-img
              v-if="selectedTicket?.image"
              :src="selectedTicket?.image"
              alt="Ticket Image"
              height="300px"
              class="mb-4"
            />

            <v-card-text>
              <p><strong>Date:</strong> {{ selectedTicket?.date }}</p>
              <p><strong>Price:</strong> ${{ selectedTicket?.price }}</p>
              <p><strong>More Information:</strong> {{ selectedTicket?.description || "N/A" }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" text @click="dialog = false">Close</v-btn>
            </v-card-actions>
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
      dialog: false, // Controls the dialog's open state
      selectedTicket: null, // Stores the selected ticket
      showFavorites: false, // Controls whether to show only favorite tickets
    };
  },
  computed: {
    purchasedTickets() {
      const userStore = useUserStore();
      return userStore.purchasedTickets; // Retrieves the purchased tickets
    },
    filteredTickets() {
      if (this.showFavorites) {
        return this.purchasedTickets.filter(ticket => ticket.isFavorite); // Filters only the favorite tickets
      }
      return this.purchasedTickets; // Return all tickets if "showFavorites" is false
    },
  },
  methods: {
    deleteTicket(ticketId) {
      const userStore = useUserStore();
      userStore.removeTicket(ticketId);
      this.$notify({ type: "success", text: "Ticket deleted successfully!" });
    },
    openDialog(ticket) {
      this.selectedTicket = ticket; // Sets the selected ticket
      this.dialog = true; // Opens the dialog
    },
    toggleFavorite(ticket) {
      const userStore = useUserStore();
      ticket.isFavorite = !ticket.isFavorite; // Toggle favorite status
      if (ticket.isFavorite) {
        this.$notify({ type: "success", text: "Ticket added to favorites!" });
      } else {
        this.$notify({ type: "info", text: "Ticket removed from favorites!" });
      }
      userStore.updateTicket(ticket); // Update the ticket in the store
    },
  },
};
</script>

<style scoped>
.content {
  width: 100%;
  max-width: 1200px;
  text-align: center;
  margin-top:-100px;
}

.v-container {
  padding-top: 200px; /* Ajuste o padding superior para dar mais espaço antes dos tickets */
}

.ticket-list {
  max-height: calc(80vh - 200px); /* Ajuste a altura para a lista de tickets começar mais abaixo */
  overflow-y: auto; /* Habilita a rolagem */
}
</style>
