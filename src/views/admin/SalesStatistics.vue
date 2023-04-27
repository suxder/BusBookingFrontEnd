<template>
  <div class="body">
    <header>
      <h1>数据可视化EChars</h1>
      <div class="showTime"></div>
    </header>
    <!--页面头部部分结束-->
    <section class="mainBox">
      <div class="column">
        <div class="panel bar">
          <h2>图书销量前三名</h2>
          <div class="char">图表</div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line">
          <h2></h2>
          <div class="char"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
          <h2></h2>
          <div class="char"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="column"></div>
      <div class="column">
        <div class="panel bar1">
          <h2></h2>
          <div class="char"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line">
          <h2></h2>
          <div class="char"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
          <h2></h2>
          <div class="char"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    getBookRank() {
      this.$http
        .get("book/rank")
        .then((response) => {
          if (response.status === 200) {
            let data = response.data.data;
            this.tableSet(data);
          }
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
    timeSet() {
      let t = null;
      t = setTimeout(time, 1000); //開始运行
      function time() {
        clearTimeout(t); //清除定时器
        let dt = new Date();
        let y = dt.getFullYear();
        let mt = dt.getMonth() + 1;
        let day = dt.getDate();
        let h = dt.getHours(); //获取时
        let m = dt.getMinutes(); //获取分
        let s = dt.getSeconds(); //获取秒
        let showTimeEl = document.querySelector(".showTime");
        if (showTimeEl) {
          showTimeEl.innerHTML =
            "当前时间：" +
            y +
            "年" +
            mt +
            "月" +
            day +
            "-" +
            h +
            "时" +
            m +
            "分" +
            s +
            "秒";
          t = setTimeout(time, 1000); //设定定时器，循环运行
        } else {
          return;
        }
      }
    },
    tableSet(data) {
      /*对AJAX拿到的数据进行处理*/
      let bookNames = [];
      let salesData = [];
      let counts = data.length;

      for (let i = 0; i < counts; i++) {
        bookNames.push(data[i].bookName);
        salesData.push(data[i].sale);
      }

      for (let i = 0; i < counts; i++) {
        bookNames[i] = "《" + bookNames[i] + "》";
      }

      /*1.实例化对象*/
      // eslint-disable-next-line no-undef
      let myChart = this.$echarts.init(document.querySelector(".bar .char"));

      /*2.指定配置项和数据*/
      let option = {
        color: ["#2f89cf"],
        fontSize: "12",
        /*修改图表大小*/
        grid: {
          left: "10%",
          top: "10px",
          bottom: "25%",
          right: "0%",
        },
        /*设置指示器*/
        tooltip: {
          /*要想shadow生效，必须对trigger进行设置*/
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: bookNames,
          axisLabel: {
            color: "rgba(255,255,255,.6)",
            fontSize: "9",
            formatter: function (params) {
              let newParamsName = "";
              let paramsNameNumber = params.length;
              let provideNumber = 4;
              let rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              for (let row = 0; row < rowNumber; row++) {
                newParamsName +=
                  params.substring(
                    row * provideNumber,
                    (row + 1) * provideNumber
                  ) + "\n";
              }
              return newParamsName;
            },
          },
          axisLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "rgba(255,255,255,.6)",
            fontSize: "12",
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)",
            },
          },
          /*y轴分割线颜色*/
          splitLine: {
            lineStyle: {
              color: "rgba(255,255,255,.1)",
            },
          },
        },
        series: [
          {
            data: salesData,
            type: "bar",
            barWidth: "40%",
            itemStyle: {
              barBorderRadius: 5,
            },
          },
        ],
      };

      /*3.将配置项设置给实例对象*/
      myChart.setOption(option);
    },
  },
  mounted() {
    this.timeSet();
    this.getBookRank();
  },
};
</script>

<style scoped>
/*CSS初始化*/
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.body {
  background: url("../../assets/image/bg.jpg") fixed;
  background-size: 100%;
  line-height: 1.15;
  margin-top: -25px;
}
header {
  background: url("../../assets/image/head_bg.png") no-repeat;
  height: 100px;
  position: relative;
}
header h1 {
  font-size: 38px;
  font-weight: 200;
  color: #fff;
  text-align: center;
  line-height: 80px;
}
.showTime {
  font-size: 16px;
  font-weight: 200;
  color: rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 0;
  right: 35px;
  line-height: 75px;
}
.mainBox {
  display: flex;
  min-width: 1024px;
  max-width: 1920px;
  margin: 0 auto;
  padding: 10px 10px 0;
}
.mainBox .column {
  flex: 3;
}
.mainBox .column:nth-child(2) {
  flex: 5;
  margin: 0 10px 15px;
}
/*公共样式panel*/
.panel {
  position: relative;
  height: 310px;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background: url("../../assets/image/line(1).png") rgba(255, 255, 255, 0.03);
  padding: 0px 15px 40px;
  margin-bottom: 15px;
}
.mainBox .panel::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.mainBox .panel::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.mainBox .panel .panel-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.mainBox .panel .panel-footer::before {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
.mainBox .panel .panel-footer::after {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
.mainBox .panel h2 {
  height: 48px;
  color: #fff;
  line-height: 48px;
  text-align: center;
  font-size: 15px;
  font-weight: 200;
}
.mainBox .panel .char {
  height: 210px;
}
</style>