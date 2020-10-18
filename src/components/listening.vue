<template>
  <div>
    <div>
      <a-button
        type="primary"
        style="margin: 10px 0"
        icon="plus"
        @click="visible = true"
      >
        添加试听
      </a-button>

      <a-modal
        title="添加试听"
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
          <a-form-model-item label="姓名" prop="realname">
            <a-input v-model="form.realname"/>
          </a-form-model-item>
          <a-form-model-item label="联系电话" prop="tel">
            <a-input v-model="form.tel"/>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
    <a-table
      :columns="columns"
      :data-source="list"
      rowKey="id"
      :pagination="false"
    >
      <span slot="createtime" slot-scope="text">
        <!-- 让时间格式可以根据自己想要的格式更改 -->
        {{ text | fmtTime }}
      </span>
      <span slot="action" slot-scope="text, record">
        <!--text为当前内容，record为当前行对象，-->
        <a-icon type="delete" style="color: #40a9ff" />&nbsp;<a
          @click="del(record.id)"
          >删除</a>
      </span>
    </a-table>

    <Center style="padding: 20px 0">
      <a-pagination
        v-model="pageIndex"
        :total="totalData"
        :pageSize="pageSize"
        show-less-items
      />
      <!--双向绑定第几页  -->
    </Center>
  </div>
</template>
<script>
const columns = [
  {
    title: "编号",
    dataIndex: "id", //这里要与请求到的数据中的键名一样
    key: "id",
  },
  {
    title: "姓名",
    key: "realname",
    dataIndex: "realname",
  },
  {
    title: "电话",
    key: "tel",
    dataIndex: "tel",
  },
  {
    title: "时间",
    dataIndex: "createtime",
    key: "createtime",
    scopedSlots: { customRender: "createtime" },
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
      list: [],
      columns: this.$setColCenter(columns),
      pageIndex: 1,
      pageSize: 5,
      totalData: 0,
      visible: false,
      confirmLoading: false,
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },     
      form: {
        realname: "",
        tel:''
      },
       rules: {
        realname: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在1~5位', trigger: 'blur' },
        ],
        tel:[
           { required: true, message: '请输入联系电话', trigger: 'blur' },
           {
              pattern:/^1(3|4|5|7|8)\d{9}$/,
              message: '请输入正确格式的号码', 
              trigger: 'blur'
           },
        ]
       }
    };
  },
  watch: {
    //data中pageIndex变化时触发
    pageIndex() {
      //每页发生变化，重新获取对应数据
      this.getList();
    },
  },
  methods: {
    async getList() {
      let { data } = await this.$get("/sys/shitinglist", {
        //http://simbajs.com:89/sys/shitinglist?keywords=&pageIndex=1&pageSize=10
        //将?keywords=&pageIndex=1&pageSize=10以参数形式传递
        /*  params:{
             pageIndex:this.pageIndex,
             pageSize:5 
          } */
        pageIndex: this.pageIndex, //此处省略了params,因为在mixin中封装的get方法带有params
        pageSize: 5,
      });

      //bug:即某页删完后不自动跳到上一页，需要用户手动点上一页，不人性化
      //解决方法：如果获取到的data长度为0，则自动将当前页减一页，且重新获取数据，获取到的就是减一页后的数据
      if (!data.length && this.pageIndex > 1) {
        this.pageIndex--;
        this.getList();
        this.getTotalData()
      } else {
        this.list = data;
      }
    },
    async getTotalData() {
      let {
        data: { count },
      } = await this.$get("/sys/shitingcount");
      //再次解构
      this.totalData = count;
    },
    async del(id) {
      await this.$mc("提示", "删除后无法恢复");
      let {
        data: { success },
      } = await this.$post("/sys/removest", {
        id,
      });
      if (success) {
        this.$message.success("删除成功");
        this.getList();
      }
    },
    add() {
      this.$refs.ruleForm.validate(async valid => {
             if (valid) {
                 this.confirmLoading=true
                 let{data:{success}}=await this.$post('/sys/order',this.form)
                 if (success) {
                     this.$message.success("新增成功");
                 }
                 this.confirmLoading=false
                 this.visible=false
                 this.getList();
             }
      })      
    },
    clearForm(){
        this.form={
            realname: "",
            tel:''
        }
        this.$refs.ruleForm.resetFields() //关闭模态框后清除表格内容及正则验证结果
    }
  },
  created() {
    this.getList(), this.getTotalData();
  },
};
</script>
