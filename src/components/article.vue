<template>
  <div>
    <a-button
      type="primary"
      style="margin: 10px 0"
      icon="plus"
      @click="$router.push('/home/publish')"
    >
      添加文章
    </a-button>
      <a-select default-value="全部" style="width: 120px;margin:0 10px" @change="changeList" >
         <a-select-option :value="undefined">全部</a-select-option>
         <a-select-option :value="item.id" v-for="(item) in sectionlist" :key="item.id" >{{item.name}}</a-select-option>
      </a-select>

    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      rowKey="id"
    >
      <span slot="nickname" slot-scope="text, record">
        <a-popover title="简介">
          <template slot="content">
            <p>{{ record.desc }}</p>
          </template>
          <p style="text-decoration: underline; cursor: pointer; color: blue">
            {{ text }}
          </p>
        </a-popover>
      </span>
      <span slot="action" slot-scope="text, record">

        <router-link :to="'/home/detail/'+record.id">
          <button class="detail common">
            <a-icon type="search" />&nbsp;详情
          </button>
        </router-link>

        <router-link :to="'/home/publish/'+record.id">
           <button class="edit common">
               <a-icon type="edit" />&nbsp;编辑
           </button>
        </router-link>

        <a-button type="danger" @click="del(record.id)"
          ><a-icon type="delete" />&nbsp;删除</a-button
        >
      </span>
    </a-table>
    <Center style="padding: 20px 0">
      <a-pagination
        v-model="query.pageIndex"
        :total="totalData"
        :pageSize="query.pageSize"
        show-less-items
      />
    </Center>
  </div>
</template>
<script>
import tableMixin from '~c/mypackage/tableMixin.js';
const columns = [
  {
    title: "编号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "所属分类",
    key: "sectionname",
    dataIndex: "sectionname",
  },
  {
    title: "作者",
    key: "creator",
    dataIndex: "creator",
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];
export default {
  mixins:[tableMixin],
  data() {
    return {
      columns: this.$setColCenter(columns),
      sectionlist:[],
      query:{//这个query对象会与混入的tableMixin合二为一
        sectionid:null,
        //页面刷新时下拉框value没值，要让其等于null获取所有数据，
//sectionid有值时,在请求地址后拼接sectionid=2如?sectionid=2&pageIndex=1&pageSize=4从而获取筛选数据，没有则不拼接
      }
    };
  },
  methods: {
    async getSection(){
        let {data} = await this.$get("/art/sectionlist")  
        this.sectionlist=data
    },
    changeList(value) {
        this.query.sectionid=value
        this.getList() //小括号内可以传值
        this.query.pageIndex=1 //这样选择分类后回到第一页，不会出现如选择类别前在第三页选择新类别后还是第三页
  },
    async getDate(params) { //调用getList会自动调用getData方法     
      let res1= await this.$get("/art/articlelist",params);      
      return res1 //结果返回给gitList方法的await this.getDate()代码结构出来用
    },
    async del(id) {
      await this.$mc("提示", "删除后无法恢复");
      let {
        data: { success },
      } = await this.$post("/art/removearticle", { id });
      if (success) {
        this.$message.success("删除成功");
        this.getList();
      }
    },
  },
  created() {
     this.getSection()
  },
};
</script>
<style >
.common {
  width: 82px;
  height: 32px;
  color: #fff;
  border: 0;
  outline: 0;
  cursor: pointer;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
  border-radius: 4px;
  margin-right: 5px;
}
.edit {
  background-color: #f15b16;
}
.edit:hover {
  background-color: rgba(241, 91, 22, 0.7);
}
.detail {
  background-color: rgb(144, 224, 22);
}
.detail:hover {
  background-color: rgba(144, 224, 22, 0.7);
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
