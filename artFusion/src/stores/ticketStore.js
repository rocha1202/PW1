import { defineStore } from "pinia";
import { useArtistStore } from "./artistStore"; // Importando a store do artista

export const useTicketStore = defineStore("Ticket", {
  state: () => ({
    tickets: JSON.parse(localStorage.getItem("tickets")) || [
      {
        id: 1,
        name: "Museu de Arte Contemporânea",
        description: "Descrição do Museu Contemporâneo",
        image: "https://via.placeholder.com/600x400",
        price: 50,
        quantity: 5,
        date: "2025-06-01",
        time: "10:00",
        location: "Rua da Arte, 123, Porto, PT",
        type: "museum",
        category: "normal",
        artistIds: [116823], // Usando o ID de artista da API
        details: {
          speakers: ["José Silva", "Maria Costa"],
          program: "Abertura às 10:00, Exposição às 11:00",
        },
      },
      {
        id: 2,
        name: "Workshop de Pintura",
        description: "Aprenda técnicas básicas de pintura",
        image: "https://via.placeholder.com/600x400",
        price: 100,
        quantity: 10,
        date: "2025-06-05",
        time: "14:00",
        location: "Rua das Artes, 456, Lisboa, PT",
        type: "workshop",
        category: "VIP",
        artistIds: [119388], // Usando o ID de artista da API
        details: {
          speakers: ["João Oliveira"],
          program: "Introdução às 14:00, Prática às 15:00",
        },
      },
    ],
  }),
  getters: {
    allTickets: (state) => state.tickets,

    getTicketById: (state) => (id) =>
      state.tickets.find((ticket) => ticket.id === id),
  },
  actions: {
    async getArtistsForTicket(ticketId) {
      const ticket = this.tickets.find((ticket) => ticket.id === ticketId);
      if (ticket) {
        const artistStore = useArtistStore();

        // Carregar os artistas se ainda não estiverem carregados
        if (artistStore.artists.length === 0) {
          await artistStore.fetchArtists(1, 12); // Aguarda até que os artistas sejam carregados
        }

        // Mapeia os IDs de artistas para pegar seus nomes
        return ticket.artistIds
          .map((artistId) => {
            const artist = artistStore.getArtistById(artistId); // Chama a função getArtistById
            console.log(`Buscando artista com ID ${artistId}:`, artist);
            if (artist) {
              return artist.title; // Alterando de 'name' para 'title'
            }
            return null; // Retorna null se o artista não existir
          })
          .filter((name) => name !== null); // Filtra para remover valores nulos
      }
      return []; // Retorna um array vazio se o ticket não for encontrado
    },

    //métodos para manipular os tickets
    addTicket(ticket) {
      const newTicket = {
        id: Date.now(),
        ...ticket,
      };

      if (
        !newTicket.name ||
        !newTicket.price ||
        !newTicket.date ||
        !newTicket.location
      ) {
        throw new Error("Campos obrigatórios não preenchidos!");
      }

      this.tickets.push(newTicket);
      this._updateLocalStorage();
    },

    updateTicket(updatedTicket) {
      const index = this.tickets.findIndex(
        (ticket) => ticket.id === updatedTicket.id
      );
      if (index !== -1) {
        this.tickets[index] = { ...this.tickets[index], ...updatedTicket };
        this._updateLocalStorage();
      } else {
        throw new Error("Bilhete não encontrado.");
      }
    },

    removeTicket(ticketId) {
      this.tickets = this.tickets.filter((ticket) => ticket.id !== ticketId);
      this._updateLocalStorage();
    },

    _updateLocalStorage() {
      localStorage.setItem("tickets", JSON.stringify(this.tickets));
    },
  },
});
