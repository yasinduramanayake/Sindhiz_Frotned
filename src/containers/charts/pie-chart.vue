<script>
import { Pie } from 'vue-chartjs'
import Vue from 'vue'

export default {
  extends: Pie,
  props: {
    chartdata: {
      type: Array,
      default: null
    },
    labels: {
      type: Array,
      default: null
    },
    colors: {
      Array,
      default: null
    }
  },
  data: function () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    }
  },
  mounted () {
    let datacollection = {
      labels: this.labels,
      datasets: [
        {
          backgroundColor: this.colors,
          data: this.chartdata
        }
      ]
    }
    this.renderChart(datacollection, this.options)
  }
}
</script>
