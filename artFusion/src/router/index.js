import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import CreateAcc from "@/views/CreateAcc.vue";
import Login from "@/views/LoginView.vue";
import Theater from "@/views/Theater.vue";
import Concerts from "@/views/Concerts.vue";
import Museums from "@/views/Museums.vue";
import Workshops from "@/views/Workshops.vue";
import Tickets from "@/views/Tickets.vue";
import InfoArtist from "@/views/InfoArtist.vue";
import InfoTickets from "@/views/InfoTickets.vue";
import StoreMerch from "@/views/StoreMerch.vue";
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