<template>
    <div>
        <!--<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.0/css/all.css" integrity="sha384-Mmxa0mLqhmOeaE8vgOSbKacftZcsNYDjQzuCOm6D02luYSzBG8vpaOykv9lFQ51Y" crossorigin="anonymous">-->
        <div class="searchpage">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://bulma.io">
                        <img src="../assets/images/Fichier_14@4x.png">
                    </a>
                </div>
            </nav>
            <div class="container  ">
                <div class="field column" id="searchbar">
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="Recherche..." v-model="query" @keypress.enter="testQuery(query)">
                        <span class="icon is-small is-left">
                   <i class="fas fa-search"></i>
                </span>
                    </div>
                </div>
            </div>
            <div class="categ column is-offset-one-fifth ">

                <div class="tile is-ancestor">
                    <div class="tile is-vertical is-11">
                        <div class="tile">
                            <article class="tile is-child box" id="top" @click="test()">
                                <p class="Subtitle choix">LES PLUS RECENTS</p>

                            </article>
                            <article class="tile is-child box" id="economie1" @click="test('b')">

                                <router-link class="nav-link" to="/map/economy">
                                    <p class="Subtitle choix">
                                        ECONOMIE
                                    </p>
                                </router-link>
                            </article>
                            <article class="tile is-child box" id="scienceTech1" @click="test('t')">
                                <router-link class="nav-link" to="/map/science">
                                    <p class="Subtitle choix">SCIENCE ET TECHNOLOGIE</p>
                                </router-link>

                            </article>
                        </div>
                        <div class="tile">
                            <article class="tile is-child box" id="divertissement1" @click="test('e')">
                                <router-link class="nav-link" to="/map/entertainment">
                                    <p class="Subtitle choix">DIVERTISSEMENT</p>
                                </router-link>

                            </article>
                            <article class="tile is-child box" id="sport1" @click="test('s')">
                                <router-link class="nav-link" to="/map/sport">
                                    <p class="Subtitle choix">SPORT</p>
                                </router-link>

                            </article>
                            <article class="tile is-child box" id="santé1" @click="test('m')">
                                <router-link class="nav-link" to="/map/health">
                                    <p class="Subtitle choix">SANTE</p>
                                </router-link>
                            </article>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="butPremium">
                <a class="button" id="premium">Accès Premium</a>
                <a class="button" id="premiumPro">Accès Premium Pro</a>
            </div>
            <div class="description">
                <p class="title" id="title"><strong>TOP TOPICS</strong></p>
                <p class="Subtitle" id="subtitle">Voici les 10 topics les plus rechercher en ce moment</p>
            </div>
            <div class="topicImage">
                <img src="../assets/images/Groupe_42.png" alt="" width="70%" height="">
            </div>
        </div>

        <footer class="footer">
            <p class="basDePage">
                Powered by
            </p>
        </footer>
    </div>
</template>

<script>
  import * as ozae from '../ozaeApi';
  import { serverBus } from "../main";

  export default {
    name: 'Search',
    data () {
      return {
        query: "",
        locales : ['fr-fr', 'en-gb', 'fr-be', 'nl-be', 'de-de', 'en-us-ny', 'it-it', 'pt-br', 'es-es'],
      }
    },
    methods: {
      getScoreByCategory(category){
        const scores = {};
        const promises = [];
        this.locales.forEach((locale) => {
          promises.push(
            ozae.getPopularArticles(locale, 1, category)
              .then((articles) => ozae.getTotalScores(articles))
              .then((score) => { return score })
          );
        });
        return Promise.all(promises).then((values) => {
          values.forEach( (value, index) => {
            scores[this.locales[index]] = value
          });
          return Promise.resolve(scores);
        });
      },
      test(category){
        this.getScoreByCategory(category)
          .then((scores) => serverBus.$emit('getScoresByCat', scores))
      },
      testQuery(query){
        this.getScoreByQuery(query)
          .then((scores) => {
            this.$router.push(`/map/${query}`);
            return serverBus.$emit('getScoresByCat', scores)
          })
      },
      getScoreByQuery(query){
        const scores = {};
        const promises = [];
        this.locales.forEach((locale) => {
          promises.push(
            ozae.searchByText(query, '20190319__20190321', locale)
              .then((articles) => ozae.getTotalScores(articles))
              .then((score) => { return score })
          );
        });
        return Promise.all(promises).then((values) => {
          values.forEach( (value, index) => {
            scores[this.locales[index]] = value
          });
          return Promise.resolve(scores);
        });
      }
    }
  }
</script>

<style >
    .navbar{
        background-color: black;
    }
    .categ{
        display: flex;
        flex-wrap: wrap;
        width: 70%;
        height: 50%;
        margin: 0 auto;
    }
    #top
    {
        padding: 60px;
        border-radius: unset;
        font-weight: bold;
    }
    #economie1
    {
        background: url("../assets/images/markus-spiske-484245-unsplash.jpg");
        background-repeat: no-repeat;
        background-size: 100%;
        padding: 60px;
        border-radius: unset;
        font-weight: bold;
    }
    #scienceTech1
    {
        background: url("../assets/images/hans-reniers-746177-unsplash.jpg");
        background-repeat: no-repeat;
        background-size: 100%;
        padding: 60px;
        border-radius: unset;
        font-weight: bold;
    }
    #divertissement1
    {
        background: url("../assets/images/myke-simon-1037761-unsplash.jpg");
        background-repeat: no-repeat;
        background-size: 150%;
        padding: 60px;
        border-radius: unset;
        font-weight: bold;
    }
    .choix{
        padding-top: 1%;
        background-color: black;
        color: white;
    }
    #sport1
    {
        background: url("../assets/images/filip-mroz-177565-unsplash.jpg");
        background-repeat: no-repeat;
        padding: 60px;
        border-radius: unset;
        background-size: 150%;
        font-weight: bold;
    }
    #santé1
    {
        background: url("../assets/images/martin-brosy-758535-unsplash.jpg");
        background-repeat: no-repeat;
        background-size: 100%;
        padding: 60px;
        border-radius: unset;
        font-weight: bold;
    }
    .container {
        padding-top: 3rem;
        padding-bottom: 0.2em;
    }
    .container .field-input input:focus {
        outline: none;
        border-color: #212121;
        transition: .5s;
    }
    .container .field-input span:before {
        cursor: pointer;
        position: relative;
        font-family: 'fontawesome';
        top: 0;
        right: 1.5rem;
    }
    .searchpage{
        background-color: #060025;
        padding-bottom: auto;
    }
    #title{
        color: white;
    }
    #subtitle{
        color: white;
        margin-bottom: 2%;
    }
    #searchbar{
        padding-left: 140px;
        padding-right: 85px;
    }
    .butPremium{
        margin-bottom: 4%;
    }
    #premium{
        background-color: darkgrey;
        border-color: darkgrey;
        color: white;
        border-radius: unset;
        margin-right: 3%;
        font-weight: bold;
        font-size: large;
    }
    #premiumPro{
        background-color:darkgoldenrod;
        border-color: darkgoldenrod;
        color: white;
        border-radius: unset;
        font-weight: bold;
        font-size: large;
    }
    .topicImage{
        padding-bottom: 2%;
    }
    .footer{
        padding: unset;
    }
    .basPage{
        padding: 12px;
        margin-right: 85%;
    }
</style>


