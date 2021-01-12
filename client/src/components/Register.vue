<template>
  <div>
    <h1>Register</h1>
    <input
      type="email"
      v-model="email"
      name="email"
      id="email"
      placeholder="email"
    />
    <input
      type="password"
      v-model="password"
      name="password"
      id="password"
      placeholder="password"
    />
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationService from "@/services/AuthenticationService";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      const response = await AuthenticationService.register({
        email: this.email,
        password: this.password,
      });

      console.log(response);
    },
  },
};
</script>

<style>
</style>
