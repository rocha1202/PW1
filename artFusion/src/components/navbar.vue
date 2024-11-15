<template>
    <nav>
      <h3>Navbar</h3>
      <!-- Links de navegação podem ser adicionados aqui -->
      <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/create-account">Criar Conta</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/theater">Teatro</router-link></li>
      <li><router-link to="/concerts">Concertos</router-link></li>
      <li><router-link to="/museums">Museus</router-link></li>
      <li><router-link to="/workshops">Workshops</router-link></li>
    </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  