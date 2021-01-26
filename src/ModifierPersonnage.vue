<template>
    <div class = "formulaire">
        <form v-on:submit.prevent="prevent" method="post">
            <div class = "user-box">
                <label for="nomPers">Nom du personnage:</label>
                <input type="text" id="nomPers" name="nomPers" ref="nomPers" v-model = "nomPers">
            </div>
            <div class = "user-box">
                <label for="noFilm">Film</label>
                <select id="film" name="film" ref="film" v-model= "titlefilm">
                    <option v-for="title in titles" :key="title">
                        <option>{{title.titre}}</option>
                    </option>
                </select>
            </div>
            <div class = "button">
                <input type="Submit" value="Modifier">
            </div>
        </form>
    </div>
</template>
    
<script>

import axios from 'axios';
export default {
    data() {
    var titles = null
    var form = new Object()
    var titlefilm =this.$route.params.titre
        return {
        component:"Null",
        nomPers : this.$route.params.nomPers,
        titles,
        titlefilm,
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
  mounted(){
    console.log(this.titlefilm)
    console.log(this.$route.params.titre)
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
          this.form.noPers = this.$route.params.noPers
          this.envoyer()
      },
      envoyer(){
        axios
        .post('http://localhost:8081/personnage/update', this.form)
        this.$router.push({name : "personnage", params :{id: this.$route.params.idAct }})
      }
  }
}
</script>
<style>
.formulaire {
  position: absolute;
  top: 40%;
  left: 50%;
  width: 50%;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(240,240,240,.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(240,240,240,.5);
  border-radius: 10px;
}
body {
  font-family: sans-serif;
}
.formulaire .user-box {
  position: relative;
}

.formulaire .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: rgb(0, 0, 0);
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid rgb(0, 0, 0);
  outline: none;
  background: transparent;
}
.formulaire .user-box select {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: rgb(0, 0, 0);
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid rgb(0, 0, 0);
  outline: none;
  background: transparent;
}

.formulaire .user-box input:focus ~ label,
.formulaire .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}
input[type=submit]{
  background-color: rgb(197, 205, 214);
  border: none;
  color: rgb(0, 0, 0);
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 25px;
}
</style>