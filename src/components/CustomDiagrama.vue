<template>
  <v-container>
    <v-row>
      <div v-if="mostrar">
        <v-data-table
          :headers="headers"
          :items="parseResponse"
          class="elevation-0"
        >
          <template v-slot:[`item.estado`]="{ item }">
            <v-chip :color="getColor(item.estado)" dark>
              {{ item.estado }}
            </v-chip>
          </template>
          <template v-slot:[`item.detalle`]="{ item }">
            <details-diagram v-bind:id="item" />
          </template>
        </v-data-table>
      </div>
      
    </v-row>
  </v-container>
</template>

<script>
import DetailsDiagram from "./DetailsDiagram.vue";
export default {
  props: ["id", "mostrar"],
  components: { DetailsDiagram },
  data() {
    return {
      parseResponse: [{}],
      headers: [
        { text: "Descripción de Tarea", value: "descripcion" },
        { text: "Responsable", value: "USUARIO_id" },
        { text: "Tiempo estimado en minutos", value: "tiempo" },
        { text: "Estado", value: "estado" },
        { text: "Detalle", value: "detalle" },
      ],
    };
  },
  created() {
    console.log("CORRECTO: " + this.id);
    if (this.mostrar !== null) {
      this.cargarTabla();
    }
  },
  methods: {
    getColor(estado) {
      if (estado > 400) return "red";
      else if (estado > 200) return "orange";
      else return "green";
    },
    async cargarTabla() {
      const response = await fetch("http://localhost:5010/api/tareas");
      this.parseResponse = await response.json();
      return console.log(this.parseResponse);
    },
   /* async cargarTareas() {
      const response = await fetch(
        `http://localhost:5010/api/tarea/:${this.id}`
      );
      this.parseResponse = await response.json();
      return console.log(this.parseResponse);
    },*/
  },
};
</script>