<template>
    <div class="page-container">

  <footer>
    <p>&copy; {{ new Date().getFullYear() }} ArtFusion. All rights reserved.</p>
    <div class="footer-links">
      <router-link to="/404">Terms of Service</router-link>
      <router-link to="/404">Privacy Policy</router-link>
      <router-link to="/404">Contact Us</router-link>

    </div>
  </footer>
</div>

</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  background-color: #FFFFFFFF; /* Cor mais escura para contraste */
  color: #0F0A30; /* Texto branco para visibilidade */
  padding: 20px 15px; /* Ajuste para espaçamento */
  text-align: center;
  font-family: 'Roboto', sans-serif; /* Tipografia mais moderna */
  font-size: 14px;
  line-height: 1.8;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* Sombra mais leve */
  width: 100%;
  margin: 0;}

.footer-links {
  display: flex;
  flex-wrap: wrap; /* Ajusta bem em telas menores */
  justify-content: center;
  gap: 15px; /* Espaçamento entre links */
  margin-top: 10px;
}

.footer-links p {
  margin: 0;
}

footer p a {
  color: #00A6FF; /* Cor viva para links */
  text-decoration: none;
  font-weight: 500; /* Destaque visual */
  transition: color 0.3s ease; /* Suavidade no hover */
}



footer p {
  margin: 5px 0; /* Espaçamento vertical */
}

/* Ajustes para responsividade */
@media (max-width: 600px) {
  footer {
    font-size: 13px; /* Fonte ligeiramente menor em telas pequenas */
    padding: 15px;
  }

  .footer-links {
    gap: 10px; /* Reduz espaço entre links */
  }
}
</style>
