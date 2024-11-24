<template>
  <div>
    <h3>Artists Info</h3>
    <div class="card-container">
      <div class="card" v-for="artist in artists" :key="artist.id">
        <img :src="artist.image" :alt="artist.name" class="card-image" />
        <h4>{{ artist.name }}</h4>
        <a :href="artist.link" target="_blank" rel="noopener noreferrer">
          Visitar Página do Artista
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoArtistView',
  data() {
    return {
      artists: [
        {
          id: 1,
          name: 'ACDC',
          link: 'https://example.com/artist1',
          image: '@/assets/acdc.jpg', // Substitua pela URL da imagem real
        },
        {
          id: 2,
          name: 'Marante',
          link: 'https://example.com/artist2',
          image: '@/assets/marante.jpg', // Substitua pela URL da imagem real
        },
        {
          id: 3,
          name: 'Pink Floyd',
          link: 'https://example.com/artist3',
          image: '@/assets/pinkfloyd.jpg', // Substitua pela URL da imagem real
        },
      ],
    };
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
  margin-bottom: 0.5rem;
}

.card h4 {
  margin: 0.5rem 0;
  font-size: 1.2rem;
  color: #333;
}

.card a {
  text-decoration: none;
  color: #007bff;
  font-size: 1rem;
}

.card a:hover {
  color: #0056b3;
}
</style>