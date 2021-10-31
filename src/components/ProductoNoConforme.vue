<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent scrollable max-width="600px">
      <v-card>
        <v-card-title class="background"> Panel de actividad </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px">
          <v-row class="ma-0 pa-0">
            <v-col class="ma-0 pa-1" md="12">
              <h3 class="ma-0 pa-0">Nombre del procedimiento</h3>
              <p>{{ itemsProcedimiento[0].nombre }}</p>
            </v-col>
          </v-row>
          <v-row class="ma-0 pa-0">
            <v-col class="ma-0 pa-1" md="12">
              <h3 class="ma-0 pa-0">Nombre de la actividad</h3>
              <p>{{ itemsProcedimiento[0].descripcion }}</p>
            </v-col>
          </v-row>
          <v-row class="ma-0 pa-0">
            <v-col class="ma-0 pa-1" md="12">
              <h3 class="ma-0 pa-0">Descripción de la actividad</h3>
              <p>{{ itemsTarea[0].texto }}</p>
            </v-col>
          </v-row>
          <h4>
            Encargado:
            <span class="subtitle-2">{{ itemsUsuario[0].nombre }}</span>
          </h4>
          <h4>
            Puesto: <span>{{ itemsUsuario[0].rol }}</span>
          </h4>
          <h4>
            Correo: <span>{{ itemsUsuario[0].correo }}</span>
          </h4>
          <div v-if="itemsTarea[0].estado == 1">
            <v-select
              v-model="selectdTipo"
              :items="itemsTipo"
              label="Tipo de alerta"
              outlined
            ></v-select>
          </div>
          <v-chip class="ma-2" color="primary">
            {{
              itemsTarea[0].tiempo >= 60
                ? (itemsTarea[0].tiempo * 1) / 60 + " Horas"
                : itemsTarea[0].tiempo + " Min"
            }}
          </v-chip>
          <div v-if="itemsTarea[0].estado == 1">
            <v-textarea
              v-model="descripcion"
              solo
              name="input-7-4"
              :placeholder="itemsTarea[0].descripcion"
            ></v-textarea>
          </div>
          <div v-else-if="itemsTarea[0].estado != 1">
            <v-select
              v-model="SelectedState"
              :items="itemsCurrentState"
              label="Estado"
              outlined
            ></v-select>
            <v-textarea
              v-model="descripcion"
              solo
              name="input-7-4"
              :placeholder="itemsTarea[0].descripcion"
            ></v-textarea>
          </div>
          <div v-else>
            {{ itemsTarea[0].descripcion }}
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="closeComponent()">
            Close
          </v-btn>
          <div v-if="itemsTarea[0].estado == 1">
            <v-btn
              color="blue darken-1"
              text
              @click="
                generatePnc(
                  itemsTarea[0].key,
                  descripcion,
                  itemsTarea[0].PROCEDIMIENTO_id,
                  itemsProcedimiento[0].nombre,
                  itemsUsuario[0].correo,
                  userItems[0].correo,
                  itemsUsuario[0].rol,
                  itemsUsuario[0].nombre,
                  itemsTarea[0].tipo
                )
              "
            >
              Guardar
            </v-btn>
          </div>
          <div
            v-if="
              itemsTarea[0].estado != 1 &&
              itemsUsuario[0].username ==
                this.keycloak.tokenParsed.preferred_username
            "
          >
            <v-btn
              color="blue darken-1"
              text
              @click="
                generateJustification(
                  itemsTarea[0].key,
                  descripcion,
                  itemsTarea[0].PROCEDIMIENTO_id,
                  itemsTarea[0].asignadopor,
                  itemsProcedimiento[0].nombre,
                  itemsTarea[0].ultima_tarea_id,
                  itemsUsuario[0].rol,
                  itemsUsuario[0].nombre,
                  itemsTarea[0].estado
                )
              "
              >Justificar</v-btn
            >
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ReporteVue from "../views/Reporte.vue";
import parseDate from "../plugins/date";

