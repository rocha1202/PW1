<template>
  <div>
    <Navbar />
    <div class="content">
      <Carousel :slideCount="carouselSlides.length">
        <div class="slide" v-for="slide in carouselSlides" :key="slide.id">
          <div class="image-container">
            <img :src="slide.imageSrc" :alt="slide.title" />
          </div>
          <div class="content-container">
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.description }}</p>
            <button>{{ slide.buttonText }}</button>
          </div>
        </div>
      </Carousel>
      <div class="title-section">
        <h1>Evento temático</h1>
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
          <p>Página {{ currentPage }} de {{ totalPages }}</p>
          <button @click="nextPage" :disabled="currentPage === totalPages">Próxima</button>
        </div>
      </div>
      <div class="event-list">
        <EventCard
          v-for="event in paginatedEvents"
          :key="event.id"
          :imageSrc="event.imageSrc"
          :title="event.title"
          :artist="event.artist"
          @toggleFavorite="handleFavorite(event)"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { useApiStore } from "../stores/apiStore";  
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import Carousel from "@/components/Carousel.vue";
import EventCard from "@/components/EventCard.vue";

// Importando imagens
import event1 from "@/assets/event1.jpg";
import event2 from "@/assets/event2.jpg";

export default {
  components: {
    Navbar,
    Footer,
    Carousel,
    EventCard,
  },
  data() {
    return {
      carouselSlides: [
        {
          id: 1,
          imageSrc: event1,
          title: "Art it's not just existing. It's more than that",
          description: "Slide 1 description goes here. You can write a longer description to explain the content.",
          buttonText: "More info",
        },
        {
          id: 2,
          imageSrc: event2,
          title: "See with your own eyes",
          description: "Slide 2 description goes here. This is where you add unique content for each slide.",
          buttonText: "More info",
        },
      ],
      events: [], 
      currentPage: 1,
      itemsPerPage: 5,
    };
  },
  computed: {
    paginatedEvents() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.events.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.events.length / this.itemsPerPage);
    },
  },
  methods: {
    // Função para carregar os eventos e atualizar o nome do artista
    async fetchEvents() {
      try {
        // Substitua a URL pela sua API de eventos
        const response = await fetch("URL_DA_API_EVENTS");  
        if (!response.ok) {
          throw new Error(`Falha na requisição de eventos: ${response.status}`);
        }

        const eventsData = await response.json();

        // Agora, para cada evento, vamos buscar os detalhes do artista
        const updatedEvents = await Promise.all(eventsData.map(async (event) => {
          // Suponha que cada evento tenha um artistId
          const artistId = event.artistId;  // Substitua pelo nome correto de onde vem o ID do artista

          // Busca os dados do artista com o id
          const artistResponse = await fetch(`https://api.artic.edu/api/v1/agents/${artistId}`);
          
          if (!artistResponse.ok) {
            throw new Error(`Falha ao buscar o artista para o evento: ${event.id}`);
          }

          const artistData = await artistResponse.json();
          const artistTitle = artistData.data.title;  // Acessando o título do artista

          // Atualiza os dados do evento com o nome do artista
          return {
            ...event,
            artist: artistTitle,  // Atualiza o nome do artista
          };
        }));

        // Atualiza os eventos no estado do componente
        this.events = updatedEvents;

      } catch (error) {
        console.error("Erro ao carregar os eventos:", error.message);
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },

    prevPage() {
      if (this.currentPage > 1) this.currentPage--;
    },

    handleFavorite(event) {
      console.log(`Toggled favorite for: ${event.title}`);
    },
  },
  mounted() {
    // Chama a função para carregar os eventos assim que o componente for montado
    this.fetchEvents();
  },
};
</script>



<style scoped>
.content {
  margin-top: 130px;
  margin-bottom: 180px;
}

.event-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  /* Permite múltiplas linhas */
  justify-content: flex-start;
  /* Alinha os cards ao início da linha */
  padding-bottom: 16px;
  padding-top: 16px;
  gap: 12px;
  /* Espaçamento dinâmico entre os cards */
}

.event-list>div {
  flex: 1 0 calc(20% - 10px);
  /* Cada card ocupa 20% do espaço disponível */
  max-width: calc(20% - 10px);
  /* Mantém o tamanho proporcional */
  box-sizing: border-box;
  /* Inclui padding e border no tamanho total */
}

.event-list>div:nth-last-child(-n+5) {
  flex: 1 0 calc(20% - 10px);
  /* Mesmo comportamento para menos de 5 cards */
}

.title-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 4px solid #E4E3E6FF;
  padding-left: 10px;
  margin-top: 20px;
}

.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}

.pagination button {
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination button:hover:not(:disabled) {
  background-color: #0056b3;
}

.pagination button:disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
}

.pagination span {
  font-weight: bold;
  color: #555;
}

</style>