<template>
  <div>
    <Navbar />
    <br><br><br><br>
    <h1>Store</h1>

    <br>
    <h2>Feedbacks</h2>
    <div v-for="(feedback, index) in feedbackStore.getFeedbacks" :key="index">
      <p>{{ feedback }}</p>
    </div>
    <br>
    <br>
    <!-- Exibindo os itens de merchandising -->
    <h2>Itens de Merchandising</h2>
    <div v-for="merch in merchStore.getAllMerchandise" :key="merch.id">
      <p>{{ merch.nome }}</p>
      <p>{{ merch.descricao }}</p>
      <p>Preço: {{ merch.preco }}€</p>
      <img :src="`/path/to/images/${merch.imagem}`" :alt="merch.nome" />
    </div>
    <br>
    <!-- Exibindo os eventos do organizador -->
    <h2>Eventos</h2>
    <div v-for="event in organizersStore.getEvents" :key="event.id">
      <p>{{ event.nome }}</p>
      <p>{{ event.data }}</p>
    </div>
    <br>
    <!-- Exibindo as notificações do organizador -->
    <h2>Notificações</h2>
    <div v-for="notification in organizersStore.getNotifications" :key="notification.id">
      <div :class="notification.visto ? 'read' : 'unread'">
        <h3>{{ notification.titulo }}</h3>
        <p>{{ notification.mensagem }}</p>
        <p>Data: {{ notification.data }}</p>
      </div>
    </div>
    <br>
    <!-- Exibindo os voluntários -->
    <h2>Voluntários</h2>
    <div v-for="volunteer in organizersStore.getVolunteers" :key="volunteer.id">
      <p>{{ volunteer.nome }}</p>
      <p>{{ volunteer.email }}</p>
    </div>
    <br>
    <!-- Exibindo os participantes -->
    <h2>Participantes</h2>
    <div v-for="participant in participantsStore.getParticipants" :key="participant.id">
      <p>{{ participant.nome }}</p>
      <p>{{ participant.email }}</p>
    </div>
    <br>
    <!-- Exibindo o progresso dos participantes -->
    <h2>Progresso dos Participantes</h2>
    <div v-for="(progress, challengeId) in participantsStore.progress" :key="challengeId">
      <p><strong>Desafio {{ challengeId }}: </strong>{{ progress }}</p>
    </div>
    <br>
    <!-- Exibindo as notificações dos participantes -->
    <h2>Notificações dos Participantes</h2>
    <div v-for="notification in participantsStore.getNotifications" :key="notification.id">
      <div :class="notification.visto ? 'read' : 'unread'">
        <h3>{{ notification.titulo }}</h3>
        <p>{{ notification.mensagem }}</p>
        <p>Data: {{ notification.data }}</p>
      </div>
    </div>
    <br>
    <!-- Exibindo os eventos registrados pelos participantes -->
    <h2>Eventos Registrados</h2>
    <div v-for="eventId in participantsStore.getEventRegistrations" :key="eventId">
      <p>Evento ID: {{ eventId }}</p>
    </div>
    <br>
    <!-- Exibindo os bilhetes -->
    <h2>Bilhetes</h2>
    <div v-for="ticket in ticketStore.allTickets" :key="ticket.id">
      <p>{{ ticket.name }}</p>
      <p>{{ ticket.description }}</p>
      <p>Preço: {{ ticket.price }}€</p>
      <p>Data: {{ ticket.date }}</p>
      <p>Localização: {{ ticket.location }}</p>
      <img :src="ticket.image" :alt="ticket.name" />
      <p>Categoria: {{ ticket.category }}</p>
      <p>Quantidade disponível: {{ ticket.quantity }}</p>
      <p><strong>Oradores:</strong> {{ ticket.details.speakers.join(", ") }}</p>
      <p><strong>Programa:</strong> {{ ticket.details.program }}</p>

      <!-- Exibindo os artistas relacionados a um bilhete -->
      <div v-if="artists[ticket.id] && artists[ticket.id].length">
        <p>Artistas:</p>
        <div v-for="artistName in artists[ticket.id]" :key="artistName">
          <span>{{ artistName }}</span>
          <p>
          <!-- Botão para conhecer o artista -->
          <button class="artist-button" @click="goToArtistDetails(artist.id)">Conhecer Artista</button>
          </p>
        </div>
      </div>
      <div v-else>
        <p>A carregar Artista ou sem Artista definido.</p>
      </div>

      <br>nop
    </div>

    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Footer from '@/components/footer.vue';
