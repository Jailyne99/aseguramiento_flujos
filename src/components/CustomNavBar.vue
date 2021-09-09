<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#0F3454"
      dark
      shrink-on-scroll
      prominent
      src="https://cutt.ly/LWJeeSp"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-4"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon>
        
      </v-app-bar-nav-icon>

      <v-toolbar-title>Diagramas de Flujo</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <template v-slot:extension>
  <v-app-bar color="gray" max-height="50"  dense >
      <v-row>
        <div v-for="item in items" v-bind:key="item.id" v-on:click="item.action">
          <v-col class="ma-0 pa-0">
            <v-btn link :to="item.path" class="ma-0" elevation="5" small block >
              <span>
                {{item.title}}
              </span>
            </v-btn>
          </v-col>
        </div>
      </v-row>
    </v-app-bar>
      </template>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-4"
      class="overflow-y-auto"
      max-height="225"
    >
      <v-container style="height: 1000px;"></v-container>
    </v-sheet>
  </v-card>
</template>


<!----------------------------------------------------- SCRIPT --------------------------------------------------------------------->

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

