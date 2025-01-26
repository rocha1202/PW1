import { createRouter, createWebHistory, createMemoryHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import CreateAcc from "@/views/CreateView.vue";
import Login from "@/views/LoginView.vue";
import MuseumView from "@/views/MuseumView.vue";
import WorkShopView from "@/views/WorkShopView.vue";
import TicketInfoView from "@/views/TicketInfoView.vue";
import StoreView from "@/views/StoreView.vue";
import Profile from "@/views/ProfileView.vue";
import ArtistDetails from "@/views/ArtistDetails.vue";
import AboutView from "@/views/LearnMoreView.vue";
import Users from "@/views/usersView.vue";
import Feedback from "@/views/feedbackView.vue";
import NotFoundView from "@/views/NotFoundView.vue"; 

import { useUserStore } from "@/stores/userStore";

const history =
  import.meta.env.MODE === "test"
    ? createMemoryHistory()
    : createWebHistory(import.meta.env.BASE_URL);

const router = createRouter({
  history,
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/create-account", name: "CreateAcc", component: CreateAcc },
    { path: "/login", name: "Login", component: Login },
    { path: "/museum", name: "Museum", component: MuseumView },
    { path: "/workshop", name: "Workshop", component: WorkShopView },
    { path: "/store", name: "Store", component: StoreView },
    { path: "/about", name: "About", component: AboutView },
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
    },    {
      path: "/feedback",
      name: "Feedback",
      component: Feedback,
      meta: { requiresAuth: true },
    },
    {
      path: "/artist/:id",
      name: "ArtistDetails",
      component: ArtistDetails,
    },
    {
      path: "/users",
      name: "Users",
      component: Users,
      meta: { admin: true },
    },
    // Rota para a página 404
    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFoundView },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Sempre rola para o topo
    return { top: 0 };
  },
});

router.beforeEach((to, from) => {
  const userStore = useUserStore();

  // Obtém se o usuário está autenticado
  const isAuthenticated = userStore.isUserAuthenticated;

  // Verifica se o usuário é admin
  const isAdmin = userStore.getUserRole === "admin";

  // Regras de autenticação e autorização
  if ((to.meta.requiresAuth && !isAuthenticated) || (to.meta.admin && !isAdmin)) {
    return {
      path: "/login",
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
