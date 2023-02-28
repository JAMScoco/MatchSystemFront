<template>
  <div class="app-container">
    <el-row>
      <el-col :span="18" :offset="3">
        <h1 style="text-align: center">评审情况</h1>
        <el-table style="width: 100%" :data="target" border>
          <el-table-column label="参赛作品" width="180">
            <template #default="scope">
              {{ scope.row.work }}
            </template>
          </el-table-column>
          <template v-for="(item,index) in heads">
            <el-table-column :label="'分数'+(index+1)">
              <template #default="scope">
                评审人：{{ scope.row['score' + index].trueName }}&nbsp;&nbsp;
                <el-tag class="mx-1" size="large" type="success" v-if="scope.row['score' + index].scoreDetail !== null">
                  已评分
                </el-tag>
                <el-tag class="mx-1" size="large" type="danger" v-else>
                  未评分
                </el-tag>
              </template>
            </el-table-column>
          </template>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {getCurrentInstance, ref} from "vue";
import {ElMessageBox} from "element-plus";
import {getScoreDetails} from "@/api/works/score";
import {useRouter} from "vue-router";

const {proxy} = getCurrentInstance();
const router = useRouter()

const target = ref([])
const heads = ref([])

function init() {
  getScoreDetails().then(res => {
    if (res.code === 500) {
      ElMessageBox.alert("当前没有进行中的赛事", "提示", {
        type: 'error',
        showClose: false,
        callback: () => {
          proxy.$tab.closePage(router.currentRoute.value)
          router.push('/index')
        }
      })
    } else {
      target.value.push(...res.data.target)
      heads.value.push(...res.data.heads)
    }
  })
}

init()
</script>

<style scoped>

</style>
