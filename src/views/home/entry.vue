<template>
  <div class="radar">
    <h1 class="radar-title">雷达维度图 <a class="title-link" href="https://github.com/lceric/radar-creator" target="_blank">github源码</a> </h1>
    <Radar :options="options" :theme="theme"></Radar>
    <el-form class="radar-form" :model="options" label-width="80px">
      <!-- label-position="" -->
      <el-form-item label="图表名">
        <el-input v-model="options.title"></el-input>
      </el-form-item>
      <div class="form-row" v-for="(v, idx) in options.indicator" :key="idx">
        <el-form-item label="标题">
          <el-input v-model="v.text"></el-input>
        </el-form-item>
        <el-form-item label="数据">
          <el-input-number v-model="v.value" placeholder=""></el-input-number>
        </el-form-item>
        <el-form-item label="最大值">
          <el-input-number v-model="v.max" placeholder=""></el-input-number>
        </el-form-item>
      </div>
      <el-form-item label="主题">
        <el-radio v-model="theme" label="default"></el-radio>
        <el-radio v-model="theme" label="walden"></el-radio>
        <el-radio v-model="theme" label="macarons"></el-radio>
        <el-radio v-model="theme" label="westeros"></el-radio>
        <el-radio v-model="theme" label="wonderland"></el-radio>
      </el-form-item>
      <el-form-item label="tooltip">
        <el-input v-model="options.dataName"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Radar from './components/Radar.vue'
export default {
  components: { Radar },
  data() {
    return {
      options: {
        title: '雷达维度图',
        indicator: [
          { text: '健康成长', max: 100, value: 60 },
          { text: '激发兴趣', max: 100, value: 70 },
          { text: '提高成绩', max: 100, value: 80 },
        ],
        dataName: '三维',
      },
      theme: 'default',
    }
  },
  methods: {
    routerToGithub() {
      window.open('')
    }
  }
}
</script>
<style scoped>
.radar {
  /* display: flex; */
}
.radar-title {
  font-size: 26px;
}
.title-link {
  font-size: 18px;
}
.radar-form {
  width: 750px;
}
.form-row {
  display: flex;
  justify-content: space-between;
}
</style>
