<template>
  <div class="app-container">
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
      <el-table-column label="平均分" align="center" prop="departmentAverageScore" width="100"/>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button size="small" icon="Link"
                     @click="worksInfo(scope.row.id)"
                     type="primary" plain>作品详情
          </el-button>
          <el-button size="small" icon="Link"
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
          <el-button size="small"
                     type="success" icon="Position">推荐
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {getReviewResult, moveSort} from "@/api/works/work";
import {ElMessageBox} from "element-plus";
import {getCurrentInstance, ref} from "vue";
import {useRouter} from "vue-router";

const {proxy} = getCurrentInstance();
const router = useRouter()

const data = ref([])
const loading = ref(true);

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
      data.value = res.data
      loading.value = false
    }
  })
}

function moveUp(id){
  const option = {
    workId:id,
    type:'up'
  }
  moveSort(option).then(res=>{
    if(res.code === 200){
      proxy.$modal.msgSuccess("移动成功");
    }
    getData()
  })
}

function moveDown(id){
  const option = {
    workId:id,
    type:'down'
  }
  moveSort(option).then(res=>{
    if(res.code === 200){
      proxy.$modal.msgSuccess("移动成功");
    }
    getData()
  })
}


/** 查看详情操作 */
function worksInfo(id) {
  router.push("/count/workDetail?id=" + id)
}

getData()

</script>

<style scoped>

</style>