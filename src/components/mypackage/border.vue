<template>
    <div class="panel">
         <slot name="title"></slot>
         <slot name="echarts"></slot>
         <div class="panel-footer"></div>
    </div>
</template>

<script>

export default {
//   mounted() {
//       console.log(1);
//   },
}
</script>

<style lang='scss'>
.panel{
  position: relative;
  width: 350px;
  height: 200px;
  padding: 5px;
  border: 1px solid rgba(25, 186, 139, 0.17);
  margin-bottom: 28px;
  text-align: center;
  background: url('../../assets/img/line(1).png') rgba(255, 255, 255, 0.03);
  h2{
      color: #fff;
  }
   &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      height: 10px;
      border-left: 2px solid #02a6b5;
      border-top: 2px solid #02a6b5;
      content: "";
   }
    &::after{
        position: absolute;
        top: 0;
        right: 0;
        width: 10px;
        height: 10px;
        border-right: 2px solid #02a6b5;
        border-top: 2px solid #02a6b5;
        content: "";
    }
    .panel-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        &::before{
             position: absolute;
             left: 0;
             bottom: 0;
             width: 10px;
             height: 10px;
             border-left: 2px solid #02a6b5;
             border-bottom: 2px solid #02a6b5;
             content: "";
        }
        &::after{
            position: absolute;
            bottom: 0;
            right: 0;
            width: 10px;
            height: 10px;
            border-right: 2px solid #02a6b5;
            border-bottom: 2px solid #02a6b5;
            content: "";
        }
    }
}
</style>