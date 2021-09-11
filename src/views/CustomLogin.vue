<template>
  <v-app>
    <div class="backgruond"></div>
    <v-main class="d-flex justify-center align-center">
      <v-col cols="10" lg="4" class="mx-auto">
        <v-card class="pa-4">
          <div class="text-center">
            <v-avatar size="210">
              <v-img
                class="rounded-sm"
                src="https://i.imgur.com/RJ5PGxt.png"
                max-height="124"
                max-width="170"
              ></v-img>
            </v-avatar>
            <h2 class="indigo--text">Bienvenido Usuario</h2>
          </div>
          <v-form @submit.prevent="submitHandler" ref="form">
            <v-card-text>
              <v-text-field
                v-model="test.username"
                type="text"
                label="Usuario"
                placeholder="Usuario"
                prepend-inner-icon="mdi-account"
                required
              />
              <v-text-field
                v-model="test.password"
                :type="passwordShow ? 'text' : 'password'"
                label="Contraseña"
                placeholder="Contraseña"
                prepend-inner-icon="mdi-key"
                :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="passwordShow = !passwordShow"
                required
              />
              <v-switch label="Remember me" color="indigo"></v-switch>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                :loading="loading"
                color="indigo"
                v-on:click="ingresoUsuario()"
              >
                <span class="white--text px-8">Ingresar</span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-main>
    <v-snackbar top color="green" v-model="snackbar">
      Login success
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    loading: false,
    snackbar: false,
    passwordShow: false,
    test: {
      username: null,
      password: null,
    },
    /* emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],*/

    /*passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be 6  characters or more!",
    ],*/
  }),
  methods: {
    submitHandler() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.snackbar = true;
        }, 3000);
      }
    },
    async ingresoUsuario() {
      console.log(this.test.username);
      console.log(this.test.password);
      const info = {
        payload: {
          username: this.test.username,
          password: this.test.password,
        },
      };
      console.log("La informacion: " + info.username);
      const response = await fetch(
        "http://localhost:5010/api/procedimientos/ingresar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        }
      );
      console.log("La informacion: " + info);
      return console.log(response.json());
    },
  },
};
</script>

<style scoped>
.backgruond {
  height: 300px;
  width: 100%;
  display: block;
  position: absolute;
  top: 0;
  background-size: cover;
}
</style>