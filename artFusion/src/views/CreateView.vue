<template>
  <div class="page-container">
    <Navbar />
    <div class="signup-container">
      <div class="signup-box">
        <h3 class="signup-title">Sign Up</h3>
        <form @submit.prevent="handleCreateAccount">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input type="email" id="email" v-model="email" class="form-input" required />
          </div>
          <div class="form-group">
            <label for="password" class="form-label">Password</label>
            <input type="password" id="password" v-model="password" class="form-input" required />
          </div>
          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input type="password" id="confirmPassword" v-model="confirmPassword" class="form-input" required />
          </div>
          <button type="submit" class="submit-button">Create Account</button>
        </form>
        <p class="signin-link">
          Have an account? <router-link to="/login" class="button button-signin">Sign In</router-link>
        </p>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from '@/stores/userStore';
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";

export default {
  name: "CreateAccount",
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const router = useRouter();
    const accountStore = useUserStore();

    const handleCreateAccount = () => {
      if (password.value === confirmPassword.value) {
        try {
          accountStore.createAccount(email.value, password.value);
          console.log("Conta criada com sucesso:", email.value);
          router.push("/login"); // Redireciona para a página de login após o registro
        } catch (error) {
          console.error(error.message);
          alert(error.message); // Mostra o erro ao usuário
        }
      } else {
        console.log("As senhas não coincidem");
        alert("As senhas devem coincidir.");
      }
    };

    return {
      email,
      password,
      confirmPassword,
      handleCreateAccount,
    };
  },
};
</script>

<style scoped>
/* Estilos (mesmos do código original) */
body {
  background-color: #0f0a30;
  margin: 0;
  font-family: Arial, sans-serif;
  color: #fff;
}

.page-container {
  display: flex;
  flex-direction: column;
  height: 90vh;
}

.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: #0f0a30;
}

.signup-box {
  background-color: #f0f4f8;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 360px;
}

.signup-title {
  text-align: left;
  margin-bottom: 20px;
  font-size: 24px;
  color: #0f0a30;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  color: #0f0a30;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #0f0a30;
  box-shadow: 0 0 5px rgba(107, 107, 255, 0.5);
}

.submit-button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #0f0a30;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #1a1440;
}

.signin-link {
  text-align: left;
  margin-top: 20px;
  font-size: 14px;
  color: #0f0a30;
}

.signin-link a {
  color: #0f0a30;
  text-decoration: none;
}

.signin-link a:hover {
  text-decoration: underline;
}
</style>
