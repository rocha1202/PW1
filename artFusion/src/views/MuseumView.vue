<template>
  <div>
    <Navbar />
    <div class="content">
      <Carousel :slideCount="3">
      <!-- First Slide -->
      <div class="slide">
        <div class="image-container">
          <img src="https://via.placeholder.com/600x400" alt="Placeholder Image" />
        </div>
        <div class="content-container">
          <h2>Slide 1 Title</h2>
          <p>Slide 1 description goes here. You can write a longer description to explain the content.</p>
          <button>Learn More</button>
        </div>
      </div>

      <!-- Second Slide -->
      <div class="slide">
        <div class="image-container">
          <img src="https://via.placeholder.com/600x400" alt="Placeholder Image" />
        </div>
        <div class="content-container">
          <h2>Slide 2 Title</h2>
          <p>Slide 2 description goes here. This is where you add unique content for each slide.</p>
          <button>Discover</button>
        </div>
      </div>

      <!-- Third Slide -->
      <div class="slide">
        <div class="image-container">
          <img src="https://via.placeholder.com/600x400" alt="Placeholder Image" />
        </div>
        <div class="content-container">
          <h2>Slide 3 Title</h2>
          <p>Slide 3 description goes here. Make your call-to-action compelling!</p>
          <button>Read More</button>
        </div>
      </div>
    </Carousel>
    <div class="event-list">
      <EventCard
        v-for="event in events"
        :key="event.id"
        :imageSrc="event.imageSrc"
        :title="event.title"
        :date="event.date"
        @toggleFavorite="handleFavorite(event)"
      />
    </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import Footer from "@/components/footer.vue";
import Carousel from "@/components/Carousel.vue";
import EventCard from "@/components/EventCard.vue";

export default {
  components: {
    Navbar,
    Footer,
    Carousel,
    EventCard,
  },
  data() {
    return {
      events: [
        {
          id: 1,
          imageSrc: "event1.jpg",
          title: "Event 1",
          date: "2024-12-15",
        },
        {
          id: 2,
          imageSrc: "event2.jpg",
          title: "Event 2",
          date: "2024-12-20",
        },
        {
          id: 3,
          imageSrc: "event3.jpg",
          title: "Event 3",
          date: "2024-12-25",
        },
        {
          id: 4,
          imageSrc: "event4.jpg",
          title: "Event 4",
          date: "2025-01-05",
        },
        {
          id: 5,
          imageSrc: "event5.jpg",
          title: "Event 5",
          date: "2025-01-15",
        },
        {
          id: 6,
          imageSrc: "event5.jpg",
          title: "Event 6",
          date: "2025-01-15",
        },
        {
          id: 7,
          imageSrc: "event5.jpg",
          title: "Event 7",
          date: "2025-01-15",
        },
      ],
    };
  },
  methods: {
    handleFavorite(event) {
      console.log(`Toggled favorite for: ${event.title}`);
    },
  },
};
</script>

<style scoped>
.content {
  margin-top: 180px;
  margin-bottom: 180px;
}

.event-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;  /* Alterei para flex-start para alinhar à esquerda */
  padding-bottom: 16px;
  padding-top: 16px;
}

.event-list > div {
  margin-right: 12px;  /* Margem fluida entre os itens */
  margin-bottom: 16px; /* Espaçamento vertical entre os itens */
}

/* Remover a margem do último item */
.event-list > div:last-child {
  margin-right: 0;
}


</style>
