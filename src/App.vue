<template>
  <v-app>
    <custom-nav-bar v-bind:keycloak="keycloak" class="ma-0 pa-0" />
    <router-view v-bind:keycloak="keycloak" />
  </v-app>
</template>


<script>
//import Login from "./views/CustomLogin.vue";
import CustomNavBar from "./components/CustomNavBar.vue";
//import Principal from "";

export default {
  name: "App",
  props: ["keycloak"],
  components: {
    CustomNavBar,
  },
};
</script>

