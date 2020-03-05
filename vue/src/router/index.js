import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/expenses',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AuthorizedApp.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'add',
        name: 'expenses_add',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/expenses/Add.vue')
      },
      {
        path: 'list',
        name: 'expenses_list',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/expenses/List.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user')
  console.log(to)
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
