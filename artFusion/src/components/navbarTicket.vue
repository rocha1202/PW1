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
          <li class="navbar-item"><router-link to="/">Home</router-link></li>
          <li class="navbar-item"><router-link to="/info-tickets">Info-Ticket</router-link></li>
          <li class="navbar-item"><router-link to="/info-artist">Info-Artist</router-link></li>
          <li class="navbar-item"><router-link to="/storeMerch">Store Mearchandising</router-link></li>
        </div>
        
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavbarTicket',
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
    background-color: transparent !important; 
    color: #0F0A30 !important; 
    border: 2px solid #0F0A30 !important; 
  }
  
  .button-signup {
    background-color: #0F0A30 !important; 
    color: #F1F9FC !important;
    border: none !important;
  }
  
  
  </style>
  