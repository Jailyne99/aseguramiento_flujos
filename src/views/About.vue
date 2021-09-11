<template>
  <v-card class="elevation-16 mx-auto" width="900">
    <v-card-title class="text-h4"> Diagramas de flujo </v-card-title>
    <v-card-text>
      El diagrama de flujo o flujograma o diagrama de actividades es la
      representación gráfica de un algoritmo o proceso. Esta página web
      representa 5 flujos de procesos del CIV.
    </v-card-text>
    <v-card-title class="text-h4"> PNC</v-card-title>
    <v-card-text>
      Por sus siglas Producto No Conforme. Las no Conformidades de producto son
      aquellas relacionadas con el incumplimiento de alguno de los requisitos
      técnicos de nuestros productos: funciones, características, consumos,
      materiales, peso, color, tamaño. Las más comunes, suelen tener los
      siguientes motivos:
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>- Incumplimiento legal</v-list-item-title>
          <v-list-item-title
            >- Fallos de producción Errores de diseño</v-list-item-title
          >
          <v-list-item-title>- Documentación incorrecta</v-list-item-title>
          <v-list-item-title>- Falta de control de Calidad</v-list-item-title>
          <v-list-item-title
            >- Cambios en las especificaciones del cliente</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
    <v-card-title class="text-h4"> RO</v-card-title>
    <v-card-text>
      Por sus siglas Riesgo Operativo.riesgo que puede provocar pérdidas a una
      empresa debido a errores humanos, procesos internos inadecuados o
      defectuosos, fallos en los sistemas, entre otros. Este riesgo operacional
      va de la mano de todas las actividades, productos y procesos de la
      empresa. Factores del Riesgo Operativo.
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title>- Recursos humanos:</v-list-item-title>
          <v-list-item-subtitle>
            Existe cierto riesgo de que la empresa sufra pérdidas causadas por
            negligencia.
          </v-list-item-subtitle>
          <v-list-item-title>- Procesos internos:</v-list-item-title>
          <v-list-item-subtitle>
            Probabilidad de que se produzcan pérdidas por un diseño inadecuado
            <v-list-item-subtitle>
              de los procesos internos o que haya fijadas unas políticas
              inadecuadas.
            </v-list-item-subtitle>
          </v-list-item-subtitle>
          <v-list-item-title>- Procesos internos:</v-list-item-title>
          <v-list-item-subtitle>
            Probabilidad de que se produzcan pérdidas por un diseño inadecuado
            de los
            <v-list-item-subtitle>
              procesos internos o que haya fijadas unas políticas inadecuadas.
            </v-list-item-subtitle>
          </v-list-item-subtitle>
          <v-list-item-title>- Tecnología de información:</v-list-item-title>
          <v-list-item-subtitle>
            las pérdidas se derivan de un uso inadecuado de los sistemas de
            información
            <v-list-item-subtitle>
              y las tecnologías inherentes en los procesos de la empresa.
            </v-list-item-subtitle>
          </v-list-item-subtitle>
          <v-list-item-title>- Eventos externos:</v-list-item-title>
          <v-list-item-subtitle>
            Pérdidas procedentes de eventos ajenos al control de la empresa y
            que pueden
            <v-list-item-subtitle>
              alterar el desarrollo de su actividad.
            </v-list-item-subtitle>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-space-between"> </v-card-actions>
  </v-card>
</template>


<script>
export default {
  data: () => ({
    rating: 4.5,
  }),
};
</script>