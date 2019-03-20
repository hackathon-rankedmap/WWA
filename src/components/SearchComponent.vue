<template>

<div class="categ">
          <div class ="width" @click="">
                  <p class="top">Les TOP</p>
          </div>
          <div class ="width economie" >
              
          Economie

          </div>
          <div class ="width science">
               Sciences et Technologies
          </div>

          <div class ="width divertissement">
             Divertissement
          </div>

          <div class ="width sports">
                Sports
          </div>
          <div class ="width santé">
             Santé
          </div>
        </div>
      
  
</template>

  <script>
    import * as ozae from '../ozaeApi';
    export default {
      name: 'Search',
      data () {
        return {
          locales : ['fr-fr', 'en-gb', 'fr-be', 'nl-be', 'de-de', 'en-us-ny', 'it-it', 'pt-br'],
        }
      },
      methods: {
        getScoreByCategory(category){
            ozae.getAllPopularArticles(1)
                .then((articles) => ozae.getTotalScores(articles))
        }
      }
  }
  </script>
  
<style >
    .categ{
        display: flex;
        flex-wrap: wrap;
        width: 70%;
        height: 50%;
        margin: 0 auto;
    }

    .width{
        width: 33%;
    }

   .top
    {
        background-color: #ff565e;
        height: 100px;
    }

     .economie
    {
        background-color: #888888;
        height: 100px;
    }
    .science
    {
        background-color: #57c556;
        height: 100px;

    }
      .divertissement
    {
        background-color: #ff51e0;
        height: 100px;

    }
    .sports
    {
        background-color: #ffbb50;
        height: 100px;

    }
    .santé
    {
        background-color: #52a7ff;
        height: 100px;

    }
</style>

