<template>
  <v-container fluid>
    <v-app-bar color="white" >
      <v-img
        max-height="150"
        max-width="250"
        src="https://i.imgur.com/rPekFPe.jpeg"
      ></v-img>
      <v-toolbar-title>Ministerio de comunicaciones</v-toolbar-title>
      <v-spacer></v-spacer>
      <div v-for="item in itemlogout" :key="item.id">
        <v-btn color="red" @click.native="item.action" :to="item.path" small>
          {{ item.title }}
        </v-btn>
      </div>
    </v-app-bar>
    <v-app-bar color="#102c4c" dark flat dense>
      <div v-for="item in items" :key="item.id">
        <v-btn color="#102c4c" class="ml-2" @click.native="item.action" :to="item.path" small dark>
          <v-icon
          dark
          left
        >
          {{item.icon}}
        </v-icon>
          {{ item.title }}
        </v-btn>
      </div>
      <v-row>
        <v-menu dense>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#102c4c" class="ml-4" small v-bind="attrs" v-on="on" dark> <v-icon
          dark
          left
        >
          mdi-sitemap
        </v-icon> Flujos viejos</v-btn>
          </template>
          <v-list color="white" dense>
            <v-list-item
              v-for="item in itemsDiagrama"
              :key="item.id"
              :to="item.path"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu dense>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#102c4c" class="ml-4" small v-bind="attrs" v-on="on" dark><v-icon
          dark
          left
        >
          mdi-sitemap
        </v-icon> Flujos optimizados</v-btn>
          </template>
          <v-list color="white" dense>
            <v-list-item
              v-for="item in itemsOP"
              :key="item.id"
              :to="item.path"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
      <v-spacer></v-spacer>
     <v-icon class="mr-2" >mdi-account</v-icon> {{ this.keycloak.tokenParsed.preferred_username }}
    </v-app-bar>
  </v-container>
</template>z


<script>
export default {
  name: "CustomNavBar",
  props: ["keycloak"],
  components: {},
  data() {
    return {
      items: [
        {
          id: 9,
          title: "Inicio",
          path: "/Home",
          action: this.rutas,
          icon: "mdi-home"
        },
        {
          id: 10,
          title: "Glosario",
          path: "/About",
          action: this.rutas,
          icon: "mdi-book"
        },
        {
          id: 11,
          title: "Reporte",
          path: "/Reporte",
          action: this.rutas,
          icon: "mdi-chart-box"
        },
        {
          id: 13,
          title: "Objetivos",
          path: "/Objetivos",
          action: this.rutas,
          icon: "mdi-check-circle"
        },
        {
          id: 14,
          title: "Dashboard",
          path: "/Dashboard",
          action: this.rutas,
          icon: "mdi-chart-pie"
        }
      ],
      itemsDiagrama: [
        {
          id: 1,
          title: "Creacion de proveedor",
          path: "/SolicitudDeCheque",
          action: this.rutas,
        },
        {
          id: 2,
          title: "Solicitud de cheque",
          path: "/CreacionDeCheque",
          action: this.rutas,
        },
        {
          id: 3,
          title: "Pago de Servicios basicos",
          path: "/PagoDeServiciosBasicos",
          action: this.rutas,
        },
        {
          id: 4,
          title: "Cotizacion",
          path: "/Cotizacion",
          action: this.rutas,
        },
        {
          id: 5,
          title: "Baja cuantia",
          path: "/RiesgoOperativo",
          action: this.rutas,
        }
      ],
      itemsOP: [
        {
          id: 6,
          title: "Creacion de proveedor",
          path: "/SolicitudDeChequeOP",
          action: this.rutas,
        },
        {
          id: 7,
          title: "Solicitud de cheque",
          path: "/CreacionDeChequeOP",
          action: this.rutas,
        },
        {
          id: 8,
          title: "Pago de servicios basicos",
          path: "/PagoDeServiciosBasicosOP",
          action: this.rutas,
        },
        {
          id: 9,
          title: "Cotizacion",
          path: "/CotizacionOP",
          action: this.rutas,
        },
        {
          id: 10,
          title: "Baja cuantia",
          path: "/RiesgoOperativoOP",
          action: this.rutas,
        }
      ],
      itemlogout: [
        {
          id: 12,
          title: "Logout",
          action: this.keycloak.logout,
        },
      ]
    };
  },
  created() {
    console.log("Username:" + this.keycloak.tokenParsed.preferred_username);
  },
  methods: {
    renderDiagram(val) {
      console.log("Reconocimiento id: " + val);
      this.$router.push({
        name: "Diagram",
        params: { id: val },
      });
      //window.location.reload();
    },
    rutas() {
      console.log("Se ejecuto la ruta: ");
      console.log(this.$route.path);
    },
  },
};
</script>


<style scoped>
.uprow {
  background: green;
  float: left;
}

.sub {
  color: black;
}

.downrow {
  background: blue;
}
.spacebar{
  background: white;
}
</style>
