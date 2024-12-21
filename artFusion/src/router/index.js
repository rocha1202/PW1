import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import CreateAcc from "@/views/CreateView.vue";
import Login from "@/views/LoginView.vue";
import MuseumView from "@/views/MuseumView.vue";
import WorkShopView from "@/views/WorkShopView.vue";
import TicketInfoView from "@/views/TicketInfoView.vue";
import StoreView from "@/views/StoreView.vue";
import Profile from "@/views/ProfileView.vue";
import { useUserStore } from "@/stores/userStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/create-account", name: "CreateAcc", component: CreateAcc },
    { path: "/login", name: "Login", component: Login },
    { path: "/museum", name: "Museum", component: MuseumView },
    { path: "/workshop", name: "Workshop", component: WorkShopView },
    { path: "/store", name: "Store", component: StoreView },
    {
      path: "/tickets",
      name: "TicketInfo",
      component: TicketInfoView,
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !useUserStore().isUser) {
    return {
      path: "/login",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
