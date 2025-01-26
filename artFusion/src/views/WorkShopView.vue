<template>
  <v-app style="background-color: #0f0a30; color: #f1f9fc;">
    <Navbar />
    <v-container class="fill-height d-flex align-center justify-center py-16">
      <div class="content">
        <h1 class="text-center mb-2">Workshops</h1>

        <!-- Carousel com slides de Workshops -->
        <v-row dense>
          <v-col v-for="(workshop, index) in workshops.slice(0, 3)" :key="index" cols="12" md="6" lg="4">
            <v-card class="elevation-2 card-size">
              <v-card-title class="text-h6">{{ workshop.name }}</v-card-title>
              <v-card-subtitle>{{ workshop.artist }}</v-card-subtitle>
              <v-card-text>
                <p><strong>Price:</strong> ${{ workshop.price }}</p>
                <p><strong>Quantity:</strong> {{ workshop.quantity }}</p>
                <p><strong>Date:</strong> {{ formatDate(workshop.date) }}</p> <!-- Adicionando a data -->
              </v-card-text>
              <v-card-actions>
                <v-btn color="error" v-if="canDeleteWorkshop" @click="deleteWorkshop(workshop.id)">
                  Delete
                </v-btn>
                <!-- Botão de Compra só aparece se a data for posterior à data atual -->
                <v-btn color="success" @click="handleBuyTicket(workshop)" v-if="isFutureWorkshop(workshop.date)">
                  Buy Tickets
                </v-btn>
                <v-btn color="primary" @click="openDialog(workshop)">
                  Learn More
                </v-btn>
              </v-card-actions>
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
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" text @click="dialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Workshops restantes em uma grid de 4 colunas -->
        <v-row dense>
          <v-col v-for="(workshop, index) in workshops.slice(3)" :key="index" cols="12" md="6" lg="4">
            <v-card class="elevation-2 card-size">
              <v-card-title class="text-h6">{{ workshop.name }}</v-card-title>
              <v-card-subtitle>{{ workshop.artist }}</v-card-subtitle>
              <v-card-text>
                <p><strong>Price:</strong> ${{ workshop.price }}</p>
                <p><strong>Quantity:</strong> {{ workshop.quantity }}</p>
                <p><strong>Date:</strong> {{ formatDate(workshop.date) }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="error" v-if="canDeleteWorkshop" @click="deleteWorkshop(workshop.id)">
                  Delete
                </v-btn>
                <!-- Botão de Compra só aparece se a data for posterior à data atual -->
                <v-btn color="success" @click="handleBuyTicket(workshop)" v-if="isFutureWorkshop(workshop.date)">
                  Buy Ticket
                </v-btn>
                <v-btn color="primary" @click="openDialog(workshop)">
                  Learn More
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
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
      // Caso a data seja uma string do formato 'DD-MM-YYYY', converta corretamente
      const [day, month, year] = dateString.split('-');

      // Se a data não estiver no formato correto, retorna uma string de erro
      if (!day || !month || !year) {
        return 'Invalid Date';
      }

      // Recria a data no formato 'YYYY-MM-DD' para garantir a interpretação correta
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

      // Cria o objeto Date com a data formatada
      const date = new Date(formattedDate);

      // Verifica se a data é válida
      if (isNaN(date)) {
        return 'Invalid Date';  // Caso seja inválida, retorna uma mensagem
      }

      // Formata a data para o formato 'MM/DD/YYYY'
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options); // Retorna a data formatada
    },
    isFutureWorkshop(workshopDate) {
      const [day, month, year] = workshopDate.split('-');

      // Se a data não estiver no formato correto, retorna false
      if (!day || !month || !year) {
        return false;
      }

      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      const workshopDateObj = new Date(formattedDate);
      const currentDate = new Date();

      // Verifica se a data do workshop é posterior à data atual
      return workshopDateObj > currentDate;
    },
    // Método para tratar a compra de um ticket
    handleBuyTicket(ticket) {
      const userStore = useUserStore();
      try {
        userStore.buyTicket(ticket); // Chama o método de compra do usuário
        alert(`Bilhete "${ticket.name}" comprado com sucesso!`);
      } catch (error) {
        alert(error.message); // Em caso de erro, exibe a mensagem
      }
    },
  },
};
</script>

<style scoped>

.v-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.v-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.v-img {
  border-radius: 8px;
}

.v-btn {
  font-size: 16px;
  margin: 10px;
}

.v-btn:hover {
  background-color: #00695c;
}

/* Grid de workshops */
.v-row {
  margin-top: 30px;
}

.v-col {
  padding: 15px;
}

.v-card-title {
  color: #003366;
}

.v-card-subtitle {
  color: #555;
}

.v-card-text {
  color: #333;
}

.v-card-actions {
  display: flex;
  justify-content: space-between;
}

.card-size {
  height: 250px;
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
