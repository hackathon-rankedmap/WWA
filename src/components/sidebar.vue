<template>
    <div>
        <ul v-for="article in articles">
            <li>{{ article.name }}</li>
        </ul>
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