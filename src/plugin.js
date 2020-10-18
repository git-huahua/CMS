import mixin from './mixin';
import filter from '~c/mypackage/filter.js';
import components from '~c/mypackage/components.js';
export default {   
     install(Vue,option){ //这个Vue来源于main.js中vue.use(),只要写vue.use(),就把vue传到这个插件中
         Vue.mixin(mixin) //为了让代码少点，将mixin中的代码写到mixin.js中

         //console.log(filter); 
    /*      for (const key in filter) {  //只要filter.js中新增过滤器，这里就自动遍历添加进去
            //console.log(key,filter[key]); key为过滤器名字，filter[key]为对应的方法
              Vue.filter(key,filter[key])  //简写成下面写法
         } */

         Object.keys(filter).forEach(key=> Vue.filter(key,filter[key]))
         Object.keys(components).forEach(key=>Vue.component(key,components[key]))
    }
}