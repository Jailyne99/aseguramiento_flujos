<template>
  <v-container data-app>
    <v-container class="background" fluid>
      <h3>Reporte de actividad</h3>
    </v-container>
    <v-data-table  :headers="headers" :items="items" class="elevation-0">
      <template v-slot:[`item.estatus`]="{ item }">
        <v-chip
          v-bind:class="{
            blue: item.estatus == 1,
            yellow: item.estatus == 2,
            red: item.estatus == 3,
          }"
          small
          dark
        >
          {{ parseTexto(item.estatus) }}
        </v-chip>
      </template>
      <template v-slot:[`item.PROCEDIMIENTO_id`]="{ item }">
            {{ parseTexto2(item.PROCEDIMIENTO_id) }}
      </template>
      <template v-slot:[`item.fecha`]="{ item }">
            {{ parseFecha(item.fecha) }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  name: "Reporte",
  components: {},
  data() {
    return {
      headers: [
        {
          text: "id",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Fecha", value: "fecha" },
        { text: "Procedimiento", value: "PROCEDIMIENTO_id" },
        { text: "Usuario", value: "usuario" },
        { text: "Descripcion", value: "descripcion" },
        { text: "Estatus", value: "estatus" },
      ],
      items: [{}],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      const response = await fetch("http://localhost:5010/api/reportes");
      this.items = await response.json();
      return console.log(this.items);
    },
    parseTexto(val) {
      switch (val) {
        case "1":
          return "Activo";
        case "2":
          return "PNC";
        case "3":
          return "RO";
      }
    },
    parseTexto2(val){
        switch (val) {
        case 1:
          return "Solicitud de cheque";
        case 2:
          return "Creacion de proveedor";
        case 3:
          return "Pago de servicios basicos";
        case 4:
          return "Cotizacion"  
        case 5:
          return "Baja cuantia";
      }
    },
    parseFecha(date){
        let arr = date.split('T'); 
        return arr[0];
    }
  },
};
</script>

<style scoped>
.background {
  color: white;
  background: rgb(73, 73, 74);
  background: linear-gradient(
    90deg,
    rgba(73, 73, 74, 1) 0%,
    rgba(128, 128, 128, 1) 68%,
    rgba(43, 44, 45, 1) 89%
  );
}
</style>