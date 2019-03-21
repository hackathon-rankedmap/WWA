<template>
    <div>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.0/css/all.css" integrity="sha384-Mmxa0mLqhmOeaE8vgOSbKacftZcsNYDjQzuCOm6D02luYSzBG8vpaOykv9lFQ51Y" crossorigin="anonymous">
        <div class="searchpage">
            <nav class="navbar" role="navigation" aria-label="main navigation">
                <div class="navbar-brand">
                    <a class="navbar-item" href="https://bulma.io">
                        <img src="../assets/Logo_WWA.png" alt="" width="112" height="28">
                    </a>
                </div>
            </nav>
            <div class="container  ">
                <div class="field column" id="searchbar">

                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="Recherche...">
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
                                <img src="../assets/images/Fichier_6@4x.png" alt="" width="60" height="10">
                                <p class="Subtitle"><strong>LES PLUS RECENTS</strong></p>

                            </article>
                            <article class="tile is-child box" id="economie" @click="test('b')">
                                <img src="../assets/images/Fichier_7@4x.png" alt="" width="80" height="10">
                                <router-link class="nav-link" to="/map">
                                    <p class="Subtitle"><strong>

                                        ECONOMIE
                                    </strong></p>  </router-link>
                            </article>
                            <article class="tile is-child box" id="scienceTech" @click="test('t')">
                                <img src="../assets/images/Fichier_8@4x.png" alt="" width="80" height="10">
                                <p class="Subtitle"><strong>SCIENCE ET TECHNOLOGIE</strong></p>
                            </article>
                        </div>
                        <div class="tile">
                            <article class="tile is-child box" id="divertissement" @click="test('e')">
                                <img src="../assets/images/Fichier_10@4x.png" alt="" width="80" height="10">
                                <p class="Subtitle"><strong>DIVERTISSEMENT</strong></p>
                            </article>
                            <article class="tile is-child box" id="sport" @click="test('s')">
                                <img src="../assets/images/Fichier_11@4x.png" alt="" width="80" height="10">
                                <p class="Subtitle"><strong>SPORT</strong></p>
                            </article>
                            <article class="tile is-child box" id="santé" @click="test('m')">
                                <img src="../assets/images/Fichier_12@4x.png" alt="" width="80" height="10">
                                <p class="Subtitle"><strong>SANTE</strong></p>
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
        locales : ['fr-fr', 'en-gb', 'fr-be', 'nl-be', 'de-de', 'en-us-ny', 'it-it', 'pt-br', 'es-es'],
      }
    },
    methods: {
      getScoreByCategory(category){
        const scores = {};
        const promises = [];
        this.locales.forEach((locale) => {
          promises.push(
            ozae.getArticles("20190319__20190320", locale, category)
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
        background-color: #ff565e;
        padding: 60px;
        border-radius: unset;
    }

    #economie
    {
        background-color: #888888;
        padding: 60px;
        border-radius: unset;
    }
    #scienceTech
    {
        background-color: #57c556;
        padding: 60px;
        border-radius: unset;

    }
    #divertissement
    {
        background-color: #ff51e0;
        padding: 60px;
        border-radius: unset;

    }
    #sport
    {
        background-color: #ffbb50;
        padding: 60px;
        border-radius: unset;

    }
    #santé
    {
        background-color: #52a7ff;
        padding: 60px;
        border-radius: unset;

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
    .basDePage{
        padding: 12px;
        margin-right: 85%;

    }
</style>


