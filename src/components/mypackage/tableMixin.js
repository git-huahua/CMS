export default {
    data() {
         return { 
            data: [],        
            totalData: 0,
            query:{//这个query对象会与引入混入的article.vue合二为一
              pageIndex: 1,
              pageSize: 4,
            }
         }
      },
      watch: {
        //data中pageIndex变化时触发
        'query.pageIndex'() {//监听对象中的属性加引号 
          //每页发生变化，重新获取对应数据
          this.getList();
        },
      },
    methods: {
        async getList() {
            let {data:{list,count}}=await this.getDate(this.query)//在这里调用getData方法   
            this.totalData=count
            if (!list.length && this.pageIndex > 1) {
              this.pageIndex--;
              this.getList();
            } else {
              this.data = list;
            }
          },
    },
    mounted() {
        this.getList();
    },
}