<template>
    <div class="page-container">

  <footer>
    <p>&copy; {{ new Date().getFullYear() }} ArtFusion. All rights reserved.</p>
    <div class="footer-links">
      <p><a href="#">Terms of Service</a></p>
      <p><a href="#">Privacy Policy</a></p>
      <p><a href="#">Contact Us</a></p>
    </div>
  </footer>
</div>

</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>footer {
  background-color: #F1F9FC;
  color: #0F0A30;
  padding: 20px 0;
  text-align: center;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
  width: 100%; /* Garante que o footer preencha 100% da largura */
  margin: 0; /* Remove margens externas desnecessárias */
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px; /* Espaçamento entre os itens */
}

.footer-links p {
  margin: 0; /* Remove o espaçamento vertical entre os itens */
}

footer p a {
  color: #3498db;
  text-decoration: none;
}

footer p a:hover {
  text-decoration: underline;
}

</style>
