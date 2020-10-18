<template>
  <a-layout id="layout">
      <sideBar></sideBar>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; display:flex;justify-content:space-between">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="toggleCollapsed"
        />
        <a-dropdown class="drop">
           <a class="ant-dropdown-link" @click="e => e.preventDefault()">
               <a-icon type="user" />&nbsp;
              {{getUser}}<a-icon type="down" />
           </a>
           <a-menu slot="overlay">
             <a-menu-item @click="logout">
               <span>
                  <a href="javascript:;"><a-icon type="poweroff"/>&nbsp;注销</a>
               </span>
             </a-menu-item>
           </a-menu>
        </a-dropdown>

      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
      <a-breadcrumb>
        <a-breadcrumb-item>CEMS</a-breadcrumb-item>
        <a-breadcrumb-item><a href="">{{$route.meta.title}}</a></a-breadcrumb-item>
      </a-breadcrumb>   

        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import sideBar from '~c/sideBar.vue';
import {mapState,mapMutations} from 'vuex';
export default {
  components:{
      sideBar
  },
  computed: {
    ...mapState(['collapsed']),
     getUser(){
        return sessionStorage.getItem(this.KEY_WORDS.SESSION_NAME)
     }
  },
  methods: {
    ...mapMutations(['toggleCollapsed']),
    logout(){
        sessionStorage.removeItem(this.KEY_WORDS.SESSION_NAME)
        this.$router.push('/login')
    }
  },
};
</script>
<style>
#layout {
    height: 100vh;
}
#layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}
#layout .trigger:hover {
  color: #1890ff;
}
.logo{
    background-image: url('../assets/img/logo.jpg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #fff;
}
#layout .big-logo{
    height: 130px;
    width:100%;
}
#layout .small-logo{
   height: 63px;
   width: 100%;
}
.ant-menu-vertical .ant-menu-item,.ant-menu-inline .ant-menu-item{
    margin-top: 0 !important; 
}
.drop{
    margin-right: 40px;
}
.ant-form label{
  color:rgba(0, 0, 0, .85)
}
.ant-layout-content{
  margin: 0 !important;
}
.ant-layout-header{
  background-color: #f5f5f5 !important;
}
.ant-menu.ant-menu-dark .ant-menu-item-selected{
      background-color: rgb(51, 51, 51);
}
.ant-menu-dark .ant-menu-item-selected .anticon,.ant-menu-dark .ant-menu-item-selected .anticon + span{
    color: #ffff00;
}
</style>
