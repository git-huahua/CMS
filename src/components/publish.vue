<template>
  <div>
    <a-button
      type="primary"
      icon="save"
      style="margin: 10px auto"
      @click="publish"
    >
      发布
    </a-button>
      <a-upload
     name="file"
    :multiple="true"
     @change="handleChange"
     :showUploadList='false'
    action="http://demo.simbajs.com:89/user/uploadimg"
  >
    <a ref="uploader"></a>
  </a-upload>
  
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="标题">
        <a-input v-model="form.title" />
      </a-form-model-item>

      <a-form-model-item label="分类">
        <a-select v-model="form.sectionid" placeholder="请选择" style="width: 200px">
          <a-select-option :value="item.id" v-for="(item) in sectionlist" :key="item.id">{{item.name}}</a-select-option>
        </a-select>
        </a-form-model-item>
    </a-form-model>

    <quill-editor
      v-model="form.content"
      ref="myQuillEditor"
      :options="editorOption"
      style="height: 300px"
    >
    </quill-editor>
  </div>
</template>

<script>
import { quillEditor ,Quill } from "vue-quill-editor";
import  ImageResize  from '@felrov/quill-image-resize-module';
Quill.register("modules/imageResize", ImageResize)
import "quill/dist/quill.snow.css";
var toolbarList=[
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript        
            [{ direction: "rtl" }], // text direction
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }], 
            [{ font: [] }],
            [{ align: [] }],
            ["clean"], 
            ["link"], 
            ["image"], 
          ]
export default {
  props: ["id"],
  data() {   
    return {     
      sectionlist:[],
      labelCol: { span: 1 },
      wrapperCol: { span: 23 },
      form: {
        title: "",
        sectionid: "",
        content: "",
      },     
      editorOption: {
        placeholder: "请输入内容...",
        modules: {
          toolbar: toolbarList,
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
          }
        },
      },
    };
  },
  methods: {
    async publish() {    
      let {
        data: { success },
      } = await this.$post("/art/saveArticle", this.form);
      if (success) {
        this.$message.success(this.id?"编辑成功":"发布成功");
        this.$router.push("/home/article");
      } else {
        this.$message.error(this.id?"编辑失败":"发布失败");
      }
    },
    async getSection(){
        let {data} = await this.$get("/art/sectionlist")  
        this.sectionlist=data
    },

    handleChange(info){
      if (info.file.status === 'done') {
          this.form.content += `<img src='${this.$absoultSrc(info.file.response)}'/>`
      } else if (info.file.status === 'error') {
          this.$message.error(`上传失败`);
      }
     },
     async isHasId(){ //是否渲染富文本，编辑时有id渲染，没id表示添加，不渲染
        if (this.id) {
            let {data}=await this.$get('/art/articleinfo',{id:this.id})
            this.form=data
            this.form.id=this.id //当为编辑时添加id属性，有id后端则认为是更新
        }
     }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
  components: {
    quillEditor,
  },
  mounted() {
     var toolbar = this.editor.getModule('toolbar');
        //这个this.editor指的是computed中editor()return的quill
     toolbar.addHandler('image', () => {
          this.$refs.uploader.click()
     });
      this.isHasId(),this.getSection()
  },
};
</script>

<style>
</style>