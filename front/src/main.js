import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import Home from './components/Home.vue'

Vue.use(VueResource);
Vue.use(VueRouter);

new Vue({
  el: '#app',
  router: new VueRouter({
    routes: [
      {path: '/', component: Home},
      {path: '/search', component: App}
    ]
  })
});
