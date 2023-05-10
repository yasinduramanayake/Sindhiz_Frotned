<script>
import Vue from "vue";
import { Line } from "vue-chartjs";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { hexToRgba } from "@coreui/coreui-pro/dist/js/coreui-utilities";

export default {
  components: {
    hexToRgba,
    CustomTooltips
  },
  extends: Line,
  props: {
    chartdata: {
      type: Array,
      default: null
    },
    reportType: {
      type: String,
      default: "Month"
    }
  },
  data: function() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: true,
        tooltips: {
          enabled: false,
          custom: CustomTooltips,
          intersect: true,
          mode: "point",
          position: "nearest",
          callbacks: {
            labelColor: function(tooltipItem, chart) {
              return {
                backgroundColor:
                  chart.data.datasets[tooltipItem.datasetIndex].borderColor
              };
            }
          }
        }
      }
    };
  },
  mounted() {
    let rangeData = [];
    if (this.reportType == "Week") {
      rangeData = _.range(1, 53);
    } else if (this.rangeData == "Month") {
      rangeData = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
    } else {
      rangeData = _.range(2018, this.$moment().year() + 1);
    }
    let datacollection = {
      labels: Vue._.slice(rangeData, 0, this.chartdata.length),
      datasets: [
        {
          label: "Income",
          borderColor: hexToRgba("#E46651", 90),
          fill: false,
          data: Vue._.map(this.chartdata, item => item.income)
        },
        {
          label: "Expense",
          borderColor: hexToRgba("#00D8FF", 90),
          fill: false,
          data: Vue._.map(this.chartdata, item => item.expense)
        }
      ],
      data: this.chartdata
    };
    this.renderChart(datacollection, this.options);
  }
};
</script>
