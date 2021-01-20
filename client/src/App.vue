<template>
  <v-app id="app">
    <Header />
    <v-main class="grey lighten-3">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import CategoriesService from '@/services/CategoriesService'
import PostsService from '@/services/PostsService'
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  },
  async beforeMount() {
    if (localStorage.getItem('token') !== null) {
      this.$store.dispatch('setToken', localStorage.getItem('token'))
      this.$store.dispatch('setUser', JSON.parse(localStorage.getItem('user')))
    }
    await CategoriesService.index().then((response) => {
      this.$store.dispatch('setCategories', response.data)
    })
    await PostsService.index().then((response) => {
      this.$store.dispatch('setPosts', response.data)
    })
  }
}
</script>

<style>
</style>
