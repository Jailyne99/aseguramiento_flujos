<template>
  <v-container fluid>
    <v-app-bar>
      <v-toolbar-title>Ministerio de comunicaciones</v-toolbar-title>
    </v-app-bar>
    <v-app-bar dark flat dense>
      <v-btn small>Home</v-btn>
      <v-btn small>About</v-btn>
      <v-row>
        <v-menu dense>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ml-4" small v-bind="attrs" v-on="on">Diagramas</v-btn>
          </template>
          <v-list color="white" dense>
            <v-list-item v-for="item in itemsDiagrama" :key="item.id">
              <v-btn elevation="0" class="ma-0 pa-0" x-small :to="item.path">
                <v-list-item-title>{{item.title}}</v-list-item-title>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-app-bar>
  </v-container>
</template>

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
          action: this.rutas
        },
        {
          title: "Acerca de",
          path: "/About",
          action: this.rutas
        }
      ],
      itemsDiagrama: [
        {
          title: "Baja cuenatia",
          path: "/BajaCuantia",
          action: this.rutas
        },
        {
          title: "Compra directa",
          path: "/CompraDirecta",
          action: this.rutas
        },
        {
          title: "Cotización",
          path: "/Cotizacion",
          action: this.rutas
        },
        {
          title: "Creación proveedor",
          path: "/CreacionProveedor",
          action: this.rutas
        }
      ]
    };
  },
  methods: {
    rutas() {
      console.log("Se ejecuto la ruta: ");
      console.log(this.$route.path);
    }
  }
};
</script>


<style scoped>
.uprow {
  background: green;
  float: left;
}

.downrow {
  background: blue;
}
</style>
