<template>
  <v-container>
    <v-card color="black darken-1" dark>
      <v-form>
        <v-container>
          <v-row>
            <v-container class="mb-12">
              <v-row class="ma-0 pa-0 mr-10 ml-16">
                <v-col>
                  <v-textarea
                    v-model="descripcion"
                    filled
                    color="blue-grey lighten-2"
                    label="Descripción"
                  ></v-textarea>
                </v-col>
                <v-col cols="12" md="5">
                  <v-text-field
                    v-model="time"
                    placeholder="Escribe el tiempo en minutos"
                    type="numeric"
                    filled
                    label="Tiempo"
                    clearable
                  ></v-text-field>
                  <v-select
                    v-model="select"
                    :items="aux"
                    :rules="[(v) => !!v || 'Item is required']"
                    label="Procedimientos existentes"
                    required
                    v-on:change="selectorItem()"
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-row>
        </v-container>
      </v-form>
      <v-divider class="mb-2"></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <template>
          <div class="text-center mb-2">
            <v-btn rounded color="#3F51B5" dark v-on:click="agregarTarea()">
              Agregar Tarea
            </v-btn>
          </div>
        </template>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "InsertTarea",
  data() {
    return {
      aux: [],
      codigo: [],
      time: null,
      descripcion: null,
      select: null,
      items: [{}],
      checkbox: false,
      estado: 1
    };
  },
  created() {
    this.obtenerProcedimiento();
  },
  methods: {
    selectorItem() {
      console.log(this.select);
      this.codigo = this.items.filter((item) => {
        return item.nombre == this.select;
      });
      console.log(this.codigo[0].id);
    },
    async obtenerProcedimiento() {
      const response = await fetch("http://localhost:5010/api/procedimientos");
      this.items = await response.json();
      this.aux = this.items.map((item) => {
        return item.nombre;
      });
      console.log(this.aux);
      return console.log(this.items);
    },
    tiempo() {
      console.log(this.time);
    },
    remove(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },
    async agregarTarea() {
      const infor = {
        payload: {
          tiempo: this.time,
          descripcion: this.descripcion,
          estado: this.estado,
          PROCEDIMIENTO_id: this.codigo[0].id,
          USUARIO_id: 1
        },
      };
      console.log(infor);
      const response = await fetch("http://localhost:5010/api/tarea/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infor),
      });
      return console.log(response.json());
    },
  },
};
</script>