import { useArtistStore } from '../stores/artistStore'; // Importe a store de artistas // Importando a store de artistas
import { useFeedbackStore } from '@/stores/feedbackStore'; // Importando a store de feedbacks
import { useMerchStore } from '@/stores/merchStore'; // Importando a store de merchandising
import { useNotificationStore } from '@/stores/notificationStore'; // Importando a store de notificações
import { useOrganizersStore } from '@/stores/organizersStore'; // Importando a store de organizadores
import { useParticipantsStore } from '@/stores/participantStore'; // Importando a store de participantes
import { useTicketStore } from '@/stores/ticketStore'; // Importando a store de bilhetes

export default {
  name: 'StoreView',
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const feedbackStore = useFeedbackStore(); // Acessa a store de feedbacks
    const merchStore = useMerchStore(); // Acessa a store de merchandising
    const notificationStore = useNotificationStore(); // Acessa a store de notificações
    const organizersStore = useOrganizersStore(); // Acessa a store de organizadores
    const participantsStore = useParticipantsStore(); // Acessa a store de participantes
    const ticketStore = useTicketStore(); // Acessa a store de bilhetes

    // Carrega os dados de artistas ao montar o componente
    //artistStore.fetchArtists();

    return {  
      feedbackStore, 
      merchStore, 
      notificationStore, 
      organizersStore, 
      participantsStore, 
      ticketStore
    }; // Disponibiliza as stores no template
  },
  data() {
    return {
      artists: {}, // Armazenar os nomes dos artistas por ticket
    };
  },
  computed: {
    ticketStore() {
      return useTicketStore();
    },
    tickets() {
      return this.ticketStore.allTickets;
    }
  },
  async mounted() {
    // Carrega todos os artistas se não estiverem carregados
    const artistStore = useArtistStore();
    if (artistStore.artists.length === 0) {
      console.log("Carregando artistas...");
      await artistStore.fetchArtists(1, 12);
    }
   else {
    console.log("Artistas já carregados.");
  }

  console.log("Estado de carregamento:", artistStore.loading);
  console.log("Erro ao carregar artistas:", artistStore.error);
  console.log("Artistas carregados:", artistStore.artists);

    // Popula os artistas relacionados a cada ticket
    await this.loadArtistsForTickets();
  },
  methods: {
    async loadArtistsForTickets() {
      const ticketStore = this.ticketStore;
      const artistsForTickets = {};

      // Log para depuração dentro do loop
      for (const ticket of ticketStore.allTickets) {
        const artistNames = await ticketStore.getArtistsForTicket(ticket.id);
        artistsForTickets[ticket.id] = artistNames;

        // Log para depuração
        console.log(`Artistas para o bilhete ${ticket.id}:`, artistNames);
      }

      // Atualiza o estado de artists
      this.artists = artistsForTickets;
    },
    goToArtistDetails(artistId) {
    // Redireciona para a página de detalhes do artista
    this.$router.push({ name: "ArtistaDetails", params: { id: artistId } });
  },
  },
};
</script>

<style scoped>
.read {
  background-color: #f0f0f0;
  opacity: 0.6;
}
.unread {
  background-color: #ffeeba;
  font-weight: bold;
}
.store-view {
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
}

.error-message {
  color: red;
  text-align: center;
}

.loading {
  text-align: center;
}

.artists-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.artist-card {
  background-color: #0e59fa;
  padding: 15px;
  margin: 10px;
  border-radius: 8px;
  width: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.artist-card h2 {
  font-size: 1.2em;
  margin-bottom: 10px;
}

.artist-card p {
  font-size: 1em;
}

.artist-button {
  background-color: #4caf50; 
  color: white; 
  border: none; 
  border-radius: 8px; 
  padding: 10px 15px; 
  font-size: 16px; 
  font-weight: bold; 
  cursor: pointer; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); 
  transition: all 0.3s ease; 
}

.artist-button:hover {
  background-color: #45a098; 
  transform: scale(1.05); 
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3); 
}

.artist-button:active {
  transform: scale(0.95); 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
}
</style>
