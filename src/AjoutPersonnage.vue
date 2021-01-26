<template>
  <div class = "formulaire">
    <form v-on:submit.prevent="prevent" method="post">
          <div class = "user-box">
              <label for="nomPers">Nom du personnage:</label>
              <input type="text" id="nomPers" name="nomPers" ref="nomPers" v-model = "nomPers">
          </div>
          <div class = "user-box">
              <label for="noFilm">Film</label>
              <select id="film" name="film" ref="film" v-model="titlefilm">
                  <option v-for="title in titles" :key="title">
                      <option>{{title.titre}}</option>
                  </option>
              </select>
          </div>
          <input type="Submit" value="Ajouter">
      </form>
  </div>
</template>
    
<script>

import axios from 'axios';
export default {
    data() {
    var titles = null
    var form = new Object()
    
        return {
        component:"Null",
        nomPers : "Gollum",
        titles,
        titlefilm : titles,
        form
        }
    },
    beforeMount () {
    axios
      .get('http://localhost:8081/film/list', {headers : {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }})
      .then(response => {
        var datas = response.data
        var titleindatas = []
        var i
        for (i = 0; i<datas.length; i ++ ){
          titleindatas.push(
            {
              "noFilm" : datas[i].noFilm,
              "titre" : datas[i].titre
            })
        }
        this.titles = titleindatas
        })
      .catch(err => {
        console.log(err.response);
      });
  },
  methods:{
      prevent(){
          var i
          for( i =0; i< this.titles.length; i++){
              if(this.titlefilm.normalize() === this.titles[i].titre.normalize()){
                  this.form.noFilm = this.titles[i].noFilm
              }
          }
          this.form.noAct = this.$route.params.idAct
          this.form.nomPers = this.nomPers
          this.envoyer()
      },
      envoyer(){
        axios
        .post('http://localhost:8081/personnage/add',this.form)
            console.log(this.form)
            this.$router.push({name : "personnage", params :{id: this.$route.params.idAct }})
      }
  }
}
</script>