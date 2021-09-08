<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Aseguramiento de la calidad de software</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-app-bar color="gray" max-height="45" dense >
      <v-row>
        <div v-for="item in items" v-bind:key="item.id" v-on:click="item.action">
          <v-col class="ma-0 pa-0">
            <v-btn link :to="item.path" class="ma-0" elevation="0" small block >
              <span>
                {{item.title}}
              </span>
            </v-btn>
          </v-col>
        </div>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "CustomNavBar",
  components: {},
  data() {
    return {
      items: [
        {
          title: "Home",
          path: "/Home",
          action: this.rutas
        },
        {
          title: "Process",
          path: "/Process",
          action: this.rutas
        },
        {
          title: "About",
          path: "/About",
          action: this.rutas
        },
        {
          title: "Login",
          path: "/Login",
          action: this.rutas
        },
      ]
    };
  },
  methods: {
    rutas() {
      console.log("SE EJECUTO RUTAS");
      console.log(this.$route.path);
    }
  }
};
</script>



