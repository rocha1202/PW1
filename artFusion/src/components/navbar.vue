<template>
  <nav class="navbar">
    <ul class="navbar-list">
      <li class="navbar-item">
        <router-link to="/">
          <img src="../assets/logo.png" alt="Home" class="navbar-logo" />
        </router-link>
      </li>

      <li class="navbar-item"><router-link to="/theater">Theater</router-link></li>
      <li class="navbar-item"><router-link to="/concerts">Concerts</router-link></li>
      <li class="navbar-item"><router-link to="/museums">Museums</router-link></li>
      <li class="navbar-item"><router-link to="/workshops">Workshops</router-link></li>

      <li class="navbar-item"><router-link to="/create-account">Signin</router-link></li>
      <li class="navbar-item"><router-link to="/login">Login</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
/* Navbar Container */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}

/* Navbar List */
.navbar-list {
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}

/* Navbar Items */
.navbar-item {
  margin-right: 35px;
  /* Spacing between items */
}

.navbar-item:last-child {
  margin-right: 0;
}

/* Links */
.navbar-item a {
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  transition: color 0.3s ease;
}

.navbar-item a:hover {
  color: #13427f;
  /* Hover color */
}

/* Logo */
.navbar-logo {
  height: 130px;
  /* Adjust the logo size */
  width: auto;
  margin-right: 100px;
  /* Spacing from the rest of the navbar */
}
</style>
