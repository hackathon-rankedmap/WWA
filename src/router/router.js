import Vue from 'vue'
import Router from 'vue-router'
import MapComponent from '@/components/map'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/map',
      name: 'map',
      component: MapComponent
    },

  ]
})
