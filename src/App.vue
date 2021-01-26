<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
<template>
  <div id="app">
    <h1>Bienvenue dans notre application !</h1>
      <!-- utilisez le composant router-link pour la navigation. -->
      <!-- spécifiez le lien en le passant à la prop `to` -->
      <!-- `<router-link>` sera rendu en tag `<a>` par défaut -->
      <div class = "links">
        <router-link to="/films">Les Films</router-link>
            
        <router-link to="/acteurs">Les Acteurs</router-link>
      </div>

    <!-- balise pour le composant router-view -->
    <!-- le composant correspondant à la route sera rendu ici -->
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  computed: {
    username() {
      // Nous verrons ce que représente `params` dans un instant.
      return this.$route.params.username
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>
<style>
.links a{
  margin-left: 20px;
  text-decoration: none; 
  color :  #5c6161;
}
</style>
