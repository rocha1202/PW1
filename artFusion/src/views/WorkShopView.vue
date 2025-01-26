<template>
  <div>
    <Navbar />
    <div class="content">
      <h1>Workshops</h1>
    </div>
    <div class="content">
      <Carousel :slideCount="3">
      <!-- First Slide -->
      <div class="slide">
        <div class="image-container">
          <img src="https://via.placeholder.com/600x400" alt="Placeholder Image" />
        </div>
        <div class="content-container">
          <h2>Slide 1 Title</h2>
          <p>Slide 1 description goes here. You can write a longer description to explain the content.</p>
          <button>Learn More</button>
        </div>
      </div>

      <!-- Second Slide -->
      <div class="slide">
        <div class="image-container">
          <img src="https://via.placeholder.com/600x400" alt="Placeholder Image" />
        </div>
        <div class="content-container">
          <h2>Slide 2 Title</h2>
          <p>Slide 2 description goes here. This is where you add unique content for each slide.</p>
          <button>Discover</button>
        </div>
      </div>

      <!-- Third Slide -->
      <div class="slide">
        <div class="image-container">
          <img src="https://via.placeholder.com/600x400" alt="Placeholder Image" />
        </div>
        <div class="content-container">
          <h2>Slide 3 Title</h2>
          <p>Slide 3 description goes here. Make your call-to-action compelling!</p>
          <button>Read More</button>
        </div>
      </div>
    </Carousel>
     <!-- Todos os tickets em uma grid de 4 colunas -->
      <div class="workshops-container">
        <div v-for="workshop in workshops.slice(4)" :key="workshop.id" class="workshop-card">
          <div class="workshop-info">
            <h2>{{ workshop.name }}</h2>
            <p>{{ workshop.description }}</p>
            <p><strong>Price:</strong> ${{ workshop.price }}</p>
            <p><strong>Artist:</strong> {{ workshop.artist }}</p>
            <p><strong>Quantity:</strong> {{ workshop.quantity }}</p>
            <button class="buy-button" @click="handleBuyWorkshop(workshop)"> Comprar </button>
            <!-- Botão de apagar visível apenas para admins ou organizers -->
            <button v-if="canDeleteWrokshop" @click="deleteWorkshop(workshop.id)">Delete</button>
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
      workshops: [], // Inicializa o array para os dados dos tickets
    };
  },
  computed: {
    // Computed property para verificar se o usuário está autenticado
    isUserAuthenticated() {
      const userStore = useUserStore();
      return userStore.isAuthenticated;
    },
    // Verificar se o usuário tem permissão para deletar tickets
    canDeleteWorkshop() {
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
    await this.fetchWorkshops(); // Chama a função para carregar os tickets ao montar o componente
  },
  methods: {
    async fetchWorkshopss() {
      try {
        const response = await fetch("/api/workshops.json"); // Carregar os dados do arquivo JSON
        if (!response.ok) {
          throw new Error(`Falha ao buscar os workshops: ${response.status}`);
        }
        const workshopsData = await response.json();
        this.workshops = workshopsData; // Preenche o array de tickets com os dados carregados
      } catch (error) {
        console.error("Erro ao carregar os tickets:", error.message);
      }
    },

    // Método para excluir um ticket
    deleteWorkshop(workshopId) {
      this.workshops = this.workshops.filter((workshop) => workshop.id !== workshopId);
      console.log(`Workshop ${workshopId} apagado com sucesso!`);
    },

    // Método para simular a compra de um ticket
    buyTicket(workshop) {
      alert(`Você comprou o workshop: ${workshop.name}`);
      // Lógica adicional para a compra do ticket pode ser implementada aqui
    },
    handleBuyWorkshop(workshop) {
      const userStore = useUserStore();
      try {
        userStore.buyWorkshop(workshop);
        alert(`Bilhete "${workshop.name}" comprado com sucesso!`);
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>

<style scoped>
/* Estilo para o conteúdo geral */
.content {
  margin-top: 100px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Estilo para o carrossel */
.carousel-container {
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
}

.carousel-container .slide {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.carousel-container .image-container {
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  border-radius: 8px;
}

.carousel-container img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.carousel-container .content-container {
  text-align: center;
  margin-top: 15px;
}

.carousel-container .content-container h2 {
  font-size: 1.5em;
  color: #003366;
}

.carousel-container .content-container p {
  font-size: 1em;
  color: #555;
  margin: 10px 0;
}

.carousel-container .content-container button {
  padding: 10px 20px;
  background-color: green;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 10px;
}

.carousel-container .content-container button:hover {
  background-color: darkgreen;
}

/* Estilo para os workshops */
.workshops-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  justify-content: center;
  margin-top: 50px;
}

.workshop-card {
  width: 100%;
  max-width: 240px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  background-color: #fff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.workshop-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

/* Estilos para a imagem do workshop */
.workshop-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

/* Informações do workshop */
.workshop-info {
  padding: 15px;
}

.workshop-info h2 {
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #003366;
}

.workshop-info p {
  font-size: 1em;
  color: #333;
  margin: 5px 0;
}

.workshop-info strong {
  font-weight: bold;
  color: #555;
}

/* Estilos para os botões */
.workshop-info .buy-button {
  background-color: green;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 10px;
}

.workshop-info .buy-button:hover {
  background-color: darkgreen;
}

.workshop-info .delete-button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 10px;
}

.workshop-info .delete-button:hover {
  background-color: darkred;
}

/* Responsividade */
@media (max-width: 1024px) {
  .workshops-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .workshops-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .workshops-container {
    grid-template-columns: 1fr;
  }

  .workshop-card {
    width: 100%;
  }
}
</style>
