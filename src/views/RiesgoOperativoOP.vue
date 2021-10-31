<template>
  <v-container>
    <v-row>
      <v-col md="8">
        <v-card elevation="2" >
          <v-container class="background" fluid>
            <h3>Baja cuantia</h3>
          </v-container>
          <div
            id="myDiagramDiv"
            style="width: 100%; height: 1000px; background-color: white"
          ></div>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card class="pb-2" elevation="2">
          <v-container class="background" fluid>
            <h3>Optimizacion Tiempo</h3>
          </v-container>
          <v-alert class="ma-4" outlined type="success" text>
            En el proceso Completar la solicitud de pedido de compra o adquisición..."
            Se contaba con 2 dias establecidos, pero por temas de urgencia
            de información, se cambió a 2hr, 1hr si surgen inconvenientes.
          </v-alert>
          <v-alert class="ma-4 mb-2" outlined type="success" text>
            En el proceso "Recibir expediente y consultar en el Portal de Guatecompras..."
            Se contaba con 1 hora establecida, pero se verificó el tiempo necesario para 
            la verificación de la informacion dada, contando con 20 min.
          </v-alert>
          <v-alert class="ma-4 mb-2" outlined type="success" text>
            En el proceso "Trasladar expediente a Encargado de Compras para 
            revisión y aprobación."
            Se contaba con 1 hora establecida, pero se verificó el tiempo solo del 
            traslado de la información de un departamento a otro, reduciendo el
            tiempo a 10 min.
          </v-alert>
          <v-alert class="ma-4 mb-2" outlined type="success" text>
            En el proceso "Revisar y aprobar la adquisición al proveedor..."
            Se contaba con 1 hora establecida, pero se verificó el tiempo 
            solo del traslado de la información de un departamento a otro,
            reduciendo el tiempo a 20 min.
          </v-alert>
            <v-alert class="ma-4 mb-2" outlined type="success" text>
            En el proceso "Recibir factura, revisar datos de facturación..."
            Se contaba con 1 hora establecida, pero se verificó el tiempo
            solo del traslado de la información de un departamento a otro, 
            reduciendo el tiempo a 20 min.
          </v-alert>
            <v-alert class="ma-4 mb-2" outlined type="success" text>
            En el proceso "Si los datos son correctos, la factura original es..."
            Se contaba con 1 día establecido, pero se verificó el tiempo 
            solo del traslado de la información de un departamento a otro,
            reduciendo el tiempo a 1 hr.
          </v-alert>
            <v-alert class="ma-4 mb-2" outlined type="success" text>
            En el proceso "Una vez reciibida la factura la misma deberá de ser 
            publicada..."
            Se contaba con 1 día establecido, pero se verificó el tiempo que
            solo se necesita 1hr para publicar una facturacion.
            </v-alert>
          <v-alert class="ma-4 mb-2" outlined type="success" text>
            En el proceso "Si la compra se tratase de un bien y/o suministro..."
            Se contaba con 1 día establecido, pero se verificó el tiempo que
            solo se necesita 2hrs para trasladar una copia de facturación
            para elavoracion de 1-H.
            </v-alert>
          <v-alert class="ma-4 mb-2" outlined type="success" text>
            En el proceso "Recibir e integrar al expediente los documentos
            recibidos de Almacén..."
           Se contaba con 2 días establecidos, pero se verificó el tiempo
           que solo se necesita 2hrs para recibir y verificar el expediente
           de los documentos recibidos.
            </v-alert>
        </v-card>
      </v-col>
    </v-row>
    <router-view v-bind:currentFlow="currentFlow" />
  </v-container>
</template>


<script>
import localGo from "../plugins/go";
export default {
  data() {
    return {
      showDiagram: false,
      itemsTask: [{}],
      itemsTaskLinks: [{}],
      selectdNode: null,
      currentFlow: true,
      dialog: false,
      componentPath: "",
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
    };
  },
  created() {
    this.loadData();
  },
  mounted() {},
  methods: {
    async loadData() {
      console.log("Se carga la data");
      const response = await fetch(
        `http://localhost:5010/api/procedimientos/mejorada/op/${5}`
      );
      this.itemsTask = await response.json();
      console.log("Este es el id: " + this.itemsTask[0].id);
      const response2 = await fetch(`http://localhost:5010/api/enlace/${5}`);
      this.itemsTaskLinks = await response2.json();
      console.log("Este es el id: " + this.itemsTask[0].id);
      return this.loadAsyncDiagram(this.$router);
    },
    async selectorItem(id) {
      console.log("Procedimiento seleccionado: " + id);
      this.codigo = id;
      if (this.codigo != null) {
        this.showDiagram = true;
        const response = await fetch(`http://localhost:5010/api/tareas/op/${5}`);
        this.itemsTask = await response.json();
        return console.log(this.itemsTask);
      } else {
        this.showDiagram = false;
      }
    },
    loadAsyncDiagram(routes) {
      var $ = localGo.libGo.GraphObject.make;
      var myDiagram = $(go.Diagram, "myDiagramDiv");
      const nodeDataArray = this.itemsTask;
      const linkDataArray = this.itemsTaskLinks;

      myDiagram.layout = $(go.TreeLayout, { angle: 90 });
      myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

      myDiagram.nodeTemplate = $(
        go.Node,
        "Table",
        $(
          go.Shape,
          "rectangle",
          { fill: "white" },
          new go.Binding("fill", "color"),
          new go.Binding("figure", "figura")
        ),
        $(
          go.Panel,
          "Table",
          $(
            go.TextBlock,
            "Three Col Header", // spans all three columns
            {
              font: "bold 8pt sans-serif",
              row: 0,
              column: 0,
              columnSpan: 3,
              maxLines: 5,
              stretch: go.GraphObject.Horizontal,
              margin: 2,
              width: 90,
              text: "Actividad ",
              textAlign: "center",
              stroke: "black",
            },
          ),
          $(
            go.TextBlock,
            "row 1\ncol 0", // spans all three columns
            {
              font: "8pt sans-serif",
              row: 1,
              column: 0,
              columnSpan: 3,
              maxLines: 5,
              stretch: go.GraphObject.Horizontal,
              margin: 2,
              width: 90,
              textAlign: "center",
            },
            new go.Binding("text", "texto")
          ),
          $(
            go.TextBlock,
            "row 2\ncol 0", // spans all three columns
            {
              font: "bold  8pt sans-serif",
              row: 2,
              column: 0,
              columnSpan: 3,
              maxLines: 5,
              stretch: go.GraphObject.Horizontal,
              margin: 2,
              width: 90,
              text: "Encargado ",
              textAlign: "center",
            },
          ),
          $(
            go.TextBlock,
            "row 3\ncol 0",
            {
              font: "8pt sans-serif",
              row: 3,
              column: 0,
              margin: 2,
              textAlign: "right",
              stroke: "blue",
            },
            new go.Binding("text", "nombre")
          )
        ),
        {
          click: function (e, obj) {
            let path = window.location.href;
            let ro = true;
            let componentPath = path
              .substring(path.indexOf("/#"))
              .split("/")[2];
            routes.push({
              name: "ProductoNoConforme",
              params: { id: obj.part.data.key, path: componentPath, riesgo: ro},
            });
          },
        }
      );

      var modelAsText = myDiagram.model.toJson();
      console.log(modelAsText);
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
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