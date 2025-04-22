<script setup lang="ts">
import { computed } from 'vue'
import { Chart as ChartJS, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

const data = defineModel('data')
// const testData =
//   [{ x: 26, y: 1078000 },
//   { x: 27, y: 1160180 },
//   { x: 28, y: 1246752 },
//   { x: 29, y: 1337938 },
//   { x: 30, y: 1433972 },
//   { x: 31, y: 1535098 },
//   { x: 32, y: 1641576 },
//   { x: 33, y: 1753675 },
//   { x: 34, y: 1861178 },
//   { x: 35, y: 1974360 },
//   { x: 36, y: -22211 },
//   { x: 37, y: -18302 },
//   { x: 38, y: -13885 },
//   { x: 39, y: -8931 },
//   { x: 40, y: -3411 },
//   { x: 41, y: 2706 },
//   { x: 42, y: 9455 },
//   { x: 43, y: 16869 },
//   { x: 44, y: 24986 },
//   { x: 45, y: 33843 },
//   { x: 46, y: 43482 },
//   { x: 47, y: 53944 },
//   { x: 48, y: 65275 },
//   { x: 49, y: 77520 },
//   { x: 50, y: 90730 },
//   { x: 51, y: 104955 },
//   { x: 52, y: 120252 },
//   { x: 53, y: 136675 },
//   { x: 54, y: 154286 },
//   { x: 55, y: 173148 },
//   { x: 56, y: 203826 },
//   { x: 57, y: 236415 },
//   { x: 58, y: 271016 },
//   { x: 59, y: 307731 },
//   { x: 60, y: 346671 },
//   { x: 61, y: 387950 },
//   { x: 62, y: 431690 },
//   { x: 63, y: 478018 },
//   { x: 64, y: 527067 },
//   { x: 65, y: 527382 },
//   { x: 66, y: 543330 },
//   { x: 67, y: 559970 },
//   { x: 68, y: 577337 },
//   { x: 70, y: 614394 },
//   { x: 71, y: 634160 },
//   { x: 72, y: 654805 },
//   { x: 73, y: 676371 },
//   { x: 74, y: 698904 },
//   { x: 75, y: 722451 },
//   { x: 76, y: 747061 },
//   { x: 77, y: 772786 },
//   { x: 78, y: 799682 },
//   { x: 79, y: 827805 },
//   { x: 80, y: 857215 },
//   { x: 81, y: 887976 },
//   { x: 82, y: 920154 },
//   { x: 83, y: 953819 },
//   { x: 84, y: 989044 },
//   { x: 85, y: 1025905 }]
const chartOptions = {
  scales: {
    x: {
      title: {
        display: true,
        text: "年齡",
        font: {
          size: 18
        },
      },
      type: 'linear',
      position: 'bottom'
    }, y: {
      title: {
        display: true,
        text: "投資總額",
        font: {
          size: 18
        },
      }, ticks: {
        callback: function (value: number) {
          const new_value = Math.round((value / 10000) * 10) / 10
          return new_value + " 萬";
        }
      }
    }
  }, plugins: {
    title: {
      display: true,
      text: '隨著年紀改變的投資總額',
      font: {
        weight: "bold",
        size: 22
      },
    }, tooltip: {
      enabled: true,
      callbacks: {
        label: function (tooltipData: { parsed: { x: number; y: number } }) {
          const year = tooltipData.parsed.x
          const value = tooltipData.parsed.y
          const new_value = Math.round((value / 10000) * 10) / 10
          return ` ${year} 歲時有 ${new_value} 萬元的投資`;
        },
      },
    }, annotation: {
      annotations: {
        line1: {
          type: 'line',
          yMin: 0,
          yMax: 0,
          borderColor: 'rgba(255,193,7, 0.4)',
          borderWidth: 4,
        }
      }
    },
  }
}

const chartData = computed(() => ({
  datasets: [{
    label: '當年度投資總額',
    data: data.value,
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: "rgba(255, 99, 132, 0.2)",
    showLine: true,
  }],
}));

ChartJS.register(...registerables, annotationPlugin);
</script>

<template>
  <div class="w-[1024px]">
    <Chart type="scatter" :data="chartData" :options="chartOptions" />
  </div>
</template>

<style scoped></style>
