<template>
  <div class="index">
    <div class="top">
      <h1>可视化数据展示</h1>
      <now-time />
    </div>

    <border>
      <h2 slot="title">柱形图-每日预约数</h2>
      <div
        class="myCharts"
        style="width: 300px; height: 130px"
        slot="echarts"
      ></div>
    </border>
  </div>
</template>

<script>
import echarts from "echarts";
function charts1() {
  var myChart = echarts.init(document.querySelector('.myCharts')); //ref无用为this指向问题
  var option = {
    color: ["#2f89cf"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    // 修改图表的大小
    grid: {
      left: "0%",
      top: "10px",
      right: "0%",
      bottom: "0%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: [
          "周一",
          "周二",
          "周三",
          "周四",
          "周五",
          "周六",
          "周日",
        ],
        axisTick: {
          alignWithLabel: true,
        },
        // 修改刻度标签 相关样式
        axisLabel: {
          color: "rgba(255,255,255,.6) ",
          fontSize: "12",
        },
        // 不显示x坐标轴的样式
        axisLine: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        // 修改刻度标签 相关样式
        axisLabel: {
          color: "rgba(255,255,255,.6) ",
          fontSize: 12,
        },
        // y轴的线条改为了 2像素
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
            width: 2,
          },
        },
        // y轴分割线的颜色
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)",
          },
        },
      },
    ],
    series: [
      {
        name: "直接访问",
        type: "bar",
        barWidth: "35%",
        data: [20, 30, 30, 90, 150, 120, 60],
        itemStyle: {
          // 修改柱子圆角
          barBorderRadius: 5,
        },
      },
    ],
  };
  myChart.setOption(option);
}
export default {
  mounted() {
    setTimeout(() => {
      /* 加定时器原因：不加他会获取不到myCharts，因为先执行first文件中的mounted此时我封装的border组件还没有加载，
       就导致获取不到myCharts中的dom,导致报错找不到（比如先走first组件中mounted，再走border中的mounted，即先打印2，再打印1）
    */
      // console.log(2);
      charts1();
    }, 1000);
  },
};
</script>

<style lang='scss'>
.index {
  width: 100%;
  height: 100%;
  background-image: url("../assets/img/bg.jpg");
  background-size: cover;
  .top {
    width: 100%;
    height: 70px;
    position: relative;
    line-height: 70px;
    background-image: url("../assets/img/head_bg.png");
    background-size: cover;
    text-align: center;
    h1 {
      color: #fff;
      font-size: 30px;
    }
    #app {
      font-family: myfont;
      position: absolute;
      right: 0;
      top: 0;
      margin-right: 10px;
      font-size: 20px;
      color: rgb(235, 118, 41);
    }
  }
}
@font-face {
  font-family: myfont;
  src: url("../assets/font/DS-DIGIT.TTF");
}
</style>