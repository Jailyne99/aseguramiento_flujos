<template>
  <v-container>
    <h1>Hola soy el componente HOME</h1>
    <v-btn v-on:click="prueba3()">agregar</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      parseResponse: [],
      datos: {
        nombre: "prueba",
        descripcion: "descripcion prueba",
      },
    };
  },
  created() {
    this.prueba();
    this.prueba2();
  },
  methods: {
    async prueba() {
      const response = await fetch("http://localhost:5010/api/procedimientos");
      this.parseResponse = await response.json();
      return console.log(this.parseResponse);
    },
    async prueba2() {
      const response = await fetch(
        "http://localhost:5010/api/procedimientos/2"
      );
      this.parseResponse = await response.json();
      return console.log(this.parseResponse);
    },
    async prueba3() {
      const infor = {
        payload: {
          nombre: this.datos.nombre,
          descripcion: this.datos.descripcion,
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
