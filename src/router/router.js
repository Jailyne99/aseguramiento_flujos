import Vue from "vue";
import VueRouter from "vue-router";
import About from "../views/About";
import Home from "../views/Home";
import Process from "../views/Process";

Vue.use(VueRouter);

const routes = [
   {
      path: "/Home",
      name: "Home",
      component: Home
   },
   {
      path: "/process",
      name: "process",
      component: Process
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