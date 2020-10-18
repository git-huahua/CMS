<template>
  <div>
            <a-button
        type="primary"
        style="margin: 10px 0"
        icon="plus"
        @click="visible = true"
      >
        添加链接 
      </a-button>

         <a-modal
        :title="form.id? '编辑链接':'新增链接'"
        okText= '确认'
        cancelText= '取消'
        :afterClose='clearForm'
        :visible="visible"
        :confirm-loading="confirmLoading"
        @ok="add"
        @cancel="visible = false"
      >
        <a-form-model
          :model="form"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :rules="rules"
          ref="ruleForm"
        >
          <a-form-model-item label="网站名称" prop="name">
            <a-input v-model="form.name"/>
          </a-form-model-item>
          <a-form-model-item label="网站地址" prop="path">
            <a-input v-model="form.path"/>
          </a-form-model-item>
        </a-form-model>
      </a-modal>


    <a-table :columns="columns" :data-source="data" :pagination="false" rowKey='id'>
      <a slot="name" slot-scope="text">{{ text }}</a>

       <span slot="path" slot-scope="text">
            <a  target="_blank" :href='text'>{{ text }}</a>       
      </span>
      <span slot="action" slot-scope="text, record">
         <a style="color:brown"  @click="edit(record.id)"><a-icon type="edit"/>&nbsp;编辑</a>
         <a-divider type="vertical" />
         <a @click="del(record.id)"><a-icon type="delete"/>&nbsp;删除</a>
      </span>
    </a-table>
  </div>
</template>
<script>
const columns = [
     {
    title: "编号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "网站名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "网站地址",
    dataIndex: "path",
    key: "path",
    scopedSlots: { customRender: "path" },
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];
export default {
  data() {
    return {
      data:[],
      columns:this.$setColCenter(columns),
      visible: false,
      confirmLoading: false,
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },     
      form: {
        name: "",
        path:''
      },
        rules: {
        name: [
          { required: true, message: '请输入网站名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在1~5位', trigger: 'blur' },
        ],
        path:[
           { required: true, message: '请输入网址', trigger: 'blur' },
           {
              pattern:/((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?)/,
              message: '请输入正确格式的网址', 
              trigger: 'blur'
           },
        ]
       }
    };
  },
  methods: {
     async getList() {
        let { data } = await this.$get("/sys/firendslink");
        this.data = data;
    },
       clearForm(){
        this.form={
            name: "",
            path:''
        }
        this.$refs.ruleForm.resetFields() //关闭模态框后清除表格内容及正则验证结果
    },
    add() {
      this.$refs.ruleForm.validate(async valid => {
             if (valid) {
                 this.confirmLoading=true
                 let{data:{success}}=await this.$post('/sys/savefl',this.form)
                 if (success) {
                     this.$message.success(this.form.id?"编辑成功":'新增成功');
                 }else{
                     this.$message.error(this.form.id?"编辑失败":'新增失败');
                 }
                 this.confirmLoading=false
                 this.visible=false
                 this.getList();
             }
      })      
    },
    async del(id) {
      await this.$mc("提示", "删除后无法恢复");
      let {
        data: { success },
      } = await this.$post("/sys/removefl", {
        id,
      });
      if (success) {
        this.$message.success("删除成功");
        this.getList();
      }
    },
    async edit(id){
        //编辑和添加功能最终走确定按钮下的方法(即添加功能)，所以提示框在添加功能内确定内容，更新只显示内容
        //后端根据传过来的对象有没有id判断为添加还是更新
        this.visible=true
        let {data}=await this.$get('/sys/detailfl',{id})
        this.form=data            
    }
  },
  created() {
      this.getList()
  },
};
</script>
