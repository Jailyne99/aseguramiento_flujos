<template>
  <v-app data-app>
    <custom-nav-bar v-bind:keycloak="keycloak" class="ma-0 pa-0" />
    <router-view v-bind:keycloak="keycloak" v-bind:router="router" />
    <!-- <custom-footer /> -->
  </v-app>
</template>
<script>
import CustomNavBar from "./components/CustomNavBar.vue";
import CustomFooter from "./components/CustomFooter.vue";

export default {
  name: "App",
  props: ["keycloak", "router"],
  components: {
    CustomNavBar,
    CustomFooter,
    
  },
};
</script>

