<template>
  <div id="app">
    <NavBar></NavBar>
    <Map></Map>
  </div>
</template>

<script>

import HelloWorld from './components/HelloWorld.vue'
import Map from './components/MapComponent'
import NavBar from './components/NavBarComponent'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Map,
    NavBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
