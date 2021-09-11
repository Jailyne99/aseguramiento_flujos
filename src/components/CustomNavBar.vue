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

      <v-img
        max-height="162"
        max-width="73"
        src="https://i.imgur.com/6rT6UC1.png"
      ></v-img>

      <v-toolbar-title class="mb-10"
        ><h3>MINISTERIO DE COMUNICACIONES INFRAESTRURCTURA Y
        VIVIENDA</h3></v-toolbar-title
      >

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-app-bar color="gray" max-height="50" dense>
          <v-row>
            <div
              v-for="item in items"
              v-bind:key="item.id"
              v-on:click="item.action"
            >
              <v-col class="ma-0 pa-0">
                <v-btn
                  flat
                  link
                  :to="item.path"
                  class="ma-0"
                  elevation="0"
                  small
                  block
                >
                  <span>
                    {{ item.title }}
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
      <v-container style="height: 1000px"></v-container>
    </v-sheet>
  </v-card>
</template>


<!----------------------------------------------------- SCRIPT --------------------------------------------------------------------->

<script>
export default {
  name: "CustomNavBar",
  props: ["keycloak"],
  components: {},
  data() {
    return {
      items: [
        {
          title: "Inicio",
          path: "/Home",
          action: this.rutas,
        },
        {
          title: "Procedimientos",
          path: "/Process",
          action: this.rutas,
        },
        {
          title: "Acerca de",
          path: "/About",
          action: this.rutas,
        },
        {
          title: "Agregar Procedimiento",
          path: "/Procedimiento",
          action: this.rutas,
        },
        {
          title: "Agregar Tarea",
          path: "/Tarea",
          action: this.rutas,
        },
         {
          title: "Logout",
          path: "/Logout",
          action: this.keycloak.logout,
        },
      ],
    };
  },
  methods: {
    rutas() {
      console.log("SE EJECUTO RUTAS");
      console.log(this.$route.path);
    },
  },
};
</script>

