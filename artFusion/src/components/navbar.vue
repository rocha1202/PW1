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
        <li class="navbar-item"><router-link to="/theater">Theater</router-link></li>
        <li class="navbar-item"><router-link to="/concerts">Concerts</router-link></li>
        <li class="navbar-item"><router-link to="/museums">Museums</router-link></li>
        <li class="navbar-item"><router-link to="/workshops">Workshops</router-link></li>
      </div>
      
      <!-- Sign In e Sign Up à direita -->
      <div class="navbar-right">
        <li class="navbar-item">
          <router-link to="/create-account" class="button button-signin">Sign In</router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/login" class="button button-signup">Sign Up</router-link>
        </li>
      </div>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #F1F9FC; /* Cor de fundo clara */
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
  margin-right: auto; /* Alinha à esquerda */
}

.navbar-center {
  display: flex;
  gap: 20px; /* Espaçamento entre links centrais */
  margin: 0 auto; /* Centraliza no meio */
}

.navbar-right {
  display: flex;
  gap: 15px;
  margin-left: auto; /* Empurra para a direita */
}

.navbar-item a {
  color: #0F0A30; /* Cor dos links */
  font-weight: bold;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

/* Estilo do logo */
.navbar-logo {
  height: 40px;
  width: auto;
}

/* Botões Sign In e Sign Up */
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

/* Invertendo as cores */
.button-signin {
  background-color: transparent !important; /* Fundo transparente */
  color: #0F0A30 !important; /* Texto escuro */
  border: 2px solid #0F0A30 !important; /* Borda escura */
}

.button-signup {
  background-color: #0F0A30 !important; /* Fundo escuro */
  color: #FFFFFF !important; /* Texto branco */
  border: none !important;
}


</style>
