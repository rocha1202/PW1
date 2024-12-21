import { defineStore } from 'pinia';

export const useArtistStore = defineStore('artistStore', {
  state: () => ({
    artists: [
      {
        id: 1,
        nome: 'Maria Silva',
        idade: 34,
        descricao: 'Artista de música clássica.',
      },
      {
        id: 2,
        nome: 'João Costa',
        idade: 28,
        descricao: 'Pintor de paisagens urbanas.',
      },
      // Adicionar mais artistas
    ],
  }),
  getters: {
    // Retorna todos os artistas
    getAllArtists: (state) => state.artists,

    // Retorna um artista específico pelo ID
    getArtistById: (state) => {
      return (id) => state.artists.find(artist => artist.id === id);
    },
  },
  actions: {
    // Adicionar um novo artista
    addArtist(artist) {
      this.artists.push(artist);
    },

    // Atualizar as informações de um artista
    updateArtist(updatedArtist) {
      const index = this.artists.findIndex(artist => artist.id === updatedArtist.id);
      if (index !== -1) {
        this.artists[index] = updatedArtist;
      }
    },

    // Remover um artista pelo ID
    removeArtist(id) {
      this.artists = this.artists.filter(artist => artist.id !== id);
    },
  },
});
