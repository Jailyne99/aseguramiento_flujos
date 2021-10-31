<template>
  <v-container>
    <v-row>
      <v-col md="10">
        <v-card elevation="2">
          <v-container class="background" fluid>
            <h3>BAJA CUANTIA</h3>
          </v-container>
          <div
            id="myDiagramDiv"
            style="width: 100%; height: 1200px; background-color: white"
          ></div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import localGo from "../plugins/go";

export default {
  props: ["codigo", "id", "descripcion"],
  name: "BajaCuantia",
  data() {
    return {
      showDiagram: false,
      itemsTask: [{}],
      itemsTaskLinks: [{}],
      selectdNode: null,
    };
  },
  created() {
    this.loadData();
  },
  mounted() {},
  methods: {
    async loadData() {
      console.log("Se carga la data");
      const response = await fetch(`http://localhost:5010/api/tareas/${this.$route.params.id}`);
      this.itemsTask = await response.json();
      console.log("Este es el id: " + this.itemsTask[0].id);
      const response2 = await fetch(`http://localhost:5010/api/enlace/${this.$route.params.id}`);
      this.itemsTaskLinks = await response2.json();
      console.log("Este es el id: " + this.itemsTask[0].id);
      return this.loadAsyncDiagram(this.$router);
    },
    async selectorItem(id) {
      console.log("Procedimiento seleccionado: " + id);
      this.codigo = id;
      if (this.codigo != null) {
        this.showDiagram = true;
        const response = await fetch(`http://localhost:5010/api/tareas/${1}`);
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
        "Spot",
        $(
          go.Shape,
          "rectangle",
          { fill: "white" },
          new go.Binding("fill", "color"),
          new go.Binding("figure", "figura")
        ),
        $(
          go.TextBlock,
          "text",
          {
            font: "8pt sans-serif",
            overflow: go.TextBlock.OverflowEllipsis,
            textAlign: "center",
            maxLines: 5,
            margin: 2,
            width: 90,
          },
          new go.Binding("text", "texto")
        ),
        {
          click: function (e, obj) {
            console.log("Clicked on: " + obj.part.data.key);
            routes.push({
              name: "ProductoNoConforme",
              params: { id: obj.part.data.key },
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


<style>
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