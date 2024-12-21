import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null,
    userRole: null,
    accounts: [
      { id: 1, email: 'beatriz@email.com', password: '1234', role: 'organizer' },
      { id: 2, email: 'ines@email.com', password: '1234', role: 'participant' },
      { id: 3, email: 'sergio@email.com', password: '1234', role: 'volunteer' },
    ],
  }),
  getters: {
    getUser: (state) => state.user,
    getUserRole: (state) => state.userRole,
    getAccounts: (state) => state.accounts,
    isUserAuthenticated: (state) => state.isAuthenticated,
    getUserById: (state) => (id) => state.accounts.find((user) => user.id === id),
  },
  actions: {
    login(email, password) {
      const user = this.accounts.find(
        (account) => account.email === email && account.password === password
      );

      if (user) {
        const token = `mock-token-${user.id}`; // Simula um token gerado
        this.isAuthenticated = true;
        this.user = user;
        this.userRole = user.role;
        this.token = token;
        return true; // Login bem-sucedido
      } else {
        throw new Error('Email ou senha inválidos.');
      }
    },
    createAccount(email, password, role) {
      const emailExists = this.accounts.some((account) => account.email === email);
      if (emailExists) {
        throw new Error('O email já está em uso. Tente outro.');
      }
      const newAccount = {
        id: this.accounts.length + 1,
        email,
        password,
        role,
      };
      this.accounts.push(newAccount);
      console.log('Conta criada:', newAccount);
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      this.userRole = null;
    },
  },
});
