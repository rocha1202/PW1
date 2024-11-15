import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import CreateAcc from "@/views/CreateAcc.vue";
import Login from "@/views/LoginAcc.vue";
import Theater from "@/views/Theater.vue";
import Concerts from "@/views/Concerts.vue";
import Museums from "@/views/Museums.vue";
import Workshops from "@/views/Workshops.vue";
import Tickets from "@/views/Tickets.vue";
import InfoArtist from "@/views/InfoArtist.vue";
import InfoTickets from "@/views/InfoTickets.vue";
import StoreMerch from "@/views/StoreMerch.vue";


const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/create-account", name: "CreateAcc", component: CreateAcc },
  { path: "/login", name: "Login", component: Login },
  { path: "/theater", name: "Theater", component: Theater },
  { path: "/concerts", name: "Concerts", component: Concerts },
  { path: "/museums", name: "Museums", component: Museums },
  { path: "/workshops", name: "Workshops", component: Workshops },
  { path: "/ticket", name: "Tickets", component: Tickets },
  { path: "/info-tickets", name: "InfoTickets", component: InfoTickets },
  { path: "/info-artist", name: "InfoArtist", component: InfoArtist },
  { path: "/storeMerch", name: "StoreMerch", component: StoreMerch },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
