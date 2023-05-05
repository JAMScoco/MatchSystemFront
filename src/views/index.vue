<template>
  <div class="app-container">
    <div v-hasRole="['department']">
      <el-row>
        <el-col :span="8" :offset="6">
          作品推荐人数设置：
          <el-input-number v-model="recommendNumber"/>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="saveRecommendNum">保存</el-button>
        </el-col>
      </el-row>
    </div>
    <div v-hasRole="['review']">
      <h1 style="text-align: center">当前评审任务</h1>
      <el-row>
        <el-col :span="3" :offset="6">
          <h3 style="text-align: center">院系评审任务</h3>
          <div v-if="reviewInfo.allCountDept !== 0">
            <br>
            <el-progress type="dashboard"
                         :percentage="(reviewInfo.finishCountDept / reviewInfo.allCountDept * 100).toFixed(2)">
              <template #default="{ percentage }">
                <span class="percentage-value">{{ percentage }}%</span>
                <span class="percentage-label">{{ reviewInfo.finishCountDept }}/{{ reviewInfo.allCountDept }}</span>
              </template>
            </el-progress>
            <p>截止时间{{reviewInfo.endTimeSchool}}</p>
          </div>
          <div v-else>
            <el-empty description="暂无评审任务" :image-size="100"/>
          </div>
        </el-col>
        <el-col :span="3" :offset="6">
          <h3 style="text-align: center">校级评审任务</h3>
          <div v-if="reviewInfo.allCountSchool !== 0">
            <br><br><br>
            <el-progress type="dashboard"
                         :percentage="(reviewInfo.finishCountSchool / reviewInfo.allCountSchool * 100).toFixed(2)">
              <template #default="{ percentage }">
                <span class="percentage-value">{{ percentage }}%</span>
                <span class="percentage-label">{{ reviewInfo.finishCountSchool }}/{{ reviewInfo.allCountSchool }}</span>
              </template>
            </el-progress>
            <p>截止时间{{reviewInfo.endTimeSchool}}</p>
          </div>
          <div v-else>
            <el-empty description="暂无评审任务" :image-size="100"/>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import {getCurrentInstance, reactive, ref} from "vue";
import {queryRecommendNum, submitRecommendNum} from "@/api/match/history/match";
import {indexInfo} from "@/api/works/score";

const {proxy} = getCurrentInstance()

const recommendNumber = ref(0)

function getRecommendNum() {
  queryRecommendNum().then(res => {
    recommendNumber.value = res.data
  })
}

function saveRecommendNum() {
  submitRecommendNum({quota: recommendNumber.value}).then(res => {
    if (res.code === 200) {
      proxy.$message.success(res.msg)
    } else {
      proxy.$message.error(res.msg)
    }
  })
}

const reviewInfo = reactive({
  allCountDept: 0,
  allCountSchool: 0,
  finishCountDept: 0,
  finishCountSchool: 0,
  endTimeDept: '',
  endTimeSchool: '',
})

function init() {
  getRecommendNum()
  indexInfo().then(res => {
    reviewInfo.allCountDept = res.data.allCountDept
    reviewInfo.allCountSchool = res.data.allCountSchool
    reviewInfo.finishCountDept = res.data.finishCountDept
    reviewInfo.finishCountSchool = res.data.finishCountSchool
    reviewInfo.endTimeDept = res.data.endTimeDept
    reviewInfo.endTimeSchool = res.data.endTimeSchool
  })
}

init()

</script>

<style scoped lang="scss">
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>

