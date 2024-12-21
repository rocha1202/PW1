import { defineStore } from 'pinia';

export const useOrganizersStore = defineStore('organizers', {
  state: () => ({
    events: [], // Armazena a lista de eventos gerenciados pelo organizador
    notifications: [], // Armazena as notificações enviadas
    merchandise: [], // Armazena os itens de merchandising do evento
    volunteers: [], // Armazena os voluntários associados ao evento
  }),

  getters: {
    // Retorna todos os eventos
    getEvents: (state) => state.events,
    
    // Retorna todas as notificações
    getNotifications: (state) => state.notifications,
    
    // Retorna todos os itens de merchandising
    getMerchandise: (state) => state.merchandise,
    
    // Retorna todos os voluntários
    getVolunteers: (state) => state.volunteers,
    
    // Retorna um evento específico pelo seu ID
    getEventById: (state) => (eventId) => state.events.find((e) => e.id === eventId),
  },

  actions: {
    // Cria um novo evento e adiciona à lista de eventos
    createEvent(event) {
      this.events.push(event);
    },

    // Edita um evento existente. Recebe o ID do evento e os detalhes para atualizar
    editEvent({ eventId, details }) {
      const event = this.events.find((e) => e.id === eventId);
      if (event) {
        Object.assign(event, details); // Atualiza o evento com os novos detalhes
      }
    },

    // Envia uma nova notificação e adiciona à lista de notificações
    sendNotification(notification) {
      this.notifications.push(notification);
    },

    // Adiciona um novo item de merchandising à lista
    addMerchandise(merchandise) {
      this.merchandise.push(merchandise);
    },

    // Gerencia a lista de voluntários, adiciona um novo voluntário à lista
    manageVolunteers(volunteer) {
      this.volunteers.push(volunteer);
    },
  },
});
