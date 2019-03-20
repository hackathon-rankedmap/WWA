<template>
  <div id="app">
    <NavBar></NavBar>
    <Search></Search>
    <Map></Map>
  </div>
</template>

<script>

import Map from './components/MapComponent'
import NavBar from './components/NavBarComponent'
import Search from './components/SearchComponent'


export default {
  name: 'app',
  components: {
    Map,
    NavBar,
    Search
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
body {
    margin: 0;
}
</style>
