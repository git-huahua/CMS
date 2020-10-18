<template>
    <div class="bigger" v-show="visiable" @click="visiable = false">
        <img :src="ImgUrl" @click.stop :style="{width,height}" />
        <!-- 阻止图片冒泡 -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            visiable:this.isBig
        }
    },
    watch: {
        visiable(){
            this.$emit('update:isBig',this.visiable) //对prop双向绑定，父子组件都可改变值,子组件若改不了值就无法让遮罩层消失
        },
        isBig(){
            this.visiable=this.isBig //isBig值发生变化就改变this.visiable的值
        }
    },
    props:{
        ImgUrl:{
           type:String,
           required:true
        },
        isBig:{
            type:Boolean,
            required:true
        },
        width:{
            type:String,
            defaults:"400px"
        },
        height:{
            type:String,
            defaults:"500px"
        } 
    }
}
</script>

<style>
.bigger {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>