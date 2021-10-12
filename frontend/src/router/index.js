import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Users from '../views/Users.vue';
import axios from 'axios';
import req from '../getTokenLocalstorage';
import Edit from '../views/Edit.vue';

function adminAuth(to, from, next) {
  if (localStorage.getItem('token') != undefined) {

    axios.post('http://localhost:8080/validate', {}, req).then(res => {
      console.log(res, 'oassou')
      next();
    }).catch(error => {
      console.log(error, '222222222222222');
      next('/login'); // Impede de acessar a página
    })

  } else {
    console.log('opssss');
    next('/login'); // Impede de acessar a página
  }
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: Users,
    beforeEnter: adminAuth
  },
  {
    path: '/admin/user/edit/:id',
    name: 'EditUser',
    component: Edit,
    beforeEnter: adminAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
