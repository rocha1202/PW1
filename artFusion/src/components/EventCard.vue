<template>
  <div class="card">
    <img :src="imageSrc" alt="Card image" class="card-image" />
    <div class="card-content">
      <h2 class="card-title">{{ title }}</h2>
    </div>
    <div class="card-hover-content">
      <slot name="info">
        <p class="card-info">{{ info }}</p>
      </slot>
      <slot name="button">
        <button class="buy-ticket-button">{{ buttonText }}</button>
      </slot>
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
    info: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      default: "Buy Ticket",
    },
  },
};
</script>
  
  <style scoped>
.card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.card {
  position: relative;
  width: 320px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.card:hover .card-image {
  transform: scale(1.1);
}

.card-content {
  position: absolute;
  bottom: 10px;
  left: 15px;
  z-index: 2;
}

.card-title {
  margin: 0;
  font-size: 22px;
  color: white;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.card-hover-content {
  position: absolute;
  bottom: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  border-radius: 12px;
  opacity: 0;
  transition: all 0.5s ease;
}

.card:hover .card-hover-content {
  bottom: 0;
  opacity: 1;
}

.card-info {
  margin: 0 0 10px;
  font-size: 16px;
  line-height: 1.5;
}

.buy-ticket-button {
  padding: 10px 20px;
  background: #ff6f61;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.buy-ticket-button:hover {
  background: #e64a45;
}
</style>