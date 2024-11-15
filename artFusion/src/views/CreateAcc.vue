<template>
    <div>
      <h3>Create Account</h3>
      <form @submit.prevent="handleCreateAccount">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div>
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required />
        </div>
        <button type="submit">Create Account</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CreateAccount',
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
      };
    },
    methods: {
      handleCreateAccount() {
        // Lógica de criação de conta aqui
        if (this.password === this.confirmPassword) {
          console.log('Conta criada com:', this.email);
        } else {
          console.log('As senhas não coincidem');
        }
      },
    },
  };
  </script>
  