<template>
  <v-app style="background-color: #0f0a30; color: #f1f9fc;">
    <Navbar />
    <v-container class="fill-height d-flex align-center justify-center py-16">
      <div class="content">
        <h1 class="text-center mb-2">Meus Bilhetes</h1>

        <v-row dense>
          <v-col v-for="ticket in purchasedTickets" :key="ticket.id" cols="12" md="6" lg="4">
            <v-card class="elevation-2">
              <v-img :src="ticket.image" :alt="ticket.name" height="200px" />
              <v-card-title class="text-h6">{{ ticket.name }}</v-card-title>
              <v-card-subtitle>{{ ticket.description }}</v-card-subtitle>
              <v-card-text>
                <p><strong>Preço:</strong> ${{ ticket.price }}</p>
                <p><strong>Quantidade:</strong> {{ ticket.quantity }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="error" @click="deleteTicket(ticket.id)">
                  Apagar
                </v-btn>
                <v-btn color="primary" @click="openDialog(ticket)">
                  Ver Mais
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <!-- Dialog para detalhes do evento -->
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title class="text-h5">{{ selectedTicket?.name }}</v-card-title>
            <v-card-subtitle>{{ selectedTicket?.description }}</v-card-subtitle>
            <v-card-text>
              <p><strong>Preço:</strong> ${{ selectedTicket?.price }}</p>
              <p><strong>Quantidade:</strong> {{ selectedTicket?.quantity }}</p>
              <p><strong>Mais informações:</strong> {{ selectedTicket?.extraInfo || "N/A" }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" text @click="dialog = false">Fechar</v-btn>
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
      dialog: false, // Controla o estado de abertura do dialog
      selectedTicket: null, // Armazena o bilhete selecionado
    };
  },
  computed: {
    purchasedTickets() {
      const userStore = useUserStore();
      return userStore.purchasedTickets; // Obtém os bilhetes comprados
    },
  },
  methods: {
    deleteTicket(ticketId) {
      const userStore = useUserStore();
      userStore.removeTicket(ticketId);
      this.$notify({ type: "success", text: "Bilhete apagado com sucesso!" });
    },
    openDialog(ticket) {
      this.selectedTicket = ticket; // Define o bilhete selecionado
      this.dialog = true; // Abre o dialog
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
