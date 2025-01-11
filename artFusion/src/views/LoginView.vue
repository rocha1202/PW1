<template>
  <v-app style="background-color: #0f0a30;">
    <Navbar />
    <v-container class="fill-height d-flex align-center justify-center">
      <v-card class="pa-5" width="430" height="430">
        <v-card-title class="text-h5 text-center">Sign In</v-card-title>
        <v-form @submit.prevent="handleSignUp" ref="form">
          <v-text-field v-model="email" label="Email" type="email" required outlined dense class="mb-4" />
          <v-text-field v-model="password" label="Password" type="password" required outlined dense class="mb-4" />
          <v-btn type="submit" block color="primary" class="mb-2">
            Sign In
          </v-btn>
        </v-form>
        <v-row justify="center" align="center" class="mt-3">
          <span>Don't have an account?</span>
          <router-link to="/create-account" class="text-decoration-none">
            Create Account
          </router-link>
        </v-row>
      </v-card>
    </v-container>
    <Footer />
  </v-app>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore.js";
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";

export default {
  name: "SignUp",
  components: {
    Navbar,
    Footer,
  },
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();
    const accountStore = useUserStore();

    const handleSignUp = async () => {
      try {
        // Executa o login e redireciona se bem-sucedido
        await accountStore.login(email.value, password.value);
        console.log("Login bem-sucedido");
        router.push("/");
      } catch (error) {
        console.error("Erro durante o login:", error.message);
        alert(error.message);
      }
    };

    return {
      email,
      password,
      handleSignUp,
    };
  },
};
</script>

<style scoped>
.fill-height {
  height: calc(100vh - 64px);
  /* Adjust for header/footer */
}

.text-decoration-none {
  text-decoration: none;
  color: #1976d2;
}

.text-decoration-none:hover {
  text-decoration: underline;
}

.v-card {
  background-color: #f0f4f8;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.v-card-title {
  text-align: left;
  margin-bottom: 20px;
  font-size: 24px;
  color: #0f0a30;
}

.v-text-field {
  width: 100%;
}

.v-btn {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.v-btn:hover {
  background-color: #1a1440;
}
</style>
