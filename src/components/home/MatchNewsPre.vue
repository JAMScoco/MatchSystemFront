<template>
  <div class="father">
    <el-row>
      <el-col :span="10">
<!--        <el-image :src="baseUrl+news.picture" fit="cover" style="width: 130px;height: 130px;margin-top: 10%"/>-->
        <div class="image" :style="{background: `no-repeat center/100% url(${baseUrl}${news.picture})`}"></div>
      </el-col>
      <el-col :span="10" :offset="2">
        <div style="padding-right: 10%;padding-left: 10%">
          <p class="text_main">{{ news.title }}</p>
          <p style="font-size: x-small">{{ news.title }}</p>
          <p style="font-size: xx-small;color: #99a9bf">{{ news.createTime }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
const baseUrl = import.meta.env.VITE_APP_BASE_API;
const props = defineProps({
  news: [Object],
})

</script>

<style scoped>
.father {
  width: 400px;
  height: 150px;
}
.text_main{
  font-weight: bolder;
}
p{
  overflow: hidden;
  /*  超出的文本隐藏 */
  display: -webkit-box;
  /* 将对象作为弹性伸缩盒子模型显示。 */
  -webkit-line-clamp: 2;
  /* 这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。 */
  -webkit-box-orient: vertical;
  /* 从上到下垂直排列子元素（设置伸缩盒子的子元素排列方式） */
}
.image {
  width: 100%;
  display: block;
  padding-top: 90%;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 20px;
}
</style>
