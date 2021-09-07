<template>
  <div>
    <h1>Diagramas</h1>
    <v-row align="center" class="ma-2">
      <v-btn v-on:click="addNode()" class="mr-2" color="success">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      <v-btn class="mr-2" color="error">
        <v-icon dark>mdi-minus</v-icon>
      </v-btn>
      <v-btn class="mr-2" color="primary">Guardar</v-btn>
    </v-row>
    <div id="myDiagramDiv" style="width:1200px; height:400px; background-color: #DAE4E4;"></div>
  </div>
</template>

<script>
import goLocal from "../plugins/go.js";
var $ = goLocal.object.GraphObject.make;

export default {
  name: "Process",
  components: {},
  data() {
    return {
      figureArray: [{}],
      dinamicDiagram: null
    };
  },
  created() {
    //var $ = go.GraphObject.make;
  },
  mounted() {
    console.log("El elemento a sido montado...");

    var myDiagram = $(go.Diagram, "myDiagramDiv");
    this.dinamicDiagram = myDiagram;

    

    this.dinamicDiagram.nodeTemplate = $(
      go.Node,
      "Auto",
      $(go.Shape, { figure: "RoundedRectangle", fill: "white" }),
      $(go.TextBlock, { text: "hello!", margin: 5 })
    );

    this.dinamicDiagram.model = new go.Model(this.figureArray);

    console.log(this.figureArray);
  },
  methods: {
    addNode() {
      var node = $(
        go.Node,
        "Auto",
        $(go.Shape, { figure: "RoundedRectangle", fill: "pink" }),
        $(go.TextBlock, { text: "Beta", margin: 5 })
      );

      this.dinamicDiagram.add(node);
    }
  }
};
</script>   