<template>
  <div>
    <h3>Museums</h3>
    <div>
      <EventCard
        imageSrc="https://via.placeholder.com/300x200"
        title="Event Title"
        info="this is the info of the card"
        buttonText="Join Now"
      >
      </EventCard>
    </div>
  </div>
</template>
  
  <script>
import EventCard from "@/components/EventCard.vue";

export default {
  name: "Museums",
  components: {
    EventCard,
  },
};
</script>

 