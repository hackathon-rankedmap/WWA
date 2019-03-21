<template>

<div class="categ">
          <div class ="width">
                  <p class="top">Les TOP</p>
          </div>
          <div class ="width economie" @click="test('b')" >
               Economie
          </div>
          <div class ="width science" @click="test('t')">
               Sciences et Technologies
          </div>
          <div class ="width divertissement " @click="test('e')">
               Divertissement
          </div>
          <div class ="width sports" @click="test('s')">
               Sports
          </div>
          <div class ="width santé" @click="test('m')">
               Santé
          </div>
        </div>
      
  
</template>

  <script>
    import * as ozae from '../ozaeApi';
    import { serverBus } from "../main";

    export default {
      name: 'Search',
      data () {
        return {
          locales : ['fr-fr', 'en-gb', 'fr-be', 'nl-be', 'de-de', 'en-us-ny', 'it-it', 'pt-br'],
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

