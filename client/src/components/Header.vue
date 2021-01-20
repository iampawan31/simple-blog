<template>
  <v-app-bar flat app color="cyan"
    ><v-toolbar-title to="/">
      <v-avatar size="32" class="mr-6">
        <img src="@/assets/logo.svg" alt="Tab Tracker" />
      </v-avatar>
    </v-toolbar-title>
    <v-toolbar-items>
      <v-btn text :to="{ name: 'new-post' }" dark>New Post</v-btn>
      <v-btn text :to="{ name: 'new-category' }" dark>New Category</v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-menu offset-y open-on-hover v-if="categories && categories.length > 0">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            text
            class="align-self-center mr-4"
            v-bind="attrs"
            v-on="on"
          >
            Categories
            <v-icon dark right> mdi-menu-down </v-icon>
          </v-btn>
        </template>
        <v-list class="grey lighten-3">
          <v-list-item v-for="category in categories" :key="category.id">{{
            category.name
          }}</v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-if="!isUserLoggedIn" text dark :to="{ name: 'login' }">
        Login
      </v-btn>
      <v-btn v-if="!isUserLoggedIn" text dark :to="{ name: 'register' }">
        Register
      </v-btn>
      <v-menu v-if="isUserLoggedIn" offset-y open-on-hover>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            dark
            text
            class="align-self-center mr-4"
            v-bind="attrs"
            v-on="on"
          >
            Account
            <v-icon dark right> mdi-menu-down </v-icon>
          </v-btn>
        </template>
        <v-list class="grey lighten-3">
          <v-list-item :to="{ name: 'user-profile' }">Profile</v-list-item>
          <v-list-item @click="logout">Logout</v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>
<script>
import CategoriesService from '@/services/CategoriesService'
export default {
  computed: {
    isUserLoggedIn() {
      return this.$store.state.isUserLoggedIn
    },
    categories() {
      return this.$store.state.categories
    }
  },
  methods: {
    async logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$store.dispatch('logout')
      this.$store.push('/')
    }
  }
}
</script>

<style>
</style>
