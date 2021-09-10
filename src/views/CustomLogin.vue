<template>
  <v-container>
    <div>
      <div>
        <h3>Login</h3>
      </div>
    </div>
    <div class="row">
      <div>
        <img src alt style="width: 100%;" />
        <div class="form-group">
          <v-text-field
            v-model="username"
            type="text"
            class="form-control"
            name="userName"
            placeholder="username"
          />
        </div>
        <div class="form-group">
          <v-text-field
            v-model="password"
            type="password"
            class="form-control"
            name="password"
            placeholder="Password"
          />
        </div>
        <div class="form-group">
          <button v-on:click="prueba3()">login</button>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "CustomLogin",
  data: () => {
    return {
      username: null,
      password: null
    };
  },
  methods: {
    async prueba3() {
      const infor = {
        payload: {
          username: this.nombre,
          password: this.descripcion
        }
      };
      console.log(infor);
      const response = await fetch(
        "http://localhost:5010/api/procedimientos/ingresar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(infor)
        }
      );
      return console.log(response.json());
    }
  }
};
</script>

<style scoped>
</style>