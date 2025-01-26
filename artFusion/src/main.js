import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { useArtistStore } from "./stores/artistStore";

import App from "./App.vue";
import router from "./router";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";



const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  }
});

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(vuetify);

// Carregar os artistas assim que a aplicação for iniciada
const artistStore = useArtistStore();
artistStore.fetchArtists(1, 12); // Carregar os artistas ao iniciar a aplicação

app.mount("#app");
