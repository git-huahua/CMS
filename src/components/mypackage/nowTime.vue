<template>
  <div id="app">{{ date.toLocaleString() }}</div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
    };
  },
  mounted() {
    var _this = this; //声明一个变量指向vue实例this,保证作用域一致
    this.timer = setInterval(function () {
      _this.date = new Date(); //修改数据date
    }, 1000);
  },
   beforeDestroy () {
     if(this.timer) {
      clearInterval(this.timer);//在vue实例销毁钱，清除我们的定时器
     }
    }
};
</script>

<style>
</style>