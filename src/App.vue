<template>
  <div id="app">
        <Search></Search>
    <Map></Map>
  </div>
</template>

<script>

import Map from './components/MapComponent'
import Search from './components/SearchComponent'


export default {
  name: 'app',
  components: {
<<<<<<< HEAD
    HelloWorld,
    Map,
    Search
=======
    Map
>>>>>>> 89f7db3eb768a1c528affa02b672abd31e00bfde
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
  margin-top: 60px;
}
body {
    margin: 0;
}
</style>
