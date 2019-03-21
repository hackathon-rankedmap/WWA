<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href=""  >
                <img src="../assets/images/Fichier_14@4x.png" width="90">
            </a>

        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">

                    <a class="navbar-item" @click="zoomTo('US')">
                        ETATS-UNIS
                    </a>


                <a class="navbar-item" @click="zoomTo('GB')">
                    ROYAUME-UNIS
                </a>

                <a  class="navbar-item"  @click="zoomTo('FR')" >
                    FRANCE
                </a>


                    <a class="navbar-item" @click="zoomTo('BE')">
                        BELGIQUE
                    </a>


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
                <a @click ="goHome" class="navbar-item" >CATHEGORIES</a>

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

            goHome(){
                this.$router.push('/');
            },

    }
  }
</script>

<style scoped>
.navbar-item{
    color: white;
}
</style>