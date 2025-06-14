<template>
  <div class="app-container">
    <el-row>
      <el-col :span="18" :offset="3">
        <h1 style="text-align: center">评审情况</h1>
        <el-switch v-model="switchShow" inactive-text="显示全部" active-text="仅显示未评分" @change="init"/>
        <el-divider/>
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
                <el-tag class="mx-1" size="large" type="success"
                        v-if="scope.row['score' + index].scoreDetail !== null && !switchShow">
                  已评分
                </el-tag>
                <el-tag class="mx-1" size="large" type="danger" v-if="scope.row['score' + index].scoreDetail === null">
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
import {checkCanAssign} from "@/api/school/reviewer";

const {proxy} = getCurrentInstance();
const router = useRouter()

const target = ref([])
const heads = ref([])

const switchShow = ref(false)

function init() {
  checkCanAssign().then(res => {
    if (res.msg === 'ok' || res.msg ==='还有作品国家报名截图未审核') {
      ElMessageBox.alert('暂未生成评审任务', "提示", {
        type: 'error',
        showClose: false,
        callback: () => {
          proxy.$tab.closePage(router.currentRoute.value)
          router.push('/index')
        }
      })
    } else {
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
          target.value.length = 0
          heads.value.length = 0
          target.value.push(...res.data.target)
          heads.value.push(...res.data.heads)
        }
      })
    }
  })
}

init()
</script>

<style scoped>

</style>
