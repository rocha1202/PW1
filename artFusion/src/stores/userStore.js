import { defineStore } from 'pinia';

import defaultAvatar from '@/assets/Account.png';

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null,
    userRole: null,
    accounts: [
      { id: 1, email: 'beatriz@email.com', password: '1234', role: 'organizer', name: 'Beatriz', birthdate: '2000-01-01', avatar: defaultAvatar, isBlocked: false },
      { id: 2, email: 'ines@email.com', password: '1234', role: 'admin', name: 'Ines', birthdate: '2000-01-01', avatar: defaultAvatar, isBlocked: false },
      { id: 3, email: 'sergio@email.com', password: '1234', role: 'admin', name: 'Sergio', birthdate: '2000-01-01', avatar: defaultAvatar, isBlocked: false },
      { id: 4, email: 'joanalmeida@gmail.com', password: 'teste1', role: 'user', name: "Joana", birthdate: '2000-01-01', avatar: defaultAvatar, isBlocked: false },
    
    ],
    profile: {
      name: '',
      email: '',
      birthdate: '',
      password: '',
      avatar: defaultAvatar,
    },
    purchasedTickets: [], // Armazena tickets comprado

  }),

  getters: {
    getUser: (state) => state.user,
    getUserRole: (state) => state.userRole,
    getAccounts: (state) => state.accounts,
    isUserAuthenticated: (state) => state.isAuthenticated,
    getUserById: (state) => (id) => state.accounts.find((user) => user.id === id),
    getProfile: (state) => state.profile,
  },

  actions: {
    login(email, password) {
      const user = this.accounts.find(
        (account) => account.email === email && account.password === password
      );

      if (!user) {
        throw new Error('Invalid email or password.');
      }

      if (user.isBlocked) {
        throw new Error('This user is blocked and cannot access the system. \n Contact your administrator.');
      }

      const token = `mock-token-${user.id}`; // Simula um token gerado
      this.isAuthenticated = true;
      this.user = user;
      this.userRole = user.role;
      this.token = token;
      this.profile = { ...user }; // Preenche o perfil 
      return true;
    },

    updateProfile(newProfile) {
      const { email, name, birthdate, password, avatar } = newProfile;
      if (this.user) {
        this.user = { ...this.user, email, name, birthdate, password, avatar };
        this.profile = { email, name, birthdate, password, avatar };
      }
    },

    deleteUser(userId) {
      this.accounts = this.accounts.filter((u) => u.id !== userId);
    },

    blockUser(userId) {
      const user = this.getUserById(userId);
      if (user) {
        user.isBlocked = !user.isBlocked;
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      this.userRole = null;
      this.profile = { name: '', email: '', birthdate: '', password: '', avatar: defaultAvatar };
    },
    buyTicket(ticket) {
      if (!this.purchasedTickets.find((t) => t.id === ticket.id)) {
        this.purchasedTickets.push(ticket);
      } else {
        throw new Error("Você já comprou este bilhete.");
      }
    },
    removeTicket(ticketId) {
      this.purchasedTickets = this.purchasedTickets.filter(ticket => ticket.id !== ticketId);
    },
  },
});

