<template>
  <div>
    <h3>Login</h3>
    <form @submit.prevent="handleLogin">
      <div>
        Email:
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        Password:
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    handleLogin() {
      // Recuperar dados da conta armazenados no localStorage
      const storedAccount = JSON.parse(localStorage.getItem('account'));

      if (!storedAccount) {
        this.errorMessage = 'Nenhuma conta registrada. Crie uma conta primeiro.';
        return;
      }

      const { email: storedEmail, password: storedPassword } = storedAccount;

      // Verificar credenciais
      if (this.email === storedEmail && this.password === storedPassword) {
        console.log('Login bem-sucedido!');
        this.errorMessage = '';
        // Redirecionar ou executar ações adicionais após o login
        this.$router.push('/'); // Exemplo de redirecionamento após login

      } else {
        this.errorMessage = 'Email ou senha incorretos.';
      }
    },
  },
};
</script>
