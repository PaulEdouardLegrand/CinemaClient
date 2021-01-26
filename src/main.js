import Vue from 'vue'
import App from './App.vue'
import "vue-good-table/dist/vue-good-table.css";
import VueGoodTable from 'vue-good-table'
import VueRouter from 'vue-router'
import Films from './Films.vue'
import Acteurs from './Acteurs.vue'
import Personnage from './Personnage.vue'
import AjoutPersonnage from './AjoutPersonnage.vue'
import ModifierPersonnage from './ModifierPersonnage.vue'

Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.use(VueGoodTable)

const routes = [
  { path: '/films', component: Films },
  { path: '/ajoutPersonnage',name :"ajoutPersonnage" , component: AjoutPersonnage},
  { path: '/modifierPersonnage/:id',name :"modifierPersonnage" , component: ModifierPersonnage},
  { path: '/personnage/:id',name :"personnage" , component: Personnage},
  { path: '/acteurs', name: "acteurs", component: Acteurs}
]
const router = new VueRouter({
  routes 
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

