import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import CreateAcc from "@/views/CreateView.vue";
import Login from "@/views/LoginView.vue";
import Theater from "@/views/TheaterView.vue";
import Concerts from "@/views/ConcertsView.vue";
import Museums from "@/views/MuseumsView.vue";
import Workshops from "@/views/WorkshopsView.vue";
import Tickets from "@/views/TicketsView.vue";
import InfoArtist from "@/views/InfoArtistView.vue";
import InfoTickets from "@/views/InfoTicketsView.vue";
import StoreMerch from "@/views/StoreMerchView.vue";
import { useUserStore } from "@/stores/users";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/create-account", name: "CreateAcc", component: CreateAcc },
    { path: "/login", name: "Login", component: Login },
    { path: "/theater", name: "Theater", component: Theater },
    { path: "/concerts", name: "Concerts", component: Concerts },
    { path: "/museums", name: "Museums", component: Museums },
    { path: "/workshops", name: "Workshops", component: Workshops },
    { path: "/ticket", name: "Ticket", component: Tickets,  meta: { requiresAuth: true} },
    { path: "/info-tickets", name: "InfoTickets", component: InfoTickets,  meta: { requiresAuth: true} },
    { path: "/info-artist", name: "InfoArtist", component: InfoArtist,  meta: { requiresAuth: true} },
    { path: "/storeMerch", name: "StoreMerch", component: StoreMerch, meta: { requiresAuth: true } },
  ]
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !useUserStore().isUser) {
    return {
      path: "/login",
      query: { redirect: to.fullPath },
    };
  }
});

export default router