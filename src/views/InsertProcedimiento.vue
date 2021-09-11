<template>
  <v-container>
    <v-card color="black darken-1" dark>
      <v-img
        height="200"
        src="https://udgtv.com/wp-content/uploads/2018/07/fondo-gris-degradado-1.jpg"
      >
        <v-row>
          <v-col class="text-right" cols="12">
            <v-menu bottom left transition="slide-y-transition">
              <v-list> </v-list>
            </v-menu>
          </v-col>
          <v-row class="pa-4" align="center" justify="center">
            <v-col class="text-center">
              <span class="black--text text--lighten-1">
                <h3 class="text-h3">
                  {{ nombre }}
                </h3></span
              >
              <span class="black--text text--lighten-1">{{ descripcion }}</span>
            </v-col>
          </v-row>
        </v-row>
      </v-img>
      <v-form>
        <v-container>
          <v-row class="ma-0 pa-0 mr-16 ml-16">
            <v-col md="12">
              <v-text-field
                v-model="nombre"
                filled
                color="blue-grey lighten-2"
                label="Nombre del proceso"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="ma-0 pa-0 mr-16 ml-16">
            <v-col md="12">
              <v-textarea
                v-model="descripcion"
                filled
                color="blue-grey lighten-2"
                label="Descripción"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <template>
          <div class="text-center">
            <v-btn rounded color="#3F51B5" dark v-on:click="prueba3()">
              Agreagar Procedimiento
            </v-btn>
          </div>
        </template>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "InsertProcedimiento",
  components: {},
  data() {
    return {
      nombre: null,
      descripcion: null,
    };
  },

  methods: {
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },
    async prueba3() {
      const infor = {
        payload: {
          nombre: this.nombre,
          descripcion: this.descripcion,
        },
      };
      console.log(infor);
      const response = await fetch(
        "http://localhost:5010/api/procedimientos/agregar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(infor),
        }
      );
      return console.log(response.json());
    },
  },
};
</script>