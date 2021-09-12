<template>
  <v-container>
    <div>
      <div>
        <h3>Login</h3>
      </div>
    </div>
    <div>
      <img src alt style="width: 100%;" />
      <div class="form-group">
        <v-text-field
          v-model="username"
          type="text"
          class="form-control"
          name="username"
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
        <button type="submit" v-on:click="prueba3()">login</button>
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
      const info = {
        payload: {
          username: this.username,
          password: this.password
        }
      };
      console.log(info);
      const response = await fetch(
        "http://localhost:5010/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(info)
        }
      );
      return console.log(response.json());
    }
  }
};
</script>

<style scoped>
</style>