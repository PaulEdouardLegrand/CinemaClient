<template>

  <div id="app">
    <h1>Les différents acteurs présents dans les films</h1>
    <vue-good-table :columns="columns" :rows="rows" :row-style-class="rowStyleClassFn" :search-options="{enabled: true}" @on-row-dblclick="onRowDoubleClick" >
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
          label: "N° Acteur",
          field: "noAct",
          filterable: true
        },
        {
          label: "Nom",
          field: "nomAct",
          filterable: true
        },
        {
          label: "Prénom",
          field: "prenAct",
          filterable: true
        },
        {
          label: "Date de naissance",
          field: "dateNaiss",
          filterable: true
        },
        {
          label: "Date de décès",
          field: "dateDeces",
          filterable: true
        },
        {
          label: "Personnages",
          field: "personnages",
          filterable: true
        }
      ]
    };
  },
  beforeMount () {
    axios
      .get('http://localhost:8081/acteur/list', {headers : {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
        }})
      .then(response => {
        var datas = response.data
        var rowsindatas = []
        var i
        for (i = 0; i<datas.length; i ++ ){
            var personnagestxt = ""
            var j
            for (j = 0; j<datas[i].personnages.length;j++ ){
                if (j>0){
                    personnagestxt += ", "
                }
                personnagestxt += datas[i].personnages[j].nomPers + " ( "+ datas[i].personnages[j].film.titre + " )"
            }
          rowsindatas.push(
            {
              "noAct" : datas[i].noAct,
              "nomAct" : datas[i].nomAct,
              "prenAct" : datas[i].prenAct,
              "dateNaiss": datas[i].dateNaiss,
              "dateDeces": datas[i].dateDeces,
              "personnages": personnagestxt ,
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
        this.$router.push({name : "personnage", params: {id: params.row.noAct}})
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