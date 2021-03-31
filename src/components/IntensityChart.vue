<script lang="ts">
import { Pie } from 'vue3-chart-v2'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IntensityChart',
  extends: Pie,
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      required: false,
    },
  },
  mounted() {
    this.renderChart(this.chartData, this.chartOptions)
  },
})
</script>