export default {
  props: ["keycloak", "currentFlow"],
  name: "ProductoNoConforme",
  components: {},
  data() {
    return {
      dialog: true,
      itemsProcedimiento: [{}],
      itemsTarea: [{}],
      itemsUsuario: [{}],
      dinamicLastId: null,
      itemsCurrentState: [
        { text: "ACEPTADO", value: 2 },
        { text: "RECHAZA", value: 3 },
      ],
      selectdTipo: null,
      SelectedState: null,
      name: "",
      descripcion: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      select: null,
      itemsTipo: [
        { text: "Producto no conforme", value: 1 },
        { text: "Riesgo operativo", value: 2 },
      ],
      userItems: [{}],
      checkbox: false,
    };
  },
  mounted() {
    this.getInfoUSer();
    this.loadData();
    console.log("SELECTED ESTADO");
    console.log(this.SelectedState);
    console.log("TIPO DE FORMULARIO");
    console.log(this.currentFlow);
  },
  methods: {
    async getInfoUSer() {
      const response = await fetch(
        `http://localhost:5010/api/valida/usuario/${this.keycloak.tokenParsed.preferred_username}`
      );
      this.userItems = await response.json();

      console.log("Se retornan los datos del usuario: ");
      return console.log(this.userItems);
    },
    closeComponent() {
      this.dialog = false;
      this.$router.push({ path: "/" + this.$route.params.path });
    },
    async loadData() {
      const response2 = await fetch(
        `http://localhost:5010/api/tareas/unica/${this.$route.params.id}`
      );
      this.itemsTarea = await response2.json();
      console.log(this.itemsTarea);
      return (
        this.loadDataProcedimiento(this.itemsTarea[0].PROCEDIMIENTO_id),
        this.loadUserData(this.itemsTarea[0].USUARIO_id)
      );
    },
    async loadDataProcedimiento(id) {
      console.log("Se carga la data");
      const response = await fetch(
        `http://localhost:5010/api/procedimientos/${id}`
      );
      this.itemsProcedimiento = await response.json();
      console.log(this.itemsProcedimiento);
    },
    async loadUserData(id) {
      const response = await fetch(`http://localhost:5010/api/usuario/${id}`);
      this.itemsUsuario = await response.json();
      console.log(this.itemsUsuario);
    },
    async generatePnc(
      key,
      descripcion,
      procedimiento,
      nameProcedimiento,
      mail,
      asignadopor,
      rol,
      encargado,
      tipo
    ) {
      /* GLOBAL FUNCTIONS AND VARIABLES */
      const today = new Date();
      const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      let currentmonth = months[today.getMonth()];
      let numberofweek = parseDate.getWeekOfMonth(today);
      const format = {
        yy: today.getFullYear(),
        mm: today.getMonth() + 1,
        dd: today.getDate(),
      };
      let aux = Object.values(format).toString().split("");
      console.log(this.selectEstado);

      /* UPDATE STATE TASK TABLE*/
      const data = {
        payload: {
          key: parseInt(key),
          descripcion: descripcion,
          estado: 2,
          color: this.selectdTipo == 1 ? "yellow" : "red",
          asignadopor: asignadopor,
        },
      };
      const response = await fetch(
        `http://localhost:5010/api/tareas/actualizar/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log("Se actualizo el registro con exito: " + response.toString());
      /* CREATE A NEW REGISTER TO REPORT TABLE */
      const dataReport = {
        payload: {
          fecha: aux.join("").replace(",", "-").replace(",", "-"),
          PROCEDIMIENTO_id: procedimiento,
          descripcion: descripcion,
          usuario: this.keycloak.tokenParsed.preferred_username,
          estatus: this.$route.params.riesgo == true ? 3 : 2,
        },
      };
      const response2 = await fetch(
        "http://localhost:5010/api/reporte/agregar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataReport),
        }
      );
      console.log(
        "Se genero el registro de reporte con exito: " + response2.toString()
      );

      /* GENERATE MAIL */
      const dataMail = {
        payload: {
          correo: mail,
          tiponame: this.selectdTipo == 1 ? "PNC" : "RO",
          name: nameProcedimiento,
          descripcion: descripcion,
          usuario: this.keycloak.tokenParsed.preferred_username,
        },
      };
      const responsemail = await fetch("http://localhost:5010/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataMail),
      });
      console.log("Se genero el correo con exito: " + responsemail.toString());

      /* SE GENERA TAREA_REGISTRO */
      const tarearegistro = {
        payload: {
          fecha: aux.join("").replace(",", "-").replace(",", "-"),
          anio: today.getFullYear(),
          mes: currentmonth,
          semana: "Semana " + numberofweek,
          procedimiento: nameProcedimiento,
          usuario: this.keycloak.tokenParsed.preferred_username,
          puesto: rol,
          encargado: encargado,
          descripcion: descripcion,
          estado: this.selectdTipo == 1 ? "PNC" : "RO",
          estado_registro: this.SelectedState == null ? "ABIERTO" : "RECHAZADO",
          tipo_flujo: tipo == 1 ? "FLUJO VIEJO" : "FLUJO NUEVO",
        },
      };
      const response3 = await fetch(
        "http://localhost:5010/api/reporte_tarea/agregar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tarearegistro),
        }
      );
      console.log(
        "Se genero el registro_tarea con exito: " + response3.toString()
      );

      /* OBTAIN LAST ID ON TABLA_REGISTRO */
      let lastId = [{}];
      const obtainlastid = await fetch(`http://localhost:5010/api/obtener/id/`);
      lastId = await obtainlastid.json();
      let ultimo = lastId.map((obj) => {
        return obj["MAX(id)"];
      });

      console.log(ultimo);
      console.log("El ultimo ID registrado es: " + "ARRIBA");

      /* UPDATE TASK TABLE WHITH LAST ID OF TAREA_REGISTRO */
      const updatedatatask = {
        payload: {
          key: parseInt(key),
          ultima_tarea_id: ultimo[0],
        },
      };
      const responseAddedId = await fetch(
        `http://localhost:5010/api/tarea/actualizar/ultimo/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedatatask),
        }
      );
      console.log("Se actualizo el ultimo ID: " + responseAddedId.toString());

      /* CREATE REGISTER OF MAIL */
      const mailregistro = {
        payload: {
          fecha: aux.join("").replace(",", "-").replace(",", "-"),
          anio: today.getFullYear(),
          mes: currentmonth,
          semana: "Semana " + numberofweek,
          usuario: this.keycloak.tokenParsed.preferred_username,
          puesto: rol,
          encargado: encargado,
          correo: mail,
          estado_correo: responsemail.status == 200 ? "Entregado" : "No Entregado",
          procedimiento: nameProcedimiento,
          estado: this.selectdTipo == 1 ? "PNC" : "RO",
        },
      };
      const responsemailregistro = await fetch(
        "http://localhost:5010/api/reporte_mail_registro/agregar/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mailregistro),
        }
      );
      console.log(
        "Se genero el registro_tarea con exito: " + responsemailregistro.toString()
      );

      this.dialog = false;
      return this.$router.push({ path: "/" + this.$route.params.path });
    },
    async generateJustification(
      key,
      descripcion,
      procedimiento,
      asignadopor,
      nombreprocedimiento,
      ultimatareaid,
      rol,
      encargado,
      estadopresente
    ) {
      /* DATE MANAGE AND GLOBAL VARIABLES */
      const today = new Date();
      const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      let currentmonth = months[today.getMonth()];
      let numberofweek = parseDate.getWeekOfMonth(today);
      const format = {
        yy: today.getFullYear(),
        mm: today.getMonth() + 1,
        dd: today.getDate(),
      };
      let aux = Object.values(format).toString().split("");

      /* UPDATE REGISTER  */
      const data = {
        payload: {
          key: parseInt(key),
          descripcion: descripcion,
          estado: 1,
          color: "white",
        },
      };
      console.log("El id para el update es: " + key);
      const response = await fetch(
        `http://localhost:5010/api/tareas/actualizar/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const dataMail = {
        payload: {
          correo: asignadopor,
          tiponame: this.selectdTipo == 1 ? "PNC" : "RO",
          name: nombreprocedimiento,
          descripcion: descripcion,
          usuario: this.keycloak.tokenParsed.preferred_username,
        },
      };
      const responsemail = await fetch("http://localhost:5010/api/email/justificacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataMail),
      });

      const dataReport = {
        payload: {
          fecha: "2021-10-02",
          PROCEDIMIENTO_id: procedimiento,
          descripcion: descripcion,
          usuario: this.keycloak.tokenParsed.preferred_username,
          estatus: 1,
        },
      };
      console.log(dataReport);
      const response2 = await fetch(
        "http://localhost:5010/api/reporte/agregar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataReport),
        }
      );
      /* SE JUSTIFICA EN TARERA_REGISTRO */
      const updatetarearegistro = {
        payload: {
          id: parseInt(ultimatareaid),
          descripcion: descripcion,
          estado_registro: this.SelectedState == 2 ? "CERRADO" : "RECHAZADO",
        },
      };
      const responseTareaRegistro = await fetch(
        `http://localhost:5010/api/registro_tarea/actualizar/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatetarearegistro),
        }
      );

      /* CREATE REGISTER OF MAIL */
      const mailregistro = {
        payload: {
          fecha: aux.join("").replace(",", "-").replace(",", "-"),
          anio: today.getFullYear(),
          mes: currentmonth,
          semana: "Semana " + numberofweek,
          usuario: this.keycloak.tokenParsed.preferred_username,
          puesto: rol,
          encargado: encargado,
          correo: asignadopor,
          estado_correo: responsemail.status == 200 ? "Entregado" : "No Entregado",
          procedimiento: nombreprocedimiento,
          estado: estadopresente == 2 ? "PNC" : "RO",
        },
      };
      console.log("estadopresente ")
      console.log(estadopresente);
      const responsemailregistro = await fetch(
        "http://localhost:5010/api/reporte_mail_registro/agregar/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mailregistro),
        }
      );
      console.log(
        "Se genero el registro_tarea con exito: " + responsemailregistro.toString()
      );

      console.log(responseTareaRegistro);
      console.log(response2);
      this.dialog = false;
      return this.$router.push({ path: "/" + this.$route.params.path });
    },
  },
};
</script>

<style scoped>
.background {
  color: white;
  background: rgb(73, 73, 74);
  background: linear-gradient(
    90deg,
    rgba(73, 73, 74, 1) 0%,
    rgba(128, 128, 128, 1) 68%,
    rgba(43, 44, 45, 1) 89%
  );
}
</style>