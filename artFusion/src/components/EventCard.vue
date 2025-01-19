<template>
  <div class="card" @click="navigateToDetails">
    <img :src="imageSrc" alt="Card image" class="card-image" />
    <div class="card-content">
      <h2 class="card-title">{{ title }}</h2>
      <p class="card-date">Data: {{ formatDate(date) }}</p>
      <p class="card-artist">Artista: {{ artist }}</p>
      <div class="favorite-icon" @click.stop="toggleFavorite">
        <span :class="{'is-favorite': isFavorite}">★</span>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "EventCard",
  props: {
  imageSrc: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  artist: {
    type: String, // Novo prop
    required: false, // Torne opcional se nem todos os eventos tiverem artistas
  },
},
  data() {
    return {
      isFavorite: false,
    };
  },
  methods: {
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      this.$emit('toggleFavorite', this.isFavorite);
    },
    navigateToDetails() {
      // Navegação para outra página (não implementada ainda)
      console.log("Navigate to details page");
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  max-width: 300px;
  background-color: #fff;
}

.card:hover {
  transform: scale(1.02);
}

.card-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-content {
  padding: 16px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
}

.card-date,
.card-artist {
  font-size: 14px;
  color: #555;
  margin-bottom: 4px;
}

.favorite-icon {
  text-align: right;
  font-size: 20px;
  color: #ddd;
  cursor: pointer;
}

.favorite-icon .is-favorite {
  color: #f39c12;
}
</style>
