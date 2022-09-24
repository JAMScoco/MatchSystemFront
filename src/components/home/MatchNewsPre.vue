<template>
  <div class="father">
    <el-row>
      <el-col :span="12">
        <el-image :src="news.picture" style="width: 90%;height: 80%;margin-top: 10%" alt=""/>
      </el-col>
      <el-col :span="12">
        <div style="padding-top: 5%;padding-right: 10%">
          <p class="text_main">{{ news.title }}</p>
          <p style="font-size: x-small">{{ news.title }}</p>
          <p style="font-size: xx-small;color: #99a9bf">{{ news.createTime }}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
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

</style>
