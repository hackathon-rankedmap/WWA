import './../node_modules/bulma/css/bulma.css';
import Vue from "vue";
import App from './App.vue'
import VueRouter from "vue-router"
import MapComponent from './components/MapComponent.vue'
import SearchComponent from './components/SearchComponent.vue'
import NavBarComponent from './components/NavBarComponent.vue'


Vue.use(VueRouter)



  const routes = [

    {path: '/',component: SearchComponent},
    {path: '/map',component: MapComponent},
    {path: '/map/:category/', component: MapComponent},
    {path: '/map/:category/:locale', component: MapComponent}

  ];

  const router = new VueRouter({
    routes,
    mode: 'history'
  });
    
   

Vue.config.productionTip = false

export const serverBus = new Vue();

new Vue({ 
  router,
  render: h => h(App),
}).$mount('#app')
