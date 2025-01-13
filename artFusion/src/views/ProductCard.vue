<template>
    <v-card outlined class="product-card">
      <!-- Imagem do Produto -->
      <v-img :src="product.image" aspect-ratio="1.5"></v-img>
  
      <!-- Nome e Preço do Produto -->
      <v-card-title class="product-name">{{ product.name }}</v-card-title>
      <v-card-subtitle class="product-price"> {{ product.price.toFixed(2) }} €</v-card-subtitle>
  
      <!-- Botão de Adicionar ao Carrinho -->
      <v-card-actions>
        <v-btn color="primary" block @click="addToCart">Adicionar ao Carrinho</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    name: "ProductCard",
    props: {
      product: {
        type: Object,
        required: true,
      },
    },
    methods: {
      addToCart() {
        this.$emit("add-to-cart", this.product);
      },
    },
  };
  </script>
  
  <style scoped>
  .product-card {
    width: 250px;
    margin: 10px;
    color: #f1f9fc;
    background-color: #1b1b3a;
  }
  
  .product-name {
    font-size: 18px;
    font-weight: bold;
  }
  
  .product-price {
    color: #90caf9;
  }
  </style>
  