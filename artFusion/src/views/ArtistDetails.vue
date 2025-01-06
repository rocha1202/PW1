<template>
    <div>
      <h1>Detalhes do Artista</h1>
      <div v-if="artist">
        <p><strong>Nome:</strong> {{ artist.title }}</p>
        <p><strong>Data de Nascimento:</strong> {{ artist.birth_date }}</p>
        <p v-if="artist.death_date"><strong>Data de Falecimento:</strong> {{ artist.death_date }}</p>
        <p v-else><strong>Data de Falecimento:</strong> Ainda vivo</p>
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
      this.$router.push({ name: 'StoreView' }); 
    },
  },
};
  </script>

  <style scoped>
  .back-button {
  background-color: #f44336; 
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

.back-button:hover {
  background-color: #e53935; 
  transform: scale(1.05); 
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.3); 
}

.back-button:active {
  transform: scale(0.95); 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
}
  </style>
  