# Vuepress 测试沙盒

::: echarts 函数显示测试

```js

//需要绘制的函数曲线
function func1(x) {
  return Math.sin(x);
}

function func2(x) {
  return Math.cos(x);
}

function func3(x) {
  return 1 / 3 * Math.sin(x) + 1 / 4 * Math.sin(2 * x) + 1 / 5 * Math.sin(3 * x);
}

//产生数据
function generateData(fun, start, end, gap) {
  let data = [];
  for (let i = start; i <= end; i += gap) {
    data.push([i, fun(i)]);
  }
  return data;
}

option = {
  
  // 启用 legend
  legend: {
  },

  // x 轴设置
  xAxis: {
    // 坐标轴名称
    name: 'x',
    // 坐标轴类型 (绘制函数图像使用 value 类型)
    type: 'value',

    // 刻度间隔, 对于如三角函数等有刻度特性的情况使用
    interval: Math.PI / 2,
    // 坐标轴范围
    min: -Math.PI,
    max: Math.PI,

    axisLine: {
      // 轴线右侧显示箭头
      symbol: ['none', 'arrow'],
    },
    axisTick: {
      // 轴线向内
      inside: true
    },
    axisLabel: {
        // 识别 pi 刻度, 并格式化显示
        formatter: function(value, index){
            return (Math.round(value * 10 / Math.PI) / 10).toFixed(1) + 'π';
        }
    }
  },

  // y 轴设置
  yAxis: {
    name: 'y',
    type: 'value',
    minInterval: 0.25,
    min: -1.5,
    max: 1.5,

    axisLine: {
      symbol: ['none', 'arrow'],
    },
    axisTick: {
      inside: true
    },
  },
  //数据集
  series: [
    // 每条曲线使用一个 Serie
    {
      // 曲线名称
      name: 'y=sin(x)',
      // 函数曲线默认使用 line
      type: 'line',
      //不数据点标记
      showSymbol: false,
      //数据
      data: generateData(func1, -Math.PI, Math.PI, 0.05)
    },
    {
      name: 'y=cos(x)',
      type: 'line',
      showSymbol: false,
      data: generateData(func2, -Math.PI, Math.PI, 0.05)
    },
    {
      name: 'y=f(x)',
      type: 'line',
      showSymbol: false,
      data: generateData(func3, -Math.PI, Math.PI, 0.05)
    }
  ]
}

```

:::
