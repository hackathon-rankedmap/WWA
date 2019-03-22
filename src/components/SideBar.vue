<template>
    <div class="wrap">
        <div class="header" :style="{backgroundColor : colors[category] }">
            {{this.$route.params.category}}
        </div>
        <div v-if="articles.length > 0">
            <div class="article" v-for="article in articles">
                <a :href="article.url">
                    <img :src="article.img_uri" alt="">
                </a>
                <p class="article__name">{{article.name}}</p>
            </div>
            <a href="">Voir plus</a>
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
        }
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
    }
    .article__name {
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
</style>