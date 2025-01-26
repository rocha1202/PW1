<template>
  <v-app style="background-color: #0f0a30; color: #f1f9fc;">
    <Navbar />
    <v-container class="fill-height d-flex align-center justify-center py-16">
      <div class="content">
        <h1 class="text-center mb-2">My Tickets</h1>

        <v-row dense>
          <v-col v-for="ticket in purchasedTickets" :key="ticket.id" cols="12" md="6" lg="4">
            <v-card class="elevation-2">
              <v-img :src="ticket.image" :alt="ticket.name" height="200px" />
              <v-card-title class="text-h6">{{ ticket.name }}</v-card-title>
              <v-card-subtitle>{{ ticket.description }}</v-card-subtitle>
              <v-card-text>
                <p><strong>Price:</strong> ${{ ticket.price }}</p>
                <p><strong>Quantity:</strong> {{ ticket.quantity }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="error" @click="deleteTicket(ticket.id)">
                  Delete
                </v-btn>
                <v-btn color="primary" @click="openDialog(ticket)">
                  View More
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
            <v-card-text>
              <p><strong>Price:</strong> ${{ selectedTicket?.price }}</p>
              <p><strong>Quantity:</strong> {{ selectedTicket?.quantity }}</p>
              <p><strong>More Information:</strong> {{ selectedTicket?.extraInfo || "N/A" }}</p>
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
    };
  },
  computed: {
    purchasedTickets() {
      const userStore = useUserStore();
      return userStore.purchasedTickets; // Retrieves the purchased tickets
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
  },
};
</script>

<style scoped>
.content {
  width: 100%;
  max-width: 1200px;
  text-align: center;
}
</style>
