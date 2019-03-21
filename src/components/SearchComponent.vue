<template>


<div>
<div class="container">



  <div class="field-input">
    <input type="text" placeholder="Search..."/>
<span> </span>
  </div>
  
  </div>

<div class="categ">


    
          <div class ="width">
             <p class="top">Les TOP</p>
          </div>
          <div class ="width economie" @click="test('b')" >
             <router-link class="nav-link" to="/map">
                Economie
            </router-link>
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


    .container {
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
  padding: 5rem 2rem;
}
.container .field-input {
  text-align: center;
}
.container .field-input input {
  text-align: left;
  border-radius: 6rem;
  border: 1px solid #a0a0a0;
  padding: .6rem 2rem .6rem 1rem;
  width: 685px;
  font-family: 'roboto';
  transition: .5s;
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

</style>

