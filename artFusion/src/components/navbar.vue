<template>
  <nav class="navbar">
    <div class="navbar-container">
      <ul :class="['navbar-list', { active: isMenuOpen }]">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/create-account">Create Account</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/theater">Theater</router-link></li>
        <li><router-link to="/concerts">Concerts</router-link></li>
        <li><router-link to="/museums">Museums</router-link></li>
        <li><router-link to="/workshops">Workshops</router-link></li>
      </ul>
      <div class="navbar-toggle" @click="toggleMenu">
        <span class="navbar-icon">&#9776;</span>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isMenuOpen: false, // Controla a visibilidade do menu
    };
  },
  methods: {
    toggleMenu() {
      // Alterna o estado de visibilidade do menu
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style scoped>
/* Estilo da Navbar */
.navbar {
  background-color: #333;
  padding: 15px 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.navbar-list {
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.navbar-item {
  margin: 0 20px;
}

.navbar-link {
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
}

.navbar-link:hover {
  text-decoration: underline;
}

/* Estilos para o ícone de menu hamburguer */
.navbar-toggle {
  display: none;
  cursor: pointer;
}

.navbar-icon {
  font-size: 30px;
  color: white;
}

@media (max-width: 768px) {
  .navbar-list {
    display: none;
    width: 100%;
    flex-direction: column;
    align-items: center;
  }

  .navbar-list.active {
    display: flex; /* Exibe o menu quando a classe active está presente */
  }

  .navbar-toggle {
    display: block; /* Exibe o ícone de hamburguer */
  }
}
</style>
