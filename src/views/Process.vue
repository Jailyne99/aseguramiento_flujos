<template>
  <v-container>
    <v-row>
      <v-col md="3">
        <v-card class="mx-auto" max-width="900" tile>
          <v-list>
            <v-subheader class="font-weight-black"
              >DIAGRAMA DE PROCESOS</v-subheader
            >
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
      <v-col md="9" class="diagrama">
        <custom-diagrama v-bind:id="codigo" v-bind:mostrar="showTable">
        </custom-diagrama>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import CustomDiagrama from "../components/CustomDiagrama.vue";

export default {
  components: {
    CustomDiagrama,
  },
  data() {
    return {
      showTable: false,
      dialog: false,
      selectedItem: null,
      items: [{}],
      codigo: null,
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
    selectorItem(id) {
      console.log("ESTE ES EL IDE: " + id);
      this.codigo = id;
        if (this.id !== null) {
      this.showTable = true;
    } else {
      this.showTable = false;
    }
    console.log(this.showTable);
    },
  },
};
</script>
