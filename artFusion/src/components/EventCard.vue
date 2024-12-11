<template>
  <div class="card" @click="navigateToDetails">
    <img :src="imageSrc" alt="Card image" class="card-image" />
    <div class="card-content">
      <h2 class="card-title">{{ title }}</h2>
      <p class="card-date">{{ date }}</p>
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
  position: relative;
  width: 280px;
  height: 400px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  background-color: #fff;
}

.card:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.card-image {
  width: 100%;
  height: 60%;
  object-fit: cover;
}

.card-content {
  flex: 1;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.card-title {
  margin: 0;
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.card-date {
  margin: 5px 0;
  font-size: 16px;
  color: #777;
}

.favorite-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

.favorite-icon span {
  color: #ccc;
  transition: color 0.3s ease;
}

.favorite-icon span.is-favorite {
  color: #ffcc00;
}

@media screen and (max-width: 768px) {
  .card {
    width: 100%;
    height: auto;
  }

  .card-image {
    height: 200px;
  }
}
</style>