import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notificationStore', {
  state: () => ({
    notifications: [
      {
        id: 1,
        titulo: "Mudança de horário",
        mensagem: "O concerto de abertura foi reagendado para 20:00.",
        data: "2024-01-15",
        tipo: "alteracao",
        visto: false
      },
      {
        id: 2,
        titulo: "Novo Workshop",
        mensagem: "Novo workshop de pintura com João Costa adicionado à agenda!",
        data: "2024-01-10",
        tipo: "adicao",
        visto: false
      }
    ]
  }),
  getters: {
    // Retorna todas as notificações
    getAllNotifications: (state) => state.notifications,

    // Filtra notificações não vistas
    getUnreadNotifications: (state) => state.notifications.filter(notification => !notification.visto)
  },
  actions: {
    // Adicionar uma nova notificação
    addNotification(notification) {
      this.notifications.push(notification);
    },

    // Marcar uma notificação como vista
    markAsRead(notificationId) {
      const notification = this.notifications.find(notification => notification.id === notificationId);
      if (notification) {
        notification.visto = true;
      }
    }
  }
});
