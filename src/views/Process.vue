<template>
  <v-container>
    <v-row>
      <v-col md="3">
        <v-card flat class="mx-auto" max-width="900" tile>
          <v-list dense>
            <v-subheader class="font-weight-black">DIAGRAMA DE PROCESOS</v-subheader>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-icon>
                  <v-icon>mdi-arrow-right-circle-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content v-on:click="selectorItem(item.id)">
                  <v-list-item-title v-text="item.nombre"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col md="9">
        <div v-if="showDiagram">
          <diagrama
            v-bind:codigo="codigo"
            v-bind:id:="itemsTask[0].id"
            v-bind:descripcion="itemsTask[0].descripcion"
            v-bind:tiempo="itemsTask[0].tiempo"
            v-bind:showDiagram="showDiagram"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import CustomDiagrama from "../components/CustomDiagrama.vue";
import Diagrama from "../components/Diagramas.vue";

export default {
  components: {
    CustomDiagrama,
    Diagrama
  },
  data() {
    return {
      showDiagram: false,
      dialog: false,
      selectedItem: null,
      items: [{}],
      itemsTask: [{}],
      codigo: null
    };
  },
  created() {
    this.obtenerProcedimientos();
  },
  methods: {
    async obtenerProcedimientos() {
      const response = await fetch("http://localhost:5010/api/procedimientos");
      this.items = await response.json();
      return console.log(this.items);
    },
    async selectorItem(id) {
      console.log("Procedimiento seleccionado: " + id);
      this.codigo = id;
      if (this.codigo != null) {
        this.showDiagram = true;
        const response = await fetch(
          `http://localhost:5010/api/tareas/${this.codigo}`
        );
        this.itemsTask = await response.json();
        return console.log(this.itemsTask);
      } else {
        this.showDiagram = false;
      }
    }
  }
};
</script>
