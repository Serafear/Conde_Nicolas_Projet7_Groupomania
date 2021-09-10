//npm install vue-router@next --save
//the vue router will create the route for the components for exemple.

import Home from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import Login from "./components/Login.vue";
import MyPage from "./components/MyPage.vue";
import Delete from "./components/Delete.vue";
import OnePost from "./components/OnePost.vue";
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
  {
    name: "MyPage",
    component:MyPage,
    path: "/mypage/:userId",
  },
  {
    name: "Delete",
    component:Delete,
    path: "/delete/:userId",
  },
  {
    name: "OnePost",
    component: OnePost,
    path: "/post/:postId", //vue que dans home on décrète que id=Post.id
    props: true,    //vue qu'on utilisera props:["id"] dans la page, il est lié à id dans path
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
