<template>
    <div class="wrap">
        <div class="header" :style="{backgroundColor : colors[category] }">
            {{this.$route.params.category}}
        </div>
        <div v-if="a.length > 0">
            <div class="article" v-for="article in a">
                <a :href="article.url" target="_blank">
                    <img :src="article.img_uri" alt="">
                </a>
                <p class="article__name">{{article.name}}</p>
            </div>
            <a class="more" @click="more">Voir plus</a>
        </div>
        <div v-else>Pas d'article :(</div>
    </div>



</template>

<script>
  export default {
    name: "SideBar",
    props: {
      articles: Array
    },
    data() {
      return {
        category: this.$route.params.category,
        colors: {
          science: '#57c556',
          economie: '#888888',
          divertissement: '#ff51e0',
          sante: '#52a7ff',
          sport: '#ffbb50'
        },
        offset: 0
      }
    },
    computed :{
      a() {return this.articles.splice(this.offset, 3)}
    },
    methods: {
      more() {
        this.offset += 3
      }
    }
  }
</script>

<style scoped>
    .wrap {
        width: 480px;
    }
    .article {
        display: block;
        position: relative;
        color: white;
        min-height: 200px;
        background: black;
    }
    .article__name {
        padding: 10px;
        position: absolute;
        bottom: 0;
        background: rgba(0,0,0, 0.8);
        font-weight: bold;
    }
    .header {
        padding: 16px 0;
        text-transform: uppercase;
        font-weight: bold;
        color: white;
    }
    .more{
        font-weight: bold;
        color: black;
        padding:16px;
        display: block;
    }
</style>