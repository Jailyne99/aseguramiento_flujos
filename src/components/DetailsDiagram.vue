<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
        <v-btn x-small color="primary" dark v-bind="attrs" v-on="on"> Detalle </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Determinar estado de actividad
        </v-card-title>
        <v-card-text
          >Selecciona el boton CORRECTO si el procedimientos se realizó con
          exito, sino selecciona el botón INCORRECTO. Esto te ayudará a
          determinar si existe Producto No Conforme (PNC)</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Correcto
          </v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">
            Incorrecto
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "DetailsDiagram",
  components: {},
  data() {
    return {
         dialog: false,
    };
  },
};
</script>