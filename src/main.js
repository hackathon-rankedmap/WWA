import './../node_modules/bulma/css/bulma.css';
import VueRouter from "vue-router"
import MapComponent from './components/MapComponent.vue'
import SearchComponent from './components/SearchComponent.vue'

Vue.use(VueRouter)



  const routes = [

    {path: '/',component: SearchComponent},
    {path: '/map',component: MapComponent},

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
