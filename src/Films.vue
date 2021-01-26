<template>

  <div id="app">
    <h1>Voici les Films disponibles sur notre site</h1>
    <vue-good-table :columns="columns" :rows="rows" :row-style-class="rowStyleClassFn" :fixed-header="true" :search-options="{enabled: true}" @on-row-dblclick="onRowDoubleClick" >
    </vue-good-table>
  </div>
</template>

<script>

import axios from 'axios';
export default {
  name: "App",
  data() {
    var rows = null
    return {
      component:"Null",
      rows,
      columns: [
        {
          label: "N° Film",
          field: "noFilm",
          filterable: true
        },
        {
          label: "Titre",
          field: "titre",
          filterable: true
        },
        {
          label: "Durée",
          field: "duree",
          filterable: true
        },
        {
          label: "Date sortie",
          field: "dateSortie",
          filterable: true
        },
        {
          label: "Budget",
          field: "budget",
          filterable: true
        },
        {
          label: "Montant recette",
          field: "montantRecette",
          filterable: true
        },
        {
          label: "Réalisateur",
          field: "realisateur",
          filterable: true
        },
        {
          label: "Catégorie",
          field: "categorie",
          filterable: true
        }
      ]
    };
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
        var rowsindatas = []
        var i
        for (i = 0; i<datas.length; i ++ ){
          rowsindatas.push(
            {
              "noFilm" : datas[i].noFilm,
              "titre" : datas[i].titre,
              "duree" : datas[i].duree,
              "dateSortie": datas[i].dateSortie,
              "budget": datas[i].budget,
              "montantRecette": datas[i].montantRecette,
              "realisateur": datas[i].realisateur.nomRea + " " +datas[i].realisateur.prenRea ,
              "categorie": datas[i].categorie.libelleCat
            })
        }
        this.rows = rowsindatas
        })
      .catch(err => {
        console.log(err.response);
      });
  },
  methods:{
    onRowDoubleClick (params){
        this.$router.push({name : "filmsDetails", params: {id: params.row.noFilm}})
    },
    rowStyleClassFn() {
      return 'VGT-row';
    },
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