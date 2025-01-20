import { defineStore } from 'pinia';

// Caminho para a imagem do avatar padrão
import defaultAvatar from '@/assets/Account.png';

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    token: null,
    userRole: null,
    accounts: [
      { id: 1, email: 'beatriz@email.com', password: '1234', role: 'organizer', name: 'Beatriz', birthdate: '2000-01-01', avatar: defaultAvatar },
      { id: 2, email: 'ines@email.com', password: '1234', role: 'admin', name: 'Ines', birthdate: '2000-01-01', avatar: defaultAvatar },
      { id: 3, email: 'sergio@email.com', password: '1234', role: 'admin', name: 'Sergio', birthdate: '2000-01-01', avatar: defaultAvatar },
    ],
    profile: {
      name: '',
      email: '',
      birthdate: '',
      password: '',
      avatar: defaultAvatar, // Avatar padrão
    },
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

      if (user) {
        const token = `mock-token-${user.id}`; // Simula um token gerado
        this.isAuthenticated = true;
        this.user = user;
        this.userRole = user.role;
        this.token = token;
        this.profile = { ...user }; // Preenche o perfil do usuário com os dados da conta
        return true; // Login bem-sucedido
      } else {
        throw new Error('Email ou senha inválidos.');
      }
    },

    updateProfile(newProfile) {
      const { email, name, birthdate, password, avatar } = newProfile;
      
      if (this.user) {
        // Atualiza o perfil do usuário
        this.user = { ...this.user, email, name, birthdate, password, avatar };
        this.profile = { email, name, birthdate, password, avatar }; // Atualiza o estado do perfil
      }
    },

    createAccount(email, password, role, name, birthdate, avatar) {
      const emailExists = this.accounts.some((account) => account.email === email);
      if (emailExists) {
        throw new Error('O email já está em uso. Tente outro.');
      }
      const newAccount = {
        id: this.accounts.length + 1,
        email,
        password,
        role,
        name,
        birthdate,
        avatar: avatar || defaultAvatar, // Se avatar não for passado, usa o avatar padrão
      };
      this.accounts.push(newAccount);
      console.log('Conta criada:', newAccount);
    },

    logout() {
      this.isAuthenticated = false;
      this.user = null;
      this.token = null;
      this.userRole = null;
      this.profile = { name: '', email: '', birthdate: '', password: '', avatar: defaultAvatar };
    },
  },
});
