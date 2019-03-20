<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href=""  >
                <img src="../assets/Logo_WWA.svg" width="90">
            </a>

        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">


                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link" @click="zoomTo('US')">
                        ETATS-UNIS
                    </a>
                </div>

                <a class="navbar-item" @click="zoomTo('GB')">
                    ROYAUME-UNIS
                </a>

                <a  class="navbar-item"  @click="zoomTo('FR')" >
                    FRANCE
                </a>


                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link" @click="zoomTo('BE')">
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

</style>