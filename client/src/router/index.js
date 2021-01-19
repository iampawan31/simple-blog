import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Categories from '@/components/Categories'
import NewPost from '@/components/NewPost'
import ViewPost from '@/components/ViewPost'
import NewCategory from '@/components/NewCategory'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/categories/new',
      name: 'new-category',
      component: NewCategory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/categories',
      name: 'categories',
      component: Categories,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/posts/:slug',
      name: 'view-post',
      component: ViewPost
    },
    {
      path: '/posts/new',
      name: 'new-post',
      component: NewPost,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
