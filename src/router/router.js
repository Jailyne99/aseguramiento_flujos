import Vue from "vue";
import VueRouter from "vue-router";
import About from "../views/About";
import Home from "../views/Home";
import Process from "../views/Process";
import CreacionDeCheque from "../views/CreacionDeCheque";
import SolicitudDeCheque from "../views/SolicitudDeCheque";
import ProductoNoConforme from "../components/ProductoNoConforme";
import Reporte from "../views/Reporte";
import PagoDeServiciosBasicos from "../views/PagoDeServiciosBasicos";
import Cotizacion from "../views/Cotizacion";
import RiesgoOperativo from "../views/RiesgoOperativo";
import Objetivos from "../views/Objetivos";
import SolicitudDeChequeOP from "../views/SolicitudDeChequeOP";
import CreacionDeChequeOP from "../views/CreacionDeChequeOP";
import CotizacionOP from "../views/CotizacionOP";
import PagoDeServiciosBasicosOP from "../views/PagoDeServiciosBasicosOP";
import RiesgoOperativoOP from "../views/RiesgoOperativoOP";
import CustomFooter from "../components/CustomFooter";
import Dashboard from "../views/Dashboard";

Vue.use(VueRouter);

const routes = [
   {
      path: '*', 
      name: 'default',
      redirect: '/Home' 
   },
   {
      path: "/Dashboard",
      name: "Dashboard",
      component: Dashboard
   },
   {
      path: "/Home",
      name: "Home",
      component: Home
   },
   {
      path: "/CustomFooter",
      name: "CustomFooter",
      component: CustomFooter
   },
   {
      path: "/process",
      name: "process",
      component: Process
   },
   {
      path: "/Reporte",
      name: "reporte",
      component: Reporte
   },
   {
      path: "/About",
      name: "About",
      component: About
   },
   {
      path: "/Objetivos",
      name: "Objetivos",
      component: Objetivos
   },
   {
      path: "/CreacionDeCheque",
      name: "CreacionDeCheque",
      component: CreacionDeCheque
   },
   {
      path: "/SolicitudDeCheque",
      name: "SolicitudDeCheque",
      component: SolicitudDeCheque
   },
   {
      path: "/PagoDeServiciosBasicos",
      name: "PagoDeServiciosBasicos",
      component: PagoDeServiciosBasicos
   },
   {
      path: "/Cotizacion",
      name: "Cotizacion",
      component: Cotizacion
   },
   {
      path: "/RiesgoOperativo",
      name: "RiesgoOperativo",
      component: RiesgoOperativo
   },
   {
      path: "/ProductoNoConforme",
      name: "ProductoNoConforme",
      component: ProductoNoConforme
   },
   {
      path: "/SolicitudDeChequeOP",
      name: "SolicitudDeChequeOP",
      component: SolicitudDeChequeOP
   },
   {
      path: "/CreacionDeChequeOP",
      name: "CreacionDeChequeOP",
      component: CreacionDeChequeOP
   },
   {
      path: "/PagoDeServiciosBasicos",
      name: "PagoDeServiciosBasicos",
      component: PagoDeServiciosBasicos
   },
   {
      path: "/CotizacionOP",
      name: "CotizacionOP",
      component: CotizacionOP
   },
   {
      path: "/PagoDeServiciosBasicosOP",
      name: "PagoDeServiciosBasicosOP",
      component: PagoDeServiciosBasicosOP
   },
   {
      path: "/RiesgoOperativoOP",
      name: "RiesgoOperativoOP",
      component: RiesgoOperativoOP
   },

]

const router = new VueRouter({
   routes
});

export default router;