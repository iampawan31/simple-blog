import Vue from 'vue'
import Vuex from 'vuex'
import CategoriesService from '@/services/CategoriesService'
import PostsService from '@/services/PostsService'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    categories: null,
    posts: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
      if (state.token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    SET_USER(state, user) {
      state.user = user
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories
    },
    SET_POSTS(state, posts) {
      state.posts = posts
    },
    LOGOUT_USER(state) {
      state.user = null
      state.token = null
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token)
    },
    async getCategories({ commit }) {
      commit('SET_CATEGORIES', (await CategoriesService.index()).data)
    },
    async getPosts({ commit }) {
      commit('SET_POSTS', (await PostsService.index()).data)
    },
    setUser({ commit }, user) {
      commit('SET_USER', user)
    },
    setCategories({ commit }, categories) {
      commit('SET_CATEGORIES', categories)
    },
    setPosts({ commit }, posts) {
      commit('SET_POSTS', posts)
    },
    logout({ commit }) {
      commit('LOGOUT_USER')
    }
  }
})
