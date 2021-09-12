import Vue from "vue";
import VueRouter from "vue-router";
import About from "../views/About";
import Home from "../views/Home";
import Process from "../views/Process";
//import Login from "../views/CustomLogin";
import FormProcedimiento from "../views/InsertProcedimiento";
import FormTarea from "../views/InsertTarea";


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
   },
   {
      path: "/Procedimiento",
      name: "InsertProcedimiento",
      component: FormProcedimiento
   },
   {
      path: "/Tarea",
      name: "InsertTarea",
      component: FormTarea
   }
]

const router = new VueRouter({
   routes
});

export default router;