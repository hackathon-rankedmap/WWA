<template>
    <div>
        <!--TODO IMG-->
        <header class="card-header">
            <p class="card-header-title">
                titre de la topic
            </p>
        </header>
        <div class="card" v-for="article in articles">
            <div class="card-content">
                <div class="content">
                    <a :href="article.url">{{ article.name }}</a>
                    <br>
                </div>
            </div>
            <footer class="card-footer">
                <a href="#" class="card-footer-item">S'abonner</a>
            </footer>
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
        height: 500px;
        background: red;
    }
</style>