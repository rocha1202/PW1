<template>
  <div>
    <!-- Navbar -->
    <Navbar />

    <!-- Store Content -->
    <div class="store-container">
      <div class="store-grid">
        <div v-for="item in items" :key="item.id" class="store-item">
          <img :src="item.photo" :alt="item.name" class="item-photo" />
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <p><strong>Price:</strong> ${{ item.price }}</p>
          <p><strong>Quantity:</strong> {{ item.quantity }}</p>
          <button v-if="isUserAuthenticated && !isAdmin" @click="buyTicket(ticket)" class="buy-button">Comprar</button>
        </div>
      </div>

      <!-- Cart Sidebar -->
      <div class="cart-container">
        <h3>Your Cart</h3>
        <ul>
          <li v-for="item in cartItems" :key="item.id">
            {{ item.name }} - ${{ item.price }}
          </li>
        </ul>
        <p v-if="cartItems.length === 0">Your cart is empty</p>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import { useCartStore } from "@/stores/cart";
import { useMerchStore } from "@/stores/merchStore";

export default {
  name: "StoreView",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      items: [], // Os itens carregados da API
    };
  },
  computed: {
    cartItems() {
      const cartStore = useCartStore();
      return cartStore.cartItems;
    },
  },
  methods: {
    async fetchItems() {
      try {
        const merchStore = useMerchStore();
        await merchStore.fetchMerch();
        this.items = merchStore.items;
      } catch (error) {
        console.error("Erro ao buscar os itens:", error);
      }
    },
    addToCart(item) {
      const cartStore = useCartStore();
      cartStore.addToCart(item);
      //alert(`${item.name} adicionado ao carrinho!`);
    },
  },
  mounted() {
    this.fetchItems();
  },
};
</script>

<style>
/* Container para alinhar loja e carrinho */
.store-container {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  margin-top: 80px;
}

/* Grid para exibir os itens da loja */
.store-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  flex: 1;
}

/* Estilos para os cards */
.store-item {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #000; /* Texto dos cards em preto */
  font-size: 14px;
}

.store-item img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
  border-radius: 5px;
}

/* Sidebar para o carrinho */
.cart-container {
  position: sticky;
  top: 20px;
  width: 250px;
  max-height: 80vh;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 10px;
  overflow-y: auto;
  color: #000;
}

.cart-container h3 {
  margin-bottom: 10px;
}

.cart-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-container li {
  padding: 5px 0;
  border-bottom: 1px solid #ccc;
}

.cart-container li:last-child {
  border-bottom: none;
}
</style>
