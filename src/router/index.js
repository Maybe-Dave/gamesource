import { createRouter, createWebHistory } from "vue-router";

import { isAuth, isLoggendIn } from "@/composables/auth.js";

import Home from "@/components/home/Home.vue";
import SignIn from "@/components/user/SignIn.vue";
import Article from "@/components/articles/article.vue";
import DashBoard from "@/components/user/dashboard/index.vue";
import DashBoardMain from "@/components/user/dashboard/main.vue";
import UserProfile from "@/components/user/dashboard/pages/UserProfile.vue";
import AdminArticles from "@/components/user/dashboard/admin/articles.vue";
import AdminAdd from "@/components/user/dashboard/admin/add.vue";
import AdminEdit from "@/components/user/dashboard/admin/edit.vue";
import NotFound from "@/components/404.vue";

const routes = [
  { path: "/", component: Home, name: "Home" },
  {path: "/signin",component: SignIn,name: "SignIn",beforeEnter: isLoggendIn },
  { path:'/article/:id', component: Article, name:'article'},
  {
    path: "/user/dashboard",
    component: DashBoard,
    beforeEnter: isAuth,
    children: [
      { path: "", component: DashBoardMain, name: "DashBoard" },
      { path: "/profile", component: UserProfile, name: "UserProfile" },
      { path: "/articles", component: AdminArticles, name: "AdminArticles" },
      { path: "/articles/add", component: AdminAdd, name: "AdminAdd" },
      { path: "/articles/edit/:id", component: AdminEdit, name: "AdminEdit" },
    ],
  },
  // other routes here
  { path: "/:notFound(.*)*", component: NotFound, name: "404" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
