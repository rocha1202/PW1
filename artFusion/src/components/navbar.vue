<template>
  <nav class="navbar">
    <ul class="navbar-list">
      <!-- Home Logo à esquerda -->
      <li class="navbar-item navbar-logo-item">
        <router-link to="/">
          <img src="../assets/logo.png" alt="Home" class="navbar-logo" />
        </router-link>
      </li>

      <!-- Links centrais -->
      <div class="navbar-center">
        <li class="navbar-item">
          <router-link to="/museum">Museu</router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/workshop">Workshops</router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/store">Loja/Merch</router-link>
        </li>
        <li :class="{ hidden: !showTickets }" class="navbar-item">
          <router-link to="/tickets">Tickets</router-link>
        </li>
      </div>

      <!-- Sign In e Sign Up à direita, ou avatar se logado -->
      <div class="navbar-right">
        <template v-if="!isAuthenticated">
          <li class="navbar-item">
            <router-link to="/login" class="button button-signin">Log In</router-link>
          </li>
          <li class="navbar-item">
            <router-link to="/create-account" class="button button-signup">Sign Up</router-link>
          </li>
        </template>
        <template v-else>
          <li class="navbar-item">
            <router-link to="/profile">
              <img src="../assets/Account.png" alt="Profile" class="navbar-avatar" />
            </router-link>
          </li>
          <li class="navbar-item">
            <button @click="logout" class="button button-signin">Logout</button>
          </li>
        </template>
      </div>
    </ul>
  </nav>
</template>

<script>
import { computed } from "vue";
import { useUserStore } from "@/stores/users.js"; // Importe a store

export default {
  name: "Navbar",
  setup() {
    const userStore = useUserStore();

    // Computed property para acessar o estado de autenticação
    const isAuthenticated = computed(() => userStore.isUserAuthenticated);

    // Controle da visibilidade do link de Tickets
    const showTickets = computed(() => isAuthenticated.value);

    // Função para logar
    const logout = () => {
      userStore.logout();
      router.push("/"); // Redireciona para a página "Home"
    };

    return {
      isAuthenticated,
      logout
    };
  }
};
</script>

<style scoped>
/* O estilo permanece o mesmo */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #F1F9FC;
  /* Cor de fundo clara */
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}

.navbar-list {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.navbar-logo-item {
  margin-right: auto;
}

.navbar-center {
  display: flex;
  gap: 20px;
  margin: 0 auto;
}

.navbar-right {
  display: flex;
  gap: 15px;
  margin-left: auto;
}

.navbar-item a {
  color: #0F0A30;
  font-weight: bold;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.navbar-logo {
  height: 40px;
  width: auto;
}

.navbar-avatar {
  height: 45px;
  width: 45px;
}

.button {
  display: inline-block;
  padding: 8px 16px;
  font-weight: bold;
  text-align: center;
  border-radius: 5px;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
}

.button-signin {
  background-color: #0F0A30 !important;
  color: #F1F9FC !important;
  border: none !important;
}

.button-signup {
  background-color: transparent !important;
  color: #0F0A30 !important;
  border: 2px solid #0F0A30 !important;
}

.hidden {
  visibility: hidden;
}
</style>
