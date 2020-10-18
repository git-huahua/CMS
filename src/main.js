import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import plugin from './plugin';
import store from './store/index';
import "quill/dist/quill.core.css";
Vue.config.productionTip = false;
Vue.use(Antd);
Vue.use(plugin)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
