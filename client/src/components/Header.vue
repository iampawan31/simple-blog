<template>
  <v-app-bar app color="cyan" dark>
    <v-container class="py-0 fill-height">
      <v-toolbar-title class="mr-12"
        ><v-btn text dark to="/">Tab Tracker</v-btn></v-toolbar-title
      >
      <v-toolbar-items>
        <v-btn text dark>Browse </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!isUserLoggedIn">
        <v-btn text dark :to="{ name: 'login' }">Login</v-btn>
        <v-btn text dark :to="{ name: 'register' }">Register</v-btn>
      </v-toolbar-items>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    isUserLoggedIn() {
      return this.$store.state.isUserLoggedIn
    }
  }
}
</script>

<style>
</style>
