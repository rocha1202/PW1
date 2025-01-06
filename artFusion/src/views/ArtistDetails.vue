<template>
    <div>
      <h1>Detalhes do Artista</h1>
      <div v-if="artist">
        <p><strong>Nome:</strong> {{ artist.title }}</p>
        <p><strong>Data de Nascimento:</strong> {{ artist.birth_date }}</p>
        <p v-if="artist.death_date"><strong>Data de Falecimento:</strong> {{ artist.death_date }}</p>
        <p v-else><strong>Data de Falecimento:</strong> Ainda vivo</p>
      <!-- Botão para voltar -->
    <button class="back-button" @click="goBack">Voltar para a Loja</button>
  </div>
      <div v-else>
        <p>Carregando detalhes do artista...</p>
      </div>
    </div>
  </template>
  
  <script>
  import { useArtistStore } from "@/stores/artistStore";
  
  export default {
    data() {
      return {
        artist: {},
      };
    },
    async created() {
      const artistId = this.$route.params.id; // Obtém o ID do artista da rota
      const artistStore = useArtistStore();
  
      // Verifica se o artista já está na store
      const existingArtist = artistStore.getArtistById(artistId);
      if (existingArtist) {
        this.artist = existingArtist;
      } else {
        // Caso contrário, busca o artista diretamente na API
        try {
          const response = await fetch(`https://api.artic.edu/api/v1/agents/${artistId}`);
          const data = await response.json();
          this.artist = data.data;
        } catch (error) {
          console.error("Erro ao carregar os detalhes do artista:", error);
        }
      }
    },
    methods: {
    goBack() {
      this.$router.push({ name: 'StoreView' }); // Nome da rota da StoreView
    },
  },
};
  </script>

  <style scoped>
  .back-button {
  background-color: #f44336; /* Vermelho */
  color: white; /* Cor do texto */
  border: none; /* Sem borda */
  border-radius: 8px; /* Bordas arredondadas */
  padding: 10px 15px; /* Espaçamento interno */
  font-size: 16px; /* Tamanho da fonte */
  font-weight: bold; /* Texto em negrito */
  cursor: pointer; /* Mãozinha ao passar o mouse */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Sombra */
  transition: all 0.3s ease; /* Suavização */
}

.back-button:hover {
  background-color: #e53935; /* Cor mais escura ao passar o mouse */
  transform: scale(1.05); /* Efeito de hover */
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3); /* Sombra mais intensa */
}

.back-button:active {
  transform: scale(0.95); /* Efeito de clique */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Sombra reduzida */
}
  </style>
  