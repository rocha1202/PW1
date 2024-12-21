import { defineStore } from 'pinia';


export const useParticipantsStore = defineStore('participants', {
  state: () => ({
    participants: [], // Armazena a lista de participantes registados
    progress: {}, // Armazena o progresso dos participantes nos desafios, indexado pelo ID do desafio
    notifications: [], // Armazena as notificações enviadas aos participantes
    eventRegistrations: [], // Armazena os IDs dos eventos em que o participante se registrou
  }),

  
  getters: {
    // Retorna todos os participantes
    getParticipants: (state) => state.participants,
    
    // Retorna todas as notificações
    getNotifications: (state) => state.notifications,
    
    // Retorna os IDs dos eventos em que o participante se registou
    getEventRegistrations: (state) => state.eventRegistrations,

  },

  actions: {
    // Regista um novo participante
    registerParticipant(participant) {
      this.participants.push(participant); // Adiciona o participante à lista de participantes
    },

    // Atualiza o progresso de um participante em um desafio específico
    updateProgress({ challengeId, progress }) {
      this.progress[challengeId] = progress; // Atualiza o progresso do desafio com o ID fornecido
    },

    // Adiciona uma nova notificação à lista de notificações
    addNotification(notification) {
      this.notifications.push(notification); // Adiciona a notificação à lista
    },

    // Regista o participante em um evento específico, pelo ID do evento
    registerToEvent(eventId) {
      this.eventRegistrations.push(eventId); // Adiciona o ID do evento à lista de registos
    },
  },
});
