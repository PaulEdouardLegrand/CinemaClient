<template>
  <div id="app">
    <h1>Les personnages</h1>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :row-style-class="rowStyleClassFn"
      :search-options="{ enabled: true }"
      @on-row-click="onRowClick"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'modifier'">
          <button type="button" class="btn btn-primary" v-on:click= "modifier">Modifier</button>
        </span>
        <span v-if="props.column.field == 'supprimer'">
          <button type="button" class="btn btn-primary" v-on:click="supprimer">Supprimer</button>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
    </vue-good-table>
    <button type="button" class="btn btn-primary" v-on:click="ajouter">Ajouter</button>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: "App",
  numPersonnage : 0,
  numFilm : 0,
  numAct : 0,
  personnage  : "Gollum",
  titre : "test",
  data() {
    var rows = null
    return {
      component:"Null",
      rows,
      columns: [
        {
          label: "N° Personnage",
          field: "noPers",
          filterable: true
        },
        {
          label: "Nom personnage",
          field: "nomPers",
          filterable: true
        },
        {
          label: "Film",
          field: "film",
          filterable: true
        },
        {
          label: "Modifier",
          field: "modifier",
          filterable: true
        },
        {
          label: "Supprimer",
          field: "supprimer",
          filterable: true
        }
      ]
    };
  },
  beforeMount () {
    axios
      .get('http://localhost:8081/acteur/personnages/'+this.$route.params.id, {headers : {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }})
      .then(response => {
        var datas = response.data
        var rowsindatas = []
        var i
        for (i = 0; i<datas.length; i ++ ){
          rowsindatas.push(
            {
              "noPers" : datas[i].noPers,
              "nomPers" : datas[i].nomPers,
              "film" : datas[i].film.titre
            })
        }
        this.rows = rowsindatas
        })
      .catch(err => {
        console.log(err.response);
      });
  },
  methods:{
    rowStyleClassFn() {
      return 'VGT-row';
    },
    supprimer(){
      if (typeof this.numPersonnage!== "undefined"){
          axios
        .post('http://localhost:8081/personnage/delete', {"noPers":this.numPersonnage})
        .catch(err => {
          console.log(err.response);
        });
        this.$forceUpdate();
        this.$router.push({name : "acteurs" })
      }
    },
    modifier(){
      if (typeof this.numPersonnage!== "undefined"){
        this.$router.push({name : "modifierPersonnage", params: {idAct: this.$route.params.id, noFilm: this.Film, noPers: this.numPersonnage, nomPers: this.personnage, titre: this.film }})
      }
    },
    ajouter(){
        this.$router.push({name : "ajoutPersonnage", params: {idAct: this.$route.params.id} })
    },
    onRowClick(params) {
      this.numPersonnage = params.row.noPers
      this.numFilm = params.row.noFilm
      this.numAct = params.row.noAct
      this.personnage = params.row.nomPers
      this.film = params.row.film
  }
  }
};
</script>

<style>
.vgt-inner-wrap{
  margin-top: 5%;
}
h1{
  margin-top: 100px;
  color: lightsteelblue;
  text-align: center;
}
.VGT-row:hover {
    background-color: rgb(241, 241, 241);
  }
</style>