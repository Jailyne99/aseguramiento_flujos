import Vue from "vue";
import VueRouter from "vue-router";

Vue.use (VueRouter);

const rutas = {
   path: "/*/HelloWorld.vue/",
   name: "HelloWorld",
   component: () => import("../components/HelloWorld.vue"),
} 

const router = VueRouter ({
   routes
   });