<template>
  <div>
    <v-container class="ma-0 pa-0" data-app fluid>
      <v-carousel
        cycle
        hide-delimiter-background
        show-arrows-on-hover
        class="ma-0 pa-0"
        v-model="model"
      >
        <v-carousel-item
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        >
          <v-img></v-img>
        </v-carousel-item>
      </v-carousel>
      <v-layout column wrap class="ma-0 mt-8" align-center>
        <v-flex>
          <v-container grid-list-xl>
            <v-layout row wrap align-center>
              <v-flex>
                <v-card elevation="4" color="#102c4c" dark>
                  <v-card-title class="mb-2 text-h5 text-justify">
                    MISIÓN
                  </v-card-title>
                  <v-card-subtitle class="text-justify"
                    >Ser el ente rector que direcciona, reglamenta y representa
                    en el ámbito nacional a los sectores de comunicaciones,
                    infraestructura y vivienda; ejecutando políticas y
                    estrategias para integrar al país con servicios acorde al
                    desarrollo social y económico de la nación, contribuyendo a
                    mejorar la competitividad a través del ejercicio de una
                    administración y control eficientes.</v-card-subtitle
                  >
                </v-card>
              </v-flex>
              <v-flex>
                <v-card elevation="4" color="#102c4c" dark>
                  <v-card-title class="mb-2 text-h5"> VISIÓN </v-card-title>

                  <v-card-subtitle class="text-justify"
                    >Ser una entidad modelo de la gestión pública, rectora del
                    desarrollo de la infraestructura del Estado, ejerciendo un
                    acompañamiento efectivo en el desarrollo de los sectores de
                    comunicaciones, infraesctructura y vivienda, como soportes
                    del crecimiento de la economía nacional; además de ser un
                    eje del desarrollo integral de los guatemaltecos a través de
                    la promoción y facilitación para el acceso universal a la
                    tecnología de la información, las comunicaciones y
                    vivienda.</v-card-subtitle
                  >
                </v-card>
              </v-flex>
              <v-flex>
                <v-card elevation="4" color="#102c4c" dark>
                  <v-card-title class="mb-2 text-h5 text-justify">
                    VALORES
                  </v-card-title>

                  <v-card-subtitle
                    >Responsabilidad, honestidad, lealtad, solidaridad,
                    transparencia, integridad.</v-card-subtitle
                  >
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
      </v-layout>
      <section class="mt-16"></section>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      dialog: false,
      model: 0,
      items: [
        { src: "https://i.imgur.com/iRMQElr.png" },
        { src: "https://i.imgur.com/tQ9LA7w.png" },
        { src: "https://i.imgur.com/8oSRePW.png" },
        { src: "https://i.imgur.com/2JhVZlJ.png" },
        { src: "https://i.imgur.com/BilcB3o.png" },
      ],
    };
  },
};
</script>

