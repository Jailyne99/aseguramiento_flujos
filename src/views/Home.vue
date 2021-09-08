<template>
  <h1>Hola soy el componente HOME</h1>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      parseResponse: [],
    };
  },
  created() {
    this.prueba();
  },
  methods: {
    async prueba() {
      const response = await fetch("http://localhost:4000/list_movies");
      this.parseResponse = await response.json();
      return console.log(this.parseResponse);
    },
  },
};
</script>
