<template>
  <v-app>
    <custom-nav-bar />
    <router-view />
  </v-app>
</template>


<script>
//import Login from "./views/CustomLogin.vue";
import CustomNavBar from "./components/CustomNavBar.vue";
//import Principal from "";

export default {
  name: "App",
  components: {
    CustomNavBar
  }
};
</script>

