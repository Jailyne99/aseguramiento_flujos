<template>
  <v-container>
    {{codigo}}
    {{showDiagram}}
    <!-- <div
      id="myDiagramDiv"
      style="width:800px; height: 1200px; background-color: white; border: 1px solid black"
    ></div>-->
    <v-btn v-on:click="test()">prueba</v-btn>
    <v-btn v-on:click="Delete()">Rerender</v-btn>
    <div id="test"></div>
  </v-container>
</template>

<script>
import localGo from "../plugins/go";

export default {
  props: ["codigo", "showDiagram", "id", "descripcion", "tiempo"],
  name: "Diagramas",
  comments: {},
  data() {
    return {
      aux: "Este es el texto desde variable",
      dinamicDiagram: null,
      itemsProcedimientos: [{}]
    };
  },
  mounted() {},
  methods: {
    test() {
      const renderElemento = document.getElementById("test");
      const elemento = document.createElement("div");

      elemento.innerHTML = `<div id="myDiagramDiv2" style="width:800px; height: 1200px; background-color: white; border: 1px solid black"></div>`;
      renderElemento.appendChild(elemento);
      console.log("soy aux: " + this.aux);
      var $ = localGo.libGo.GraphObject.make;
      var myDiagram = $(go.Diagram, "myDiagramDiv2");
      /*var myDiagram2 = $(go.Diagram, "myDiagramDiv2");*/
      console.log(this.descripcion);
      const nodeDataArray = [
        { key: 1, color: "green", figura: "circle", texto: "Inicio" },
        {
          key: 2,
          color: "white",
          figura: "RoundedRectangle",
          texto: this.descripcion
        },
        {
          key: 3,
          color: "white",
          figura: "RoundedRectangle",
          texto: "Ingreso de gestión"
        },
        {
          key: 4,
          color: "white",
          figura: "RoundedRectangle",
          texto: "Validacion de documentos"
        },
        {
          key: 5,
          color: "white",
          figura: "RoundedRectangle",
          texto: "Asignacion de indicadores de impuestos"
        },
        {
          key: 6,
          color: "white",
          figura: "RoundedRectangle",
          texto: "Configuracion de cuenta bancaria"
        },
        {
          key: 7,
          color: "white",
          figura: "RoundedRectangle",
          texto: "Generacion de codigo de proveedor"
        },
        {
          key: 8,
          color: "red",
          figura: "circle",
          texto: "Fin"
        }
      ];

      const linkDataArray = [
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
        { from: 4, to: 5 },
        { from: 5, to: 6 },
        { from: 6, to: 7 },
        { from: 7, to: 8 }
      ];

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
            width: 90
          },
          new go.Binding("text", "texto"),
          {
            click: function(e, obj) {
              console.log("Clicked on " + obj.part.data.key);
            }
          }
        ),
        {
          click: function(e, obj) {
            console.log("Clicked on " + obj.part.data.key);
          }
        }
      );
    }
  }
};
</script>