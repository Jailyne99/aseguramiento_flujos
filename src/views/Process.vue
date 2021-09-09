<template>
  <v-container>
    <v-row>
      <v-col md="3">
        <v-card class="mx-auto" max-width="900" tile flat>
          <v-list flat>
            <v-subheader class="font-weight-black">DIAGRAMA DE PROCESOS</v-subheader>
            <v-list-item-group v-model="selectedItem" color="primary">
              <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-icon>
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
      <v-col md="9" class="diagrama">

    <custom-diagrama>

    </custom-diagrama>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import CustomDiagrama from "../components/CustomDiagrama.vue";

export default  {
  components:{
    CustomDiagrama
  },
  data: () => ({
    selectedItem: 1,
    items: [
      { text: "Baja cuantía", icon: "mdi-clock" },
      { text: "Audience", icon: "mdi-account" },
      { text: "Conversions", icon: "mdi-flag" },
    ],
  }),
};
</script>

<style scoped>
.diagrama{
  background-color: #DFDFDF;
  height: 100vh;
  margin-top: 10px;
  
}

</style>