// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueForm from 'vue-form'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {ClientTable} from 'vue-tables-2'
import vmodal from 'vue-js-modal'

import './assets/App.sass'

import Home from './components/Home'
import Login from './components/Login'
import Posts from './components/Posts'
import User from './components/User'

Vue.use(VueRouter)
Vue.use(VueForm)
Vue.use(VueAxios, axios)
Vue.use(ClientTable, {}, false)
Vue.use(vmodal)

require('../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss')
const routes = [
{ path: '/', component: Home },
{ path: '/login', component: Login },
{ path: '/posts', component: Posts },
{ path: '/user', component: User }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
