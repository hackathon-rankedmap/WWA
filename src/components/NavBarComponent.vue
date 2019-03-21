<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="/"  >
                <img src="../assets/images/Fichier_14@4x.png">
            </a>

        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">


                <div class="navbar-item">
                    <a class="navbar-item" @click="zoomTo('US')">
                        ETATS-UNIS
                    </a>
                </div>

                <a class="navbar-item" @click="zoomTo('GB')">
                    ROYAUME-UNIS
                </a>

                <a  class="navbar-item"  @click="zoomTo('FR')" >
                    FRANCE
                </a>


                <div class="navbar-item">
                    <a class="navbar-item" @click="zoomTo('BE')">
                        BELGIQUE
                    </a>
                </div>

                <a class="navbar-item" @click="zoomTo('DE')">
                    ALLEMAGNE
                </a>

                <a class="navbar-item" @click="zoomTo('PT')">
                    PORTUGAL
                </a>

                <a class="navbar-item" @click="zoomTo('ES')">
                    ESPAGNE
                </a>
                <a class="navbar-item" @click="zoomTo('IT')">
                    ITALIE
                </a>
                <a class="navbar-item" @click="zoomTo('MD')">
                    MONDE
                </a>

                <router-link to="/" class="navbar-item">CATEGORIE</router-link>
            </div>
        </div>
    </nav>

</template>

<script>
  import { serverBus } from "../main";

  export default {
    name: "NavBarComponent",
    methods: {
      zoomTo(locale){
        serverBus.$emit('locale', locale);
      },
    }
  }
</script>

<style scoped>
    .navbar-item {
        color: white;
    }
</style>