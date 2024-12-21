import { defineStore } from 'pinia';

export const useMerchStore = defineStore('merchStore', {
  state: () => ({
    merchandise: [
      {
        id: 1,
        nome: "Camisola do Pintor",
        descricao: "Camisola exclusiva do evento com o logo.",
        preco: 30,
        eventoId: 1,    // Relacionado ao evento
        artistId: 101,  // Relacionado ao artista
        imagem: "camiseta_pintor.jpg" //!colocar imagem
      },
      {
        id: 2,
        nome: "Cartaz do Pintor",
        descricao: "Cartaz exclusivo da arte de João Costa.",
        preco: 15,
        eventoId: 2,    // Relacionado ao evento
        artistId: 102,  // Relacionado ao artista
        imagem: "poster_joao_costa.jpg" //!colocar imagem
      }
    ]
  }),
  getters: {
    // Retorna todos os itens de merchandising
    getAllMerchandise: (state) => state.merchandise,

    // Filtra itens de merchandising por evento ou artista
    getMerchByEventOrArtist: (state) => ({ eventoId, artistId }) => {
      return state.merchandise.filter(item => item.eventoId === eventoId || item.artistId === artistId);
    }
  },
  actions: {
    // Adicionar um novo item de merchandising
    addMerch(item) {
      this.merchandise.push(item);
    },

    // Remover item de merchandising
    removeMerch(id) {
      this.merchandise = this.merchandise.filter(item => item.id !== id);
    }
  }
});
