import { createRouter, createWebHistory } from "vue-router";
import Portfolio from "@/portfolio/views/portfolio-container";
import Login from "@/shared/views/log-in";

const HistoryContainer = () => import(/* webpackChunkName: "history-container" */ "@/history/views/history-container");

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/portfolio",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: Portfolio,
  },
  {
    path: "/history",
    name: "History",
    component: HistoryContainer,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
