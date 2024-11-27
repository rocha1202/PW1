<template>
  <footer>
    <p>&copy; {{ new Date().getFullYear() }} ArtFusion. All rights reserved.</p>
    <div class="footer-links">
      <p><a href="#">Terms of Service</a></p>
      <p><a href="#">Privacy Policy</a></p>
      <p><a href="#">Contact Us</a></p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #F1F9FC;
  color: #0F0A30;
  padding: 20px 0;
  text-align: center;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
}

footer p {
  margin: 10px 0;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px; /* Espaço entre os itens */
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
