import { defineStore } from 'pinia';
import { useArtistStore } from './artistStore';  // Importando a store do artista

export const useTicketStore = defineStore('Ticket', {
  state: () => ({
    tickets: JSON.parse(localStorage.getItem('tickets')) || [
      {
        id: 1,
        name: 'Museu de Arte Contemporânea',
        description: 'Descrição do Museu Contemporâneo',
        image: 'https://via.placeholder.com/600x400',
        price: 50,
        quantity: 5,
        date: '2025-06-01',
        time: '10:00',
        location: 'Rua da Arte, 123, Porto, PT',
        type: 'museum',
        category: 'normal',
        artistIds: [1, 2], // IDs dos artistas relacionados ao evento
        details: {
          speakers: ['José Silva', 'Maria Costa'],
          program: 'Abertura às 10:00, Exposição às 11:00',
        },
      },
      {
        id: 2,
        name: 'Workshop de Pintura',
        description: 'Aprenda técnicas básicas de pintura',
        image: 'https://via.placeholder.com/600x400',
        price: 100,
        quantity: 10,
        date: '2025-06-05',
        time: '14:00',
        location: 'Rua das Artes, 456, Lisboa, PT',
        type: 'workshop',
        category: 'VIP',
        artistIds: [1], // Apenas um artista relacionado ao workshop
        details: {
          speakers: ['João Oliveira'],
          program: 'Introdução às 14:00, Prática às 15:00',
        },
      },
    ],
  }),
  getters: {
    allTickets: (state) => state.tickets,

    getTicketById: (state) => (id) => state.tickets.find((ticket) => ticket.id === id),

    // Obtém os detalhes do(s) artista(s) de um evento com base nos IDs
    getArtistsForTicket: (state) => (ticketId) => {
      const ticket = state.tickets.find((ticket) => ticket.id === ticketId);
      if (ticket) {
        const artistStore = useArtistStore();
        return ticket.artistIds.map((artistId) => artistStore.getArtistById(artistId));
      }
      return [];
    },
  },
  actions: {
    addTicket(ticket) {
      const newTicket = {
        id: Date.now(),
        ...ticket,
      };

      if (!newTicket.name || !newTicket.price || !newTicket.date || !newTicket.location) {
        throw new Error('Campos obrigatórios não preenchidos!');
      }

      this.tickets.push(newTicket);
      this._updateLocalStorage();
    },

    updateTicket(updatedTicket) {
      const index = this.tickets.findIndex((ticket) => ticket.id === updatedTicket.id);
      if (index !== -1) {
        this.tickets[index] = { ...this.tickets[index], ...updatedTicket };
        this._updateLocalStorage();
      } else {
        throw new Error('Bilhete não encontrado.');
      }
    },

    removeTicket(ticketId) {
      this.tickets = this.tickets.filter((ticket) => ticket.id !== ticketId);
      this._updateLocalStorage();
    },

    _updateLocalStorage() {
      localStorage.setItem('tickets', JSON.stringify(this.tickets));
    },
  },
});
