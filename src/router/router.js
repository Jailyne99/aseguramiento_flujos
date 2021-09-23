import Vue from "vue";
import VueRouter from "vue-router";
import About from "../views/About";
import Home from "../views/Home";
import Process from "../views/Process";
import FormTarea from "../views/InsertTarea";
import Diagramas from "../components/Diagramas";
import BajaCuantia from "../views/BajaCuantia";
import CompraDirecta from "../views/CompraDirecta";
import Cotizacion from "../views/Cotizacion";
import CreacionProveedor from "../views/CreacionProveedor";


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
      path: "/Diagramas",
      name: "Diagramas",
      component: Diagramas
   },
   {
      path: "/BajaCuantia",
      name: "Diagramas",
      component: BajaCuantia
   },
   {
      path: "/CompraDirecta",
      name: "Diagramas",
      component: CompraDirecta
   },
   {
      path: "/Cotizacion",
      name: "Diagramas",
      component: Cotizacion
   },
   {
      path: "/CreacionProveedor",
      name: "InsertProcedimiento",
      component: CreacionProveedor
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