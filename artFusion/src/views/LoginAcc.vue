<template>
    <div>
      <h3>Login</h3>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      handleLogin() {
        // Lógica de autenticação aqui
        console.log('Tentativa de login:', this.email, this.password);
      },
    },
  };
  </script>
  