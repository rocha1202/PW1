import { defineStore } from 'pinia';

export const useUserStore = defineStore('account', {
  state: () => ({
    isUserAuthenticated: false,
    user: null,
    accounts: [
      { id:1, email: 'beatriz@email.com', password: '1234' },
      {  id:2, email: 'ines@email.com', password: '1234' },
      { id:3,  email: 'sergio@email.com', password: '1234' },
    ],
  }),
  getters: {
    getUser: (state) => state.user,
    getUsers: (state) => state.accounts,
    getUserId: (state) => (id) => state.accounts.find((user) => user.id == id),
    isUser: (state) => state.isUserAuthenticated,
    isAuthenticated: (state) => state.isUserAuthenticated,
  },
  actions: {
    login(email, password) {
      const user = this.accounts.find(
        (account) => account.email === email && account.password === password
      );

      if (user) {
        this.isUserAuthenticated = true;
        this.user = user;
        return true; // Login bem-sucedido
      } else {
        throw new Error("Email ou senha inválidos.");
      }
    },
    createAccount(email, password) {
      const emailExists = this.accounts.some((account) => account.email === email);
      if (emailExists) {
        throw new Error('O email já está em uso. Tente outro.');
      }
      this.accounts.push({ email, password });
      console.log('Conta criada:', { email, password });
    },
    logout() {
      this.isUserAuthenticated = false;
      this.user = null;
    },
  },
});
