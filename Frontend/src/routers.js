//npm install vue-router@next --save
//the vue router will create the route for the components for exemple.

import Home from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import Login from "./components/Login.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "Home",
    component:Home,
    path: "/",
  },
  {
    name: "SignUp",
    component:SignUp,
    path: "/signup",
  },
  {
    name: "Login",
    component:Login,
    path: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
