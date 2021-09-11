<template>
  <v-app>
    <v-content>
      <section>
        <v-layout column wrap class="my-7" align-center>
          <v-flex xs3 sm4 class="my-3">
            <div class="text-xs-center">
              <h1 class="headline">MISIÓN Y VISIÓN INSTITUCIONAL</h1>
            </div>
          </v-flex>
          <v-flex xs12 sm4 class="my-9">
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs13 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center"> </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">MISION:</div>
                    </v-card-title>
                    <v-card-text>
                      Ser el ente rector que direcciona, reglamenta y representa
                      en el ámbito nacional a los sectores de comunicaciones,
                      infraestructura y vivienda; ejecutando políticas y
                      estrategias para integrar al país con servicios acorde al
                      desarrollo social y económico de la nación, contribuyendo
                      a mejorar la competitividad a través del ejercicio de una
                      administración y control eficientes.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs13 md6>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center"> </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">VISION:</div>
                    </v-card-title>
                    <v-card-text>
                      Ser una entidad modelo de la gestión pública, rectora del
                      desarrollo de la infraestructura del Estado, ejerciendo un
                      acompañamiento efectivo en el desarrollo de los sectores
                      de comunicaciones, infraesctructura y vivienda, como
                      soportes del crecimiento de la economía nacional; además
                      de ser un eje del desarrollo integral de los guatemaltecos
                      a través de la promoción y facilitación para el acceso
                      universal a la tecnología de la información, las
                      comunicaciones y vivienda.
                    </v-card-text>
                  </v-card>
                  
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section class="my-16"></section>

      <v-footer dark padless>
        <v-card class="flex" flat tile>
          <v-card-text class="py-6 white--text text-center">
            {{ new Date().getFullYear() }} — <strong>CIV</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {};
  },
};
</script>

