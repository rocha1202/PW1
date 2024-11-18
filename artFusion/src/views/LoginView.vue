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
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Importação do Router
import { useUserStore } from '@/stores/users';

export default {
  name: "Login",
  setup() {
    const userStore = useUserStore(); // Pinia store
    const email = ref('');           // Reativos para o formulário
    const password = ref('');
    const router = useRouter();      // Instância do router

    const handleLogin = () => {
      try {
        // Chama a ação login da store
        userStore.login(email.value, password.value);

        // Redireciona após login bem-sucedido
        router.push({ name: "Ticket" }); // Corrigido para usar router
      } catch (error) {
        alert("Erro no login. Verifique suas credenciais.");
        email.value = '';
        password.value = '';
      }
    };

    return {
      email,
      password,
      handleLogin,
    };
  },
};
</script>
