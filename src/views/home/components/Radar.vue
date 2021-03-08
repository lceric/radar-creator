<template>
  <div ref="chartDom" class="chart-dom"></div>
</template>
<script>
import axios from 'axios'
import * as echarts from 'echarts'

export default {
  props: {
    options: Object,
    theme: {
      type: String,
      default: 'walden',
    },
  },
  data() {
    return {
      chart: null,
    }
  },
  watch: {
    options: {
      handler(v) {
        if (v) this.updateOption(v)
      },
      deep: true,
    },
    theme(v) {
      this.changeTheme(v)
    },
  },
  created() {
    this.__chartOpts = this.getOptions()
  },
  mounted() {
    this.changeTheme('default')
  },
  methods: {
    initChart(force) {
      const el = this.$refs.chartDom
      if (force) {
        this.chart && this.chart.dispose()
        this.chart = echarts.init(el, this.theme)
      } else {
        this.chart = this.chart || echarts.init(el, this.theme)
      }
      let options = this.__chartOpts
      this.chart.setOption(options)
    },
    async changeTheme(tn) {
      if (tn != 'default') {
        let obj = await this.getThemeJson(tn)
        echarts.registerTheme(tn, obj)
      }
      this.initChart(true)
    },
    async getThemeJson(tn) {
      let cache = window.localStorage[tn]
      if (cache) return JSON.parse(cache)
      const { data } = await axios.get(`/echarts/theme/${tn}.json`)
      window.localStorage.setItem(tn, JSON.stringify(data))
      return data
    },
    updateOption(v) {
      let { title, indicator, dataName } = v || {}
      let data = indicator.map((itm) => itm.value)
      let opts = this.__chartOpts
      opts.title.text = title
      opts.radar[0].indicator = indicator
      opts.radar[0].radius = 180
      opts.series[0].data[0] = {
        value: data,
        name: dataName,
      }
      this.chart.setOption(opts)
    },
    getOptions() {
      let { title, indicator, dataName } = this.options || {}
      let data = indicator.map((itm) => itm.value)
      return {
        title: {
          text: title || '雷达图',
        },
        tooltip: {
          trigger: 'axis',
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {},
          },
        },
        radar: [
          {
            indicator: indicator || [],
            radius: 180,
          },
        ],
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item',
            },
            areaStyle: {},
            data: [
              {
                value: data || [],
                name: dataName || '',
              },
            ],
          },
        ],
      }
    },
  },
}
</script>
<style lang="css" scoped>
.chart-dom {
  width: 750px;
  height: 580px;
}
</style>
