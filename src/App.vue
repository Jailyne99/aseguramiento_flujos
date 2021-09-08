<template>
 <v-app>
   <v-toolbar app>
   </v-toolbar>
   <v-content>
     <router-view/>
   </v-content>
 </v-app>
</template>


<script>
//import Login from "./views/CustomLogin.vue";
import CustomNavBar from "./components/CustomNavBar.vue";
//import Principal from "";

export default {
  name: "App",
  components: {
    CustomNavBar,
  },
};
</script>

