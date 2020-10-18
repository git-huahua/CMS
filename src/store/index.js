import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
const store = new Vuex.Store({
      state:{
         collapsed: false,
      },
      mutations:{
        toggleCollapsed(state){
             state.collapsed=!state.collapsed
        }
      }
})
export default store