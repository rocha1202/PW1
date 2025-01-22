<template>
    <v-app style="background-color: #0f0a30; color:#F1F9FC;">
        <!-- Navbar -->
        <Navbar />
        <v-main>
            <div class="layout-container">
                <!-- Lista de Produtos -->
                <div class="products-section">
                    <h1 class="text-center">Loja de Merch</h1>
                    <div class="product-grid">
                        <ProductCard v-for="(product, index) in products" :key="index" :product="product"
                            @add-to-cart="addToCart" />
                    </div>
                </div>

                <!-- Carrinho Fixo -->
                <div class="cart-section">
                    <Cart />
                </div>
            </div>
        </v-main>
        <!-- Footer -->
        <Footer />
    </v-app>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import ProductCard from "@/views/ProductCard.vue";
import Cart from "@/views/Cart.vue";
import eventImage from "@/assets/event1.jpg";
import { useCartStore } from "@/stores/cart";

export default {
    name: "LojaView",
    components: {
        Navbar,
        Footer,
        ProductCard,
        Cart,
    },
    data() {
        return {
            products: [
                { name: "Camiseta", price: 25, image: eventImage },
                { name: "Boné", price: 15, image: eventImage },
                { name: "Caneca", price: 10, image: eventImage },
                { name: "Camiseta", price: 25, image: eventImage },
                { name: "Boné", price: 15, image: eventImage },
                { name: "Caneca", price: 10, image: eventImage },
                { name: "Boné", price: 15, image: eventImage },
                { name: "Caneca", price: 10, image: eventImage },
                { name: "Camiseta", price: 25, image: eventImage },
                { name: "Boné", price: 15, image: eventImage },
                { name: "Caneca", price: 10, image: eventImage },

            ],
        };
    },
    methods: {
        addToCart(product) {
            const cartStore = useCartStore();
            cartStore.addToCart(product);
        },
    },
};
</script>

<style scoped>
body {
    font-family: "Arial", sans-serif;
    margin: 0;
    padding: 0;
    height: 100%; /* Definir altura total para o body */
    display: flex;
    flex-direction: column; /* Organiza o conteúdo em coluna */
}

/* Layout principal */
.layout-container {
    display: flex;
    flex: 1;
    height: 100%; /* Ocupa toda a altura disponível */
    padding-bottom: 70px; /* Adiciona um espaço extra para o footer */
}

/* Produtos ocupam o espaço restante */
.products-section {
    flex: 1;
    padding: 20px;
}

/* Carrinho fixo na lateral direita */
.cart-section {
    width: 250px;
    background-color: #1b1b3a;
    color: #f1f9fc;
    padding: 20px;
    overflow-y: auto;
    border-left: 1px solid #444;
}

/* Estilos auxiliares */
.text-center {
    text-align: center;
    color: #F1F9FC;
}

.product-grid {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    justify-content: center;
}

.v-main {
    margin-top: 70px;
}



</style>