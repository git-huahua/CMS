<template>
    <a-layout-sider v-model="collapsed" :trigger="null" collapsible >
      <div :class="collapsed? 'small-logo':'big-logo'" class="logo"></div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="[defaultselected]">
        <a-menu-item :key="item.meta.title" v-for="item in allMenu">
           <router-link :to="'/home/'+item.path"><a-icon :type="item.meta.icon" />
          <span>{{item.meta.title}}</span></router-link>
        </a-menu-item>
        <!-- <a-menu-item key="2">
           <router-link to="/listening"><a-icon type="user" />
          <span>试听管理</span></router-link>
        </a-menu-item>
        <a-menu-item key="3">
           <router-link to="/friendlyLink"><a-icon type="link" />
          <span>友情链接</span></router-link>
        </a-menu-item> -->
      </a-menu>
    </a-layout-sider>
</template>

<script>
import {mapState} from 'vuex';
export default {
    computed: {
        ...mapState(['collapsed']),
       defaultselected(){ //将当前活跃的路由的标题作为是否活跃的判断依据，解决属新后高亮路由与显示组件不一致bug
          return this.$route.meta.title //类型为数组，所以return一个数组
      },
       allMenu(){
         return this.$router.options.routes[0].children.filter((item) =>! item.meta.hiddenMenu) 
                                                      //将路由中publish组件过滤出来不显示
     },
    },
}
</script>

<style>

</style>