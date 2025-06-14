<template>
  <div>
    <el-row>
      <el-col :span="10" :offset="2">
        <h1 style="text-align: center">大赛动态</h1>
        <el-row v-for="item in schoolNews" :key="item.id" @click="router.push(`/home/newsDetail/${item.id}`)">
          <el-col :span="18">
            <p style="text-align: center;color: #20a0ff">{{item.title}}</p>
          </el-col>
          <el-col :span="6">
            <p style="text-align: center;color: #99a9bf">{{item.createTime}}</p>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="10">
        <h1 style="text-align: center">学院动态</h1>
        <el-row v-for="item in deptNews" :key="item.id" @click="router.push(`/home/newsDetail/${item.id}`)">
          <el-col :span="18">
            <p style="text-align: center;color: #20a0ff">{{item.title}}</p>
          </el-col>
          <el-col :span="6">
            <p style="text-align: center;color: #99a9bf">{{item.createTime}}</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {getAllNews} from "@/api/school/news";
import {ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter()

const schoolNews = ref([])
const deptNews = ref([])

function init() {
  getAllNews().then(res=>{
    schoolNews.value.length = 0
    deptNews.value.length = 0
    schoolNews.value.push(...res.data.schoolNews)
    deptNews.value.push(...res.data.deptNews)
    console.log(deptNews.value)
  })
}

init()
</script>

<style scoped>

</style>
