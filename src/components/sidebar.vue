<template>
    <div>
        <!--TODO IMG-->
        <header class="card-header">
            <p class="card-header-title">
                {{this.$route.params.category}}
            </p>
        </header>
        <div class="article" v-for="article in articles">
            <a :href="article.url">
                <img :src="article.img_uri" alt="">
            </a>
            <p class="article__name">{{article.name}}</p>
        </div>
    </div>



</template>

<script>
  export default {
    name: "sidebar",
    props: {
      articles: Array
    }
  }
</script>

<style scoped>
    div {
        width: 300px;
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
    }
</style>