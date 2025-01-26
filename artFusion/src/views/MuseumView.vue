<template>
  <v-app style="background-color: #0f0a30; color: #f1f9fc;">
    <Navbar />

    <v-container class="fill-height d-flex align-center justify-center py-16">
      <div class="content">
        <h1 class="text-center mb-2">Museum</h1>

        <!-- Carrossel com 4 tickets -->
        <v-carousel v-if="tickets.length" :cycle="false" height="400">
          <v-carousel-item v-for="ticket in tickets.slice(0, 4)" :key="ticket.id">
            <v-row align="stretch" justify="center">
              <!-- Imagem do Ticket -->
              <v-col cols="12" md="4" class="d-flex">
                <v-img :src="ticket.image" :alt="ticket.name" height="300px"></v-img>
              </v-col>

              <!-- Conteúdo do Ticket -->
              <v-col cols="12" md="8" class="d-flex">
                <v-card height="300px" width="100%" class="d-flex flex-column justify-between">
                  <v-card-title class="text-center">{{ ticket.name }}</v-card-title>
                  <v-card-subtitle class="text-center">{{ ticket.description }}</v-card-subtitle>
                  <v-card-text class="d-flex flex-column justify-center align-center">
                    <div><strong>Date:</strong> {{ ticket.date }}</div>
                    <div><strong>Price:</strong> ${{ ticket.price }}</div>
                    <div><strong>Artist:</strong> {{ ticket.artist }}</div>
                  </v-card-text>
                  <v-btn class="buy-button" color="green" v-if="isUserAuthenticated && isFutureEvent(ticket.date)"
                    @click="handleBuyTicket(ticket)">
                    Buy Ticket
                  </v-btn>

                  <v-btn class="read-more-btn" color="blue" @click="openDialog(ticket)">
                    Learn More
                  </v-btn>
                  <v-btn v-if="canDeleteTicket" color="red" @click="deleteTicket(ticket.id)">
                    Delete
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-carousel-item>
        </v-carousel>

        <!-- Todos os tickets em uma grid de 4 colunas -->
        <v-row justify="center" class="mt-4">
          <v-col v-for="ticket in tickets.slice(4)" :key="ticket.id" cols="12" sm="6" md="3">
            <v-card>
              <v-img :src="ticket.image" :alt="ticket.name" height="200px"></v-img>
              <v-card-title>{{ ticket.name }}</v-card-title>
              <v-card-subtitle>{{ ticket.date }}</v-card-subtitle>
              <v-card-text>
                <div><strong>Price:</strong> ${{ ticket.price }}</div>
                <div><strong>Artist:</strong> {{ ticket.artist }}</div>
                <div><strong>Quantity:</strong> {{ ticket.quantity }}</div>
              </v-card-text>

              <!-- Lógica para não mostrar o botão "Comprar" se a data for passada ou igual -->
              <v-btn class="buy-button" color="green" v-if="isUserAuthenticated && isFutureEvent(ticket.date)"
                @click="handleBuyTicket(ticket)">
                Buy Ticket
              </v-btn>

              <v-btn class="read-more-btn" color="blue" @click="openDialog(ticket)">
                Learn More
              </v-btn>
              <v-btn v-if="canDeleteTicket" color="red" @click="deleteTicket(ticket.id)">
                Delete
              </v-btn>
            </v-card>
          </v-col>
        </v-row>

        <!-- Dialog de detalhes do ticket -->
        <v-dialog v-model="dialog" max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ selectedTicket.name }}</span>
            </v-card-title>
            <v-card-subtitle>{{ selectedTicket.date }}</v-card-subtitle>
            <v-card-text>
              <div><strong>Price:</strong> ${{ selectedTicket.price }}</div>
              <div><strong>Artist:</strong> {{ selectedTicket.artist }}</div>
              <div><strong>Quantity:</strong> {{ selectedTicket.quantity }}</div>
              <div><strong>Description:</strong> {{ selectedTicket.description }}</div>
            </v-card-text>

            <v-btn class="buy-button" color="green" v-if="isUserAuthenticated && isFutureEvent(selectedTicket.date)"
              @click="handleBuyTicket(selectedTicket)">
              Buy Ticket
            </v-btn>

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
import { useUserStore } from "@/stores/userStore"; // Importar a store do usuário

export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      tickets: [], // Inicializa o array para os dados dos tickets
      dialog: false, // Controle do dialog
      selectedTicket: {}, // Ticket selecionado para exibir mais detalhes
    };
  },
  computed: {
    // Computed property para verificar se o usuário está autenticado
    isUserAuthenticated() {
      const userStore = useUserStore();
      return userStore.isAuthenticated;
    },
    // Verificar se o usuário tem permissão para deletar tickets
    canDeleteTicket() {
      const userStore = useUserStore();
      return userStore.userRole === "admin" || userStore.userRole === "organizer";
    },
  },
  async mounted() {
    await this.fetchTickets(); // Chama a função para carregar os tickets ao montar o componente
  },
  methods: {
    async fetchTickets() {
      try {
        const response = await fetch("/api/tickets.json"); // Carregar os dados do arquivo JSON
        if (!response.ok) {
          throw new Error(`Falha ao buscar os tickets: ${response.status}`);
        }
        const ticketsData = await response.json();
        this.tickets = ticketsData; // Preenche o array de tickets com os dados carregados
      } catch (error) {
        console.error("Erro ao carregar os tickets:", error.message);
      }
    },

    // Método para excluir um ticket
    deleteTicket(ticketId) {
      this.tickets = this.tickets.filter((ticket) => ticket.id !== ticketId);
      console.log(`Ticket ${ticketId} apagado com sucesso!`);
    },

    // Método para simular a compra de um ticket
    handleBuyTicket(ticket) {
      const userStore = useUserStore();
      try {
        userStore.buyTicket(ticket);
        alert(`Bilhete "${ticket.name}" comprado com sucesso!`);
      } catch (error) {
        alert(error.message);
      }
    },

    // Método para abrir o dialog com mais informações
    openDialog(ticket) {
      this.selectedTicket = ticket; // Define o ticket selecionado
      this.dialog = true; // Abre o dialog
    },

    // Método para verificar se a data do ticket é no futuro
    isFutureEvent(ticketDate) {
      const currentDate = new Date();
      const eventDate = this.parseDate(ticketDate); // Convertendo a data para objeto Date
      return eventDate > currentDate;
    },

    // Método para converter a data no formato "dia-mês-ano" para o formato Date
    parseDate(dateString) {
      const [day, month, year] = dateString.split("-").map((part) => parseInt(part, 10));
      // O mês em JavaScript é baseado em zero, então subtraímos 1 do mês
      return new Date(year, month - 1, day);
    },
  },
};
</script>

<style scoped>
/* Estilos personalizados para os botões */
.v-btn {
  font-size: 14px;
  padding: 8px;
}

.v-btn:hover {
  background-color: #388e3c;
}

.buy-button {
  margin-bottom: 10px;
}

.read-more-btn {
  margin-bottom: 10px;
  background-color: #1976d2;
}


</style>
