<template>
  <div class="app-container">
    <el-row>
      <el-col :offset="10" :span="8">
        <h3>已推荐/推荐名额：{{ hasRecommended }}/{{ recommendNum }}</h3>
      </el-col>
    </el-row>
    <br>
    <el-table v-loading="loading" :data="data" stripe>
      <el-table-column label="排序" width="55" align="center">
        <template #default="scope">
          {{ scope.row.schoolSort === null ? scope.row.departmentSort : scope.row.schoolSort }}
        </template>
      </el-table-column>
      <el-table-column label="作品名称" align="center" prop="name" width="150"/>
      <el-table-column label="负责人" align="center" prop="trueName" width="150"/>
      <el-table-column label="赛道" align="center" prop="trackName" width="150"/>
      <el-table-column label="组别" align="center" prop="groupName" width="150"/>
      <el-table-column label="类别" align="center" prop="categoryName" width="150"/>
      <el-table-column label="平均分" align="center" prop="departmentAverageScore" width="100">
        <template #default="scope">
          {{ scope.row.schoolAverageScore === null ? scope.row.departmentAverageScore : scope.row.schoolAverageScore }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" icon="Link"
                     @click="worksInfo(scope.row.id)"
                     type="primary" plain>作品详情
          </el-button>
          <el-button size="small" icon="Link"
                     @click="scoreDetails(scope.row.id)"
                     type="success" plain>得分详情
          </el-button>
          <el-button size="small" type="primary"
                     @click="moveUp(scope.row.id)"
                     icon="Top" round :disabled="scope.$index === 0">上移
          </el-button>
          <el-button size="small" type="primary"
                     @click="moveDown(scope.row.id)"
                     icon="Bottom" round :disabled="scope.$index === data.length - 1">下移
          </el-button>
          <el-tag style="marginLeft:10px" type="success"
                  v-if="(scope.row.schoolAverageScore === null && scope.row.state === 2) || (scope.row.state === 3)">已推荐
          </el-tag>
          <el-button size="small"
                     type="success" icon="Position"
                     v-else
                     @click="recommend(scope.row.id)">推荐
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="checkDialogShow" title="得分详情" width="40%" center @closed="resetDetails">
      <el-table :data="scoreDetailsData">
        <el-table-column label="序号" type="index" width="55" align="center"/>
        <el-table-column label="评审专家" align="center" prop="trueName" width="150"/>
        <el-table-column label="总分" align="center">
          <template #default="scope">
            {{ JSON.parse(scope.row.scoreDetail).total}}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup>
import {getReviewResult, moveSort, recommendWork} from "@/api/works/work";
import {getGoalDetail} from "@/api/works/score";
import {ElMessageBox} from "element-plus";
import {getCurrentInstance, ref} from "vue";
import {useRouter} from "vue-router";
import {queryRecommendNum} from "@/api/match/history/match";

const {proxy} = getCurrentInstance();
const router = useRouter()

const data = ref([])
const loading = ref(true);

const recommendNum = ref(0)
const hasRecommended = ref(0)

function getData() {
  loading.value = true
  data.value.length = 0
  getReviewResult().then(res => {
    if (res.msg !== 'ok') {
      ElMessageBox.alert(res.msg, "提示", {
        type: 'error',
        showClose: false,
        callback: () => {
          proxy.$tab.closePage(router.currentRoute.value)
          router.push('/index')
        }
      })
    } else {
      data.value = res.data.result
      hasRecommended.value = res.data.hasRecommended
      loading.value = false
    }
  })
  queryRecommendNum().then(res => {
    recommendNum.value = res.data
  })
}

function moveUp(id) {
  const option = {
    workId: id,
    type: 'up'
  }
  moveSort(option).then(res => {
    if (res.code === 200) {
      proxy.$modal.msgSuccess("移动成功");
    }
    getData()
  })
}

function moveDown(id) {
  const option = {
    workId: id,
    type: 'down'
  }
  moveSort(option).then(res => {
    if (res.code === 200) {
      proxy.$modal.msgSuccess("移动成功");
    }
    getData()
  })
}

function recommend(id) {
  recommendWork(id).then(res => {
    if (res.code === 200) {
      proxy.$modal.msgSuccess("推荐成功");
    }
    getData()
  })
}

/** 查看作品详情操作 */
function worksInfo(id) {
  router.push("/count/workDetail?id=" + id)
}

const checkDialogShow = ref(false)
const scoreDetailsData = ref([])

function resetDetails() {
  checkDialogShow.value = false
  scoreDetailsData.value.length = 0
}

function scoreDetails(id) {
  getGoalDetail(id).then(res => {
    scoreDetailsData.value.push(...res.data)
    checkDialogShow.value = true
  })
}

getData()

</script>

<style scoped>

</style>