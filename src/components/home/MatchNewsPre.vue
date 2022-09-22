<template>
  <div class="father">
    <el-row>
      <el-col :span="10">
        <img :src="news.picture" alt="">
      </el-col>
      <el-col :span="14">
        <div class="child">
          <p class="text_main">{{ news.title }}</p>
          <p style="font-size: x-small">{{ news.title }}</p>
          <p style="font-size: xx-small;color: #99a9bf">{{ news.createTime }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import ImagePreview from "@/components/ImagePreview";

const props = defineProps({
  news: [Object],
})

</script>

<style scoped>
.father {
  width: 400px;
  height: 150px;
}

img {
  width: 150px;
  height: 150px;
}

.child {
  width: 200px;
  height: 150px;
}

.text_main {
  font-size: large;
  font-weight: bold;
}
</style>
