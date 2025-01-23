<template>
  <div class="store-view">
    <!-- Navbar -->
    <Navbar />
    
    <!-- Conteúdo principal com os cards de tickets à esquerda -->
    <div class="store-content">
      <h1>Bem Vindo a Loja</h1>
    </div>
      <div class="store-grid">
        <!-- Cards de tickets -->
        <div v-for="ticket in tickets" :key="ticket.id" class="ticket-card">
          <div class="ticket-info">
            <h3>{{ ticket.name }}</h3>
            <p>{{ ticket.artist }}</p>
            <p>{{ ticket.price }} €</p>
            <button v-if="isUserAuthenticated && !isAdmin" @click="buyTicket(ticket)" class="buy-button">Comprar</button>
          </div>
        </div>
      </div>
    

    <!-- Cart fixado à direita -->
    <div class="cart-container">
      <Cart />
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import Cart from "@/components/cart.vue";
import { useUserStore } from "@/stores/userStore";
import { useCartStore } from "@/stores/cart";

export default {
  name: "StoreView",
  components: {
    Navbar,
    Footer,
    Cart,
  },
  data() {
    return {
      tickets: [], // Vai armazenar os dados dos tickets
    };
  },
  computed: {
    // Computed properties para verificar se o usuário está autenticado e se é admin
    isUserAuthenticated() {
      const userStore = useUserStore();
      return userStore.isAuthenticated;
    },
    isAdmin() {
      const userStore = useUserStore();
      return userStore.userRole === "admin";
    },
  },
  methods: {
    async fetchTickets() {
      try {
        const response = await fetch("/api/tickets.json");
        const data = await response.json();
        this.tickets = data; // Armazena os tickets no array tickets
      } catch (error) {
        console.error("Erro ao carregar os tickets:", error);
      }
    },
    buyTicket(ticket) {
      if (this.isUserAuthenticated && !this.isAdmin) {
    const cartStore = useCartStore();  // Chama o store diretamente aqui
    cartStore.addToCart(ticket); // Adiciona o bilhete ao carrinho
    console.log(`Comprando o ticket: ${ticket.name}`);
  } else {
    console.log("Usuário não autorizado para comprar este ticket.");
  }
}
  },
  mounted() {
    // Carregar os tickets assim que o componente for montado
    this.fetchTickets();
  },
};
</script>

<style scoped>
.store-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.store-content {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 80px;
}

.store-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  flex-grow: 1;
}

.ticket-card {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.ticket-image {
  width: 100%;
  border-radius: 8px;
  height: auto;
}

.ticket-info h3 {
  font-size: 18px;
  color: #333;
}

.ticket-info p {
  color: #777;
}

.buy-button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.buy-button:hover {
  background-color: #45a098;
  transform: scale(1.05);
}

.cart-container {
  position: fixed;
  top: 100px;
  right: 20px;
  width: 300px;
  height: auto;
  max-height: 80vh;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 10px;
  z-index: 1000;
}
</style>
