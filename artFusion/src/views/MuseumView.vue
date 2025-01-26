<template>
  <div>
    <Navbar />

    <div class="content">

      <!-- Carrossel com 4 dos tickets -->
      <div class="carousel-container">
        <Carousel :slideCount="4">
          <div v-for="(ticket) in tickets.slice(0, 4)" :key="ticket.id" class="slide">
            <div class="image-container">
              <img :src="ticket.image" :alt="ticket.name" />
            </div>
            <div class="content-container">
              <h2>{{ ticket.name }}</h2>
              <p>{{ ticket.description }}</p>
              <p><strong>Price:</strong> ${{ ticket.price }}</p>
              <p><strong>Artist:</strong> {{ ticket.artist }}</p>

              <!-- Botão de apagar visível apenas para admins ou organizers -->
              <button v-if="canDeleteTicket" @click="deleteTicket(ticket.id)">Delete</button>
            </div>
          </div>
        </Carousel>
      </div>

      <!-- Todos os tickets em uma grid de 4 colunas -->
      <div class="tickets-container">
        <div v-for="ticket in tickets.slice(4)" :key="ticket.id" class="ticket-card">
          <img :src="ticket.image" :alt="ticket.name" class="ticket-image" />
          <div class="ticket-info">
            <h2>{{ ticket.name }}</h2>
            <p>{{ ticket.description }}</p>
            <p><strong>Price:</strong> ${{ ticket.price }}</p>
            <p><strong>Artist:</strong> {{ ticket.artist }}</p>
            <p><strong>Quantity:</strong> {{ ticket.quantity }}</p>
            <button class="buy-button" @click="handleBuyTicket(ticket)"> Comprar </button>
            <!-- Botão de apagar visível apenas para admins ou organizers -->
            <button v-if="canDeleteTicket" @click="deleteTicket(ticket.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import Carousel from "@/components/Carousel.vue";
import { useUserStore } from "@/stores/userStore"; // Importar a store do usuário

export default {
  components: {
    Navbar,
    Footer,
    Carousel,
  },
  data() {
    return {
      tickets: [], // Inicializa o array para os dados dos tickets
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
    // Verificar se o usuário é admin
    isAdmin() {
      const userStore = useUserStore();
      return userStore.userRole === "admin";
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
    buyTicket(ticket) {
      alert(`Você comprou o ticket: ${ticket.name}`);
      // Lógica adicional para a compra do ticket pode ser implementada aqui
    },
    handleBuyTicket(ticket) {
      const userStore = useUserStore();
      try {
        userStore.buyTicket(ticket);
        alert(`Bilhete "${ticket.name}" comprado com sucesso!`);
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style scoped>
/* Estilos para os botões */
button {
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  margin-right: 10px;
}

button:hover {
  background-color: darkgreen;
}

button.delete {
  background-color: red;
}

button.delete:hover {
  background-color: darkred;
}
</style>


<style scoped>
.content {
  margin-top: 100px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* Centraliza o conteúdo verticalmente */
  align-items: center;
  /* Centraliza o conteúdo horizontalmente */
  min-height: 100vh;
  /* Garante que a altura mínima ocupe a tela inteira */
}

.carousel-container {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.tickets-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-content: center;
}



.ticket-card {
  width: 100%;
  max-width: 240px; /* Largura máxima reduzida */
  height: 360px; /* Altura mais compacta */
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  background-color: #fff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.ticket-card:hover {
  transform: scale(1.05); /* Leve efeito de zoom ao passar o mouse */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.ticket-image {
  width: 100%;
  height: 120px; /* Imagens menores */
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.ticket-info {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px; /* Espaçamento entre os elementos */
  text-align: left; /* Texto alinhado à esquerda */
  font-size: 14px; /* Reduz tamanho da fonte */
}


.ticket-info h2 {
  font-size: 1em;
  margin: 5px 0;
  color: #003366;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden; /* Texto longo é cortado com reticências */
}

.ticket-info p {
  margin: 3px 0;
  color: #333;
}

.ticket-info strong {
  color: #555;
}


.ticket-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}


button {
  background-color: green;
  color: white;
  border: none;
  padding: 4px 4px; /* Botões menores */
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
}

button:hover {
  background-color: darkred;
}

/* Estilos para o botão "Comprar" */
.buy-button {
  background-color: green;
  color: white;
  border: none;
  padding: 8px 8px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
  
}

.buy-button:hover {
  background-color: darkgreen;
}

/* Estilos para o botão "Delete" */
.delete-button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.delete-button:hover {
  background-color: darkred;
}

/* Responsividade */
@media (max-width: 768px) {
  .tickets-container {
    grid-template-columns: repeat(2, 1fr);
    /* 2 colunas em telas menores */
  }

  .ticket-card {
    width: 90%;
    /* Reduz a largura dos cards para 90% em telas menores */
  }
}

@media (max-width: 480px) {
  .tickets-container {
    grid-template-columns: 1fr;
    /* 1 coluna em telas muito pequenas */
  }

  .ticket-card {
    width: 100%;
    /* Card ocupa toda a largura da tela */
  }
}
</style>
