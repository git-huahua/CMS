<template>
   <div class="ql-editor">
        <h2 style="text-align:center">{{data.title}}</h2>
        <p>类别:{{data.sectionname}}</p>
        <div v-html="data.content"></div>
   </div>
</template>

<script>
export default {
      props: ["id"],
      data() {
          return {
              newId:'',
              data:''
          }
      },
      methods: {
        async getInfo(){
            this.newId=this.id
            let {data}=await this.$get('/art/articleinfo',{id:this.newId})
            this.data=data
         }
       },
      created() {
          this.getInfo()
      },
}
</script>

<style>
</style>