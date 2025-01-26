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
          <router-link to="/museum">Museum</router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/workshop">Workshops</router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/store">Store</router-link>
        </li>
        <li v-if="showTickets" class="navbar-item">
          <router-link to="/tickets">My tickets</router-link>
        </li>
        <li v-if="showTickets" class="navbar-item">
          <router-link to="/feedback">Feedback </router-link>
        </li>
      </div>

      <!-- Sign In e Sign Up à direita, ou avatar e notificações/usuários se logado -->
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
          <li class="navbar-item" v-if="isAdmin">
            <router-link to="/users" class="button">Users</router-link>
          </li>
          <li v-else class="navbar-item">
            <img src="../assets/notification.png" alt="Notifications" class="navbar-icon" />
          </li>
          <!-- Avatar com dropdown -->
          <li class="navbar-item dropdown" ref="dropdownRef">
            <img src="../assets/Account.png" alt="Profile" class="navbar-avatar" @click="toggleDropdown" />
            <ul v-if="dropdownOpen" class="dropdown-menu">
              <li>
                <router-link to="/profile">Profile</router-link>
              </li>
              <li>
                <button @click="logout">Logout</button>
              </li>
            </ul>
          </li>
        </template>
      </div>
    </ul>
  </nav>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useUserStore } from "@/stores/userStore.js";
import { useRouter } from "vue-router";

export default {
  name: "Navbar",
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    const isAuthenticated = computed(() => userStore.isUserAuthenticated);
    const showTickets = computed(() => isAuthenticated.value);
    const isAdmin = computed(() => userStore.getUserRole === "admin"); // Nova propriedade

    const dropdownOpen = ref(false);
    const dropdownRef = ref(null);

    const toggleDropdown = () => {
      dropdownOpen.value = !dropdownOpen.value;
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        dropdownOpen.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    const logout = () => {
      userStore.logout();
      router.push("/login");
      dropdownOpen.value = false;
    };

    return {
      isAuthenticated,
      showTickets,
      isAdmin,
      dropdownOpen,
      toggleDropdown,
      logout,
      dropdownRef,
    };
  },
};

</script>

<style scoped>
/* O estilo permanece o mesmo, com adições para dropdown */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #F1F9FC;
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
  cursor: pointer;
}

.navbar-icon {
  height: 35px;
  width: 35px;
  cursor: pointer;
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

/* Dropdown menu */
.dropdown {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 55px;
  right: 0;
  background-color: #F1F9FC;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1001;
}

.dropdown-menu li {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: bold;
  color: #0F0A30;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #E1EFF7;
}
</style>
