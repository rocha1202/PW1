<template>
  <div>
    <h3>The Store</h3>
    <div class="card-container">
      <div class="card" v-for="item in items" :key="item.id">
        <img :src="item.image" :alt="item.name" class="card-image" />
        <div class="card-content">
          <h4>{{ item.name }}</h4>
          <p>{{ item.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoreMerchandising',
  data() {
    return {
      items: [
      { id: 1, name: 'T-shirt', price: '$20', image: require('@/assets/t-shirt.jpg') },
        { id: 2, name: 'Mug', price: '$10', image: require('@/assets/mug.jpg') },
        { id: 3, name: 'Poster', price: '$15', image: require('@/assets/poster.jpg') },
      ],
    };
  },
  methods: {
    goToTickets() {
      this.$router.push('/all-programs/tickets');
    },
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 200px;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.card-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.card-content {
  margin-top: 0.5rem;
}

.card-content h4 {
  margin: 0.5rem 0;
}

.card-content p {
  font-size: 1rem;
  color: #333;
}
</style>
