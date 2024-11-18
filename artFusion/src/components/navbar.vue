<template>
    <nav>
      <h3>Navbar</h3>
      <!-- Links de navegação podem ser adicionados aqui -->
      <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/create-account">Create Account</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/theater">Theater</router-link></li>
      <li><router-link to="/concerts">Concerts</router-link></li>
      <li><router-link to="/museums">Museums</router-link></li>
      <li><router-link to="/workshops">Workshops</router-link></li>
    </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
  };
  </script>
  