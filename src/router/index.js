import Vue from 'vue';
import VueRouter from 'vue-router';
import routes  from '~r/router.js';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
Vue.use(VueRouter)
const router = new VueRouter({
      routes
})
router.beforeEach((to, from, next) => {
      NProgress.start()
      if (to.meta&&to.meta.title) {
            document.title=to.meta.title
      }
      // console.log(sessionStorage.getItem('login-user'));
      if (!sessionStorage.getItem('login-user') && to.path !=='/login') {
           return next('/login')
      }
      next()
})

router.beforeEach((to, from, next) => {
      NProgress.done()
      next()
})
export default router