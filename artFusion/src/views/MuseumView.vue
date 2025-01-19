<template>
  <div>
    <Navbar />

    <div class="content">
      <h1>Tickets</h1>

      <!-- Carrossel com 3/4 dos tickets -->
      <div class="carousel-container">
        <Carousel :slideCount="3">
          <!-- Usamos os 3/4 primeiros tickets para o carrossel -->
          <div v-for="(ticket, index) in tickets.slice(0, 3)" :key="ticket.id" class="slide">
            <div class="image-container">
              <img :src="ticket.image" :alt="ticket.name" />
            </div>
            <div class="content-container">
              <h2>{{ ticket.name }}</h2>
              <p>{{ ticket.description }}</p>
              <p><strong>Price:</strong> ${{ ticket.price }}</p>
              <p><strong>Artist:</strong> {{ ticket.artist }}</p>
            </div>
          </div>
        </Carousel>
      </div>

      <!-- Todos os tickets em uma grid de 4 colunas -->
      <div class="tickets-container">
        <div v-for="ticket in tickets.slice(3)" :key="ticket.id" class="ticket-card">
          <img :src="ticket.image" :alt="ticket.name" class="ticket-image" />
          <div class="ticket-info">
            <h2>{{ ticket.name }}</h2>
            <p>{{ ticket.description }}</p>
            <p><strong>Price:</strong> ${{ ticket.price }}</p>
            <p><strong>Artist:</strong> {{ ticket.artist }}</p>
            <p><strong>Quantity:</strong> {{ ticket.quantity }}</p>
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
  },
};
</script>

<style scoped>
.content {
  margin-top: 100px;
  padding: 20px;
  text-align: center; /* Centraliza o texto */
}

/* Estilo do carrossel */
.carousel-container {
  margin-bottom: 30px;
  display: flex;
  justify-content: center; /* Centraliza o carrossel horizontalmente */
}

/* Estilo da grid com todos os tickets */
.tickets-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 colunas */
  gap: 20px;
  justify-content: center; /* Centraliza a grid horizontalmente */
}

.ticket-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center; /* Centraliza o conteúdo do card */
}

.ticket-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.ticket-info {
  padding: 10px;
  background-color: #f8f9fa;
}

.ticket-info h2 {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #003366; /* Azul escuro */
}

.ticket-info p {
  font-size: 1em;
  margin: 5px 0;
  color: #003366; /* Azul escuro */
}
</style>
