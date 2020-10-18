<template>
  <div>
    <a-button
      type="primary"
      style="margin: 10px 0"
      icon="plus"
      @click="visible = true"
    >
      添加讲师
    </a-button>

    <a-modal
      v-model="visible"
      :title="form.id ? '编辑用户' : '添加讲师'"
      @ok="yes"
      @cancel="no"
      okText="确定"
      cancelText="取消"
    >
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="头像" class="updata">
          <a-upload
            name="file"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            action="http://demo.simbajs.com:89/user/uploadimg"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" alt="avatar" width="100%" />
            <div v-else>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">上传图片</div>
            </div>
          </a-upload>
        </a-form-model-item>

        <a-form-model-item ref="nickname" label="花名" prop="nickname">
          <a-input v-model="form.nickname" />
        </a-form-model-item>
        <a-form-model-item ref="name" label="姓名" prop="name">
          <a-input v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item ref="fangxiang" label="方向" prop="fangxiang">
          <a-input v-model="form.fangxiang" />
        </a-form-model-item>
        <a-form-model-item ref="desc" label="描述" prop="desc">
          <a-input v-model="form.desc" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-table
      :columns="columns"
      :data-source="data"
      :pagination="false"
      rowKey="id"
      bordered
    >
      <img
        :src="$absoultSrc(text)"
        slot="img"
        slot-scope="text"
        width="80"
        height="60"
        style="cursor: pointer"
        title="点击放大"
        @click="preview($absoultSrc(text))"
      />

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
        <button class="detail common" @click="more(record.id)">
          <a-icon type="search" />&nbsp;详情
        </button>
        <button class="edit common" @click="edit(record.id)">
          <a-icon type="edit" />&nbsp;编辑
        </button>
        <a-button type="danger" @click="del(record.id)"
          ><a-icon type="delete" />&nbsp;删除</a-button
        >
      </span>
    </a-table>

     <changeBig :ImgUrl='bigImgUrl' :isBig.sync='isOpen' width='500px' height='400px'/>
                                                    <!-- 组件可自定义图片大小，不写有默认值 -->

    <a-modal
      :title="moreData.name"
      :visible="moreappear"
      :footer="null"
      @cancel="moreappear = false"
    >
      <ul>
        <li>头像：<img :src="$absoultSrc(moreData.img)" width="200" /></li>
        <li>花名：{{ moreData.nickname }}</li>
        <li>姓名：{{ moreData.name }}</li>
        <li>方向：{{ moreData.fangxiang }}</li>
        <li>描述：{{ moreData.desc }}</li>
      </ul>
    </a-modal>

    <Center style="padding: 20px 0">
      <a-pagination
        v-model="pageIndex"
        :total="totalData"
        :pageSize="pageSize"
        show-less-items
      />
    </Center>
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
    title: "花名",
    dataIndex: "nickname",
    key: "nickname",
    scopedSlots: { customRender: "nickname" },
  },
  {
    title: "姓名",
    key: "name",
    dataIndex: "name",
  },
  {
    title: "宣传照",
    key: "img",
    dataIndex: "img",
    scopedSlots: { customRender: "img" },
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];
function getBase64(img, callback) { //base64体积大
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      data: [],
      columns: this.$setColCenter(columns),
      totalData: 0,
      pageIndex: 1,
      pageSize: 3,
      visible: false,
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
      form: {
        nickname: "",
        name: "",
        fangxiang: "",
        desc: "",
        img: "",
      },
      loading: false,
      imageUrl: "",
      rules: {
        nickname: [{ required: true, message: "请输入花名", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        fangxiang: [{ required: true, message: "请输入方向", trigger: "blur" }],
        desc: [{ required: true, message: "请输入描述", trigger: "blur" }],
      },
      isOpen: false,
      bigImgUrl: "",
      moreData: [],
      moreappear: false,
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
    preview(src) {
      this.isOpen = true;
      this.bigImgUrl = src;
    },
    async getCount() {
      let {
        data: { count },
      } = await this.$get("/sys/jscount");
      this.totalData = count;
    },
    async getList() {
      let { data } = await this.$get("/sys/jslist", {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
      });
      this.data = data;
    },
    async yes() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (!this.form.img) {
            return this.$message.error("请上传图片");
          }
          let { data } = await this.$post("/sys/savejs", this.form);
          if (data.success) {
            this.$message.success(this.form.id ? "编辑成功" : "添加成功");
          } else {
            this.$message.error(this.form.id ? "编辑失败" : "添加失败");
          }
          this.visible = false;
          this.form = {
            nickname: "",
            name: "",
            fangxiang: "",
            desc: "",
            img: "",
          };
          this.imageUrl = ""; //这个是表格中显示的图片，把他清空表格中图片才不显示
          this.getList();
        }
      });
    },
    no(){
        this.form = {
            nickname: "",
            name: "",
            fangxiang: "",
            desc: "",
            img: "",
        };
        this.imageUrl = "";
    },
    async edit(id) {
      //编辑和添加功能最终走确定按钮下的方法(即添加功能)，所以提示框在添加功能内确定内容，更新只显示内容
      //后端根据传过来的对象有没有id判断为添加还是更新
      this.visible = true;
      let { data } = await this.$get("/sys/jsinfo", { id });
      this.imageUrl = this.$absoultSrc(data.img);
      this.form = data;
    },
    async more(id) {
      //详情功能
      this.moreappear = true;
      let { data } = await this.$get("/sys/jsinfo", { id });
      this.moreData = data;
    },
    async del(id) {
      await this.$mc("提示", "删除后无法恢复");
      let {
        data: { success },
      } = await this.$post("/sys/removejs", { id });
      if (success) {
        this.$message.success("删除成功");
        this.getList();
      }
    },
    handleChange(info) {
      // console.log(info);  这里有转码过后的地址
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl;
          this.loading = false;
        });
        this.form.img = info.file.response; //将转码过的地址赋值给form中的img传给后台，直接传图片数据库会很大
      }
    },
    beforeUpload(file) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        this.$message.error("只能上传图片");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图片大小不能大于2MB!");
      }
      return isJpgOrPng && isLt2M;
    },
  },
  created() {
    this.getCount(), this.getList();
  },
};
</script>
<style >
li {
  list-style: none;
  margin-bottom: 30px;
}
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
.updata {
  display: flex;
}
.ant-list-item-meta-title {
  margin-left: 30px;
}
.ant-modal-content {
  width: 400px;
}
</style>
