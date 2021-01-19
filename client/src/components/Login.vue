<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="4" offset-sm="4">
        <v-card class="mx-auto cyan" dark>
          <v-card-title primary-title> Login </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field v-model="email" label="email" required></v-text-field>
            <v-text-field
              type="password"
              v-model="password"
              label="password"
              required
            ></v-text-field>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn @click="login" block color="white" light> Login </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login() {
      try {
        await AuthenticationService.login({
          email: this.email,
          password: this.password
        }).then((response) => {
          localStorage.setItem('user', JSON.stringify(response.data.user))
          localStorage.setItem('token', response.data.token)
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
