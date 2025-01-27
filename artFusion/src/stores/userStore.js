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
    purchasedTickets: [], // Armazena tickets comprados
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
        throw new Error('This user is blocked and cannot access the system. \nContact your administrator.');
      }

      const token = `mock-token-${user.id}`; // Simula um token gerado
      this.isAuthenticated = true;
      this.user = user;  // Armazena o usuário logado
      this.userRole = user.role;
      this.token = token;
      this.profile = { ...user }; // Preenche o perfil
      return true;
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      this.userRole = null;
      this.profile = { name: '', email: '', birthdate: '', password: '', avatar: defaultAvatar };
    },
    updateProfile(updatedUserData) {
      if (this.user) {
        const userId = this.user.id;

        const userIndex = this.accounts.findIndex(account => account.id === updatedUserData.id);

        if (userIndex !== -1) {
          if (updatedUserData.id === userId || this.userRole === 'admin') {
            this.accounts[userIndex] = { ...this.accounts[userIndex], ...updatedUserData };
            this.profile = { ...this.accounts[userIndex] };
          } else {
            throw new Error("You do not have permission to edit this profile..");
          }
        } else {
          throw new Error("User not found.");
        }
      } else {
        throw new Error("Unauthenticated user.");
      }
    },

    buyTicket(ticket) {
      if (!this.purchasedTickets.find((t) => t.id === ticket.id)) {
        this.purchasedTickets.push(ticket);
      } else {
        throw new Error("You have already purchased this ticket.");
      }
    },
    removeTicket(ticketId) {
      this.purchasedTickets = this.purchasedTickets.filter(ticket => ticket.id !== ticketId);
    },
    createAccount(email, password, role = 'user', name = '', birthdate = '', avatar) {
      const emailExists = this.accounts.some((account) => account.email === email);
      if (emailExists) {
        throw new Error('Email is already in use. Try another one.');
      }

      const newAccount = {
        id: this.accounts.length + 1,
        email,
        password,
        role,
        name,
        birthdate,
        avatar: avatar || defaultAvatar,
      };
      this.accounts.push(newAccount);
    },
    blockUser(userId) {
      const userIndex = this.accounts.findIndex((user) => user.id === userId);
      if (userIndex !== -1) {
        this.accounts[userIndex].isBlocked = !this.accounts[userIndex].isBlocked;
      } else {
        throw new Error("User not found.");
      }
    }
  },
});
