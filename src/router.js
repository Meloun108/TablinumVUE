import Vue from "vue";
import Router from "vue-router";
import store from './store.js'
import Login from './components/Login.vue'
import Register from './components/Register.vue'

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/documents",
      name: "documents",
      component: () => import("./components/DocumentsTable"),
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: "/documents/:id",
      name: "document-details",
      component: () => import("./components/EditDocument"),
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddDocument"),
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) { // появляется не сразу после лог ина
      next()
      return
    }
    next('/login') // error redirected
  } else {
    next() 
  }
})

export default router