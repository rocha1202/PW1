// src/stores/volunteerStore.js
import { defineStore } from 'pinia';
import { useUserStore } from '@/stores/userStore'; // Para verificar se o usesr é voluntário

export const useVolunteerStore = defineStore('volunteerStore', {
  state: () => ({
    volunteers: [
      {
        id: 1,
        userId: 1,  // Relacionado a um user
        tarefa: "Recepção de participantes",
        eventoId: 1, // Relacionado ao evento
        horario: "2024-01-15 17:00"
      }
    ]
  }),
  getters: {
    // Retorna todos os voluntários
    getAllVolunteers: (state) => state.volunteers,

    // Retorna voluntários de um evento específico
    getVolunteersByEvent: (state) => (eventoId) => {
      return state.volunteers.filter(volunteer => volunteer.eventoId === eventoId);
    },

    // Verifica se um usuário é voluntário
    isVolunteer: (state) => {
      const userStore = useUserStore();
      return userStore.user && state.volunteers.some(volunteer => volunteer.userId === userStore.user.id);
    }
  },
  actions: {
    // Adicionar um novo voluntário
    addVolunteer(volunteer) {
      this.volunteers.push(volunteer);
    },

    // Remover voluntário
    removeVolunteer(volunteerId) {
      this.volunteers = this.volunteers.filter(volunteer => volunteer.id !== volunteerId);
    }
  }
});
