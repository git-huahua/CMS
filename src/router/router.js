export default [
     {          
          path:'/home',component:()=>import('~v/home.vue'),
          children:[
               {
                    path:'',//默认路由也可写'/',
                    component:()=>import('~c/first.vue'),
                    meta:{title:'首页',icon:'home'}
               },                                                 
               {
                    path:'listening',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                    component:()=>import('~c/listening'),
                    meta:{title:'试听管理',icon:'user'}
               },
               {
                    path:'teacher',
                    component:()=>import('~c/teacher'),
                    meta:{title:'讲师管理',icon:'star'}
               },
               {
                    path:'friendlyLink',
                    component:()=>import('~c/friendly.vue'),
                    meta:{title:'友情链接',icon:'link'}
               },
               {
                    path:'article',
                    component:()=>import('~c/article.vue'),
                    meta:{title:'文章管理',icon:'profile'}
               },
               {
                    path:'gation',
                    component:()=>import('~c/gation.vue'),
                    meta:{title:'导航管理',icon:'drag'}
               },
               {
                    path:'publish/:id?',
                    props:true,
                    component:()=>import('~c/publish.vue'),
                    meta:{title:'添加文章',hiddenMenu:true}
               },
               {
                    path:'detail/:id?',
                    props:true,//为true让其可通过props直接拿到值，不用再通过this.$route.params.id这种方式获得
                    component:()=>import('~c/detail.vue'),
                    meta:{title:'文章详情',hiddenMenu:true}
               },
          ]
     }, 
     {
        path:'/login',
        component:()=>import('~v/login.vue'),
        meta:{title:'登录'}
     }, 
]