<template>
  <v-app>
    <custom-nav-bar class="ma-0 pa-0" />
    <router-view class />
  </v-app>
</template>


<script>
//import Login from "./views/CustomLogin.vue";
import CustomNavBar from "./components/CustomNavBar.vue";

export default {
  name: "App",
  components: {
    CustomNavBar,
  },
};
</script>

