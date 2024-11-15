<template>
    <div>
      <h2>All Programs</h2>
      <ul>
      <li><router-link to="/ticket">Tickets</router-link></li>
    </ul>
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: 'AllPrograms',
  };
  </script>
  