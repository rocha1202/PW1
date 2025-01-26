import { defineStore } from 'pinia';

export const useFeedbackStore = defineStore('feedback', {
  state: () => ({
    feedbacks: [], // Lista de feedbacks
    isAuthenticated: false, // Verifica se o utilizador está autenticado
  }),
  getters: {
    getFeedbacks: (state) => state.feedbacks, // Obtém todos os feedbacks
    isUserAuthenticated: (state) => state.isAuthenticated, // Verifica se o utilizador está autenticado
  },
  actions: {
    // Define se o utilizador está autenticado
    authenticateUser(isAuth) {
      this.isAuthenticated = isAuth;
    },

    // Adiciona um feedback (string) se o utilizador estiver autenticado
    addFeedback(feedbackText) {
      if (!this.isAuthenticated) {
        throw new Error('Only authenticated users can add feedback..');
      }
      if (typeof feedbackText !== 'string' || !feedbackText.trim()) {
        throw new Error('Feedback must be valid text.');
      }
      this.feedbacks.push(feedbackText.trim()); // Adiciona o feedback à lista
    },
  },
});
