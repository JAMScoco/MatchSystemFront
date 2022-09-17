<template>
  <div>
    首页
    <el-button @click="toNews">点击</el-button>
  </div>
</template>

<script setup>

import {useRouter} from "vue-router";

const router = useRouter()


function toNews() {
  console.log(router)
  router.push('/home/news')
}
</script>

<style scoped>

</style>
