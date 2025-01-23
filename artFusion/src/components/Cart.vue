<template>
  <v-card class="cart" outlined>
    <v-card-title>Seu Carrinho</v-card-title>

    <!-- Exibe o subtotal acima da lista -->
    <v-card-subtitle v-if="cartItems.length > 0">
      Subtotal: {{ subtotal.toFixed(2) }} €
    </v-card-subtitle>

    <v-card-subtitle v-if="cartItems.length === 0">O carrinho está vazio</v-card-subtitle>

    <v-list v-else>
      <v-list-item v-for="(item, index) in cartItems" :key="index" class="cart-item">
        <v-list-item-title>{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.price.toFixed(2) }} €</v-list-item-subtitle>
        <v-list-item-action>
          <v-list-item-subtitle class="remove" @click="removeFromCart(item)">Remover item</v-list-item-subtitle>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-card-actions>
      <v-btn color="success" block :disabled="cartItems.length === 0">
        Finalizar Compra
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { useCartStore } from "@/stores/cart";

export default {
  name: "Cart",
  computed: {
    cartItems() {
      const cartStore = useCartStore();
      return cartStore.cartItems;
    },
    subtotal() {
      return this.cartItems.reduce((acc, item) => acc + item.price, 0);
    },
  },
  methods: {
    removeFromCart(product) {
      const cartStore = useCartStore();
      cartStore.removeFromCart(product);
    },
  },
};
</script>

<style scoped>
.cart {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 100%;
  background-color: #1b1b3a;
  color: #F1F9FC;
}

.v-list {
  max-height:550px;
}

.cart-item {
  color: #0f0a30;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.item-content {
  display: flex;
  flex-direction: column;
}

.v-list-item-title {
  font-weight: bold;
}

.v-list-item-subtitle {
  font-size: 1rem;
  color: #6b6b6b;
}

.v-card-actions {
  margin-top: auto;
}

.remove {
  text-decoration: underline;
}

.remove:hover {
  color: red;
  cursor: pointer;
}
</style>
