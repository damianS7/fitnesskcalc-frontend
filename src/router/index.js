import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import FoodDiary from "@/views/FoodDiary.vue";
import Profile from "@/views/profile/Profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/diary",
    name: "Diary",
    component: FoodDiary
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
