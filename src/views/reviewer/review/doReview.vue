<template>
  <div class="app-container">
    <el-table v-loading="loading" :data="reviewTemplate" stripe v-if="false">
      <el-table-column type="index" label="序号" width="55" align="center"/>
      <el-table-column label="评审要点" align="center" prop="keyPoints" width="150"/>
      <el-table-column label="评审内容">
        <template #default="scope">
          <div v-html="scope.row.content"></div>
        </template>
      </el-table-column>
      <el-table-column label="分值" align="center" prop="score" width="100"/>
      <el-table-column label="打分" align="center" prop="score" width="300">
        <template #default="scope">
          <!--          <el-input-number v-model="scope.row.goal" :max="scope.row.score" :min="0" :step="2" />-->
          <el-slider v-model="scope.row.goal" :max="scope.row.score" :min="0" show-input size="small"/>
        </template>
      </el-table-column>
    </el-table>
    <br>
    <el-row>
      <el-col :span="8" :offset="8">
        评审意见（选填）：
        <el-input v-model="remark" :rows="4" type="textarea"/>
      </el-col>
    </el-row>
    <br>
    <el-row>
      <el-col :span="8" :offset="8">
        <el-slider v-model="totalGoal" :max="100" :min="0" show-input size="small"/>
        总分：{{ totalGoal }}
      </el-col>
    </el-row>

    <br>
    <el-row>
      <el-col :span="3" :offset="10">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="back">返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import {computed, getCurrentInstance, markRaw, ref} from "vue";

import {getReviewTemplate, submitScore} from "@/api/works/score";
import {ElMessage, ElMessageBox} from "element-plus";
import {Delete} from "@element-plus/icons-vue";
import {delTrack} from "@/api/match/track/track";

const router = useRouter()
const {proxy} = getCurrentInstance()

const loading = ref(true);
const remark = ref('');

const id = router.currentRoute.value.query.id

const reviewTemplate = ref([])

getReviewTemplate(id).then(res => {
  reviewTemplate.value.push(...res.data)
  loading.value = false
})

// const totalGoal = computed(() => {
//   let total = 0;
//   reviewTemplate.value.forEach(item => {
//     let t = item.goal === undefined ? 0 : item.goal
//     total += t
//   })
//   return total
// })
const totalGoal = ref(0)

function submit() {
  ElMessageBox.confirm(
      `您为该作品评审总分为${totalGoal.value}分，一旦提交无法修改，确定提交吗？`,
      '提示',
      {
        confirmButtonText: '提交',
        cancelButtonText: '再想想',
        type: 'warning'
      }
  ).then(() => {
    doSubmit()
  })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消',
        })
      })

}

function doSubmit() {
  let data = {}
  data.total = totalGoal.value
  let details = []
  reviewTemplate.value.forEach(item => {
    let i = {
      templateId: item.id,
      goal: item.goal === undefined ? 0 : item.goal
    }
    details.push(i)
  })
  data.details = details
  data.remark = remark.value
  submitScore({id: id, details: JSON.stringify(data)}).then(res => {
    back()
  })

}

function back() {
  proxy.$tab.closePage(router.currentRoute.value)
  router.back()
}
</script>

<style scoped>

</style>