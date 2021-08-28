import Vue from "vue";
import VueRouter from "vue-router";
import About from "../views/About";

Vue.use(VueRouter);

const routes = [
   {
      path: "/",
      name: "Home",
      component: require("../views/Home")
   },
   {
      path: "/About",
      name: "About",
      component: About
   }
]

const router = new VueRouter({
   routes
});

export default router;