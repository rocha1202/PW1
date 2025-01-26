<template>
  <v-app style="background-color: #0f0a30;">
    <Navbar />
    <v-container class="fill-height d-flex align-center justify-center">
      <v-card class="pa-5" width="430" height="530">
        <v-card-title class="text-h5 text-center">Create Account</v-card-title>
        <v-form @submit.prevent="handleCreateAccount" ref="form">
          <v-text-field v-model="email" label="Email" type="email" required outlined dense class="mb-4" />
          <v-text-field v-model="password" label="Password" type="password" required outlined dense class="mb-4" />
          <v-text-field v-model="confirmPassword" label="Confirm Password" type="password" required outlined dense
            class="mb-4" />
          <v-btn type="submit" block color="primary" class="mb-2">
            Create Account
          </v-btn>
        </v-form>
        <v-row justify="center" align="center" class="mt-3">
          <span>Already have an account?</span>
          <router-link to="/login" class="text-decoration-none">
            Sign In
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
          router.push("/login");
        } catch (error) {
          console.error(error.message);
          alert(error.message);
        }
      } else {
        alert("Passwords must match.");
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
