<template>
  <v-app>
    <v-container>
      <h1>hola HOME</h1>
      <v-list
        v-for="item in items"
        v-bind:key="item.id"
        class="py-2 my-0"
        @click.native="item.action"
        dense
        nav
      >
        <v-list-item link :to="item.path">
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      items: [
        {
          title: "About",
          path: "/About",
          action: this.rutas,
        },
      ],
    };
  },
  methods: {
    rutas() {
      console.log("SE EJECUTO RUTAS");
      console.log(this.$route.path);
    },
  },
};
</script>
