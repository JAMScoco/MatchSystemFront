<template>
  <div>
    <div>
      <el-row>
        <el-col :span="2"></el-col>
        <el-col :span="20">
          <div>
            <el-divider>评审参数设置</el-divider>
            <p style="font-weight: bold;font-size: large">提示：设置完成后请点击保存按钮</p>
            <el-row>
              <el-col :span="8" :offset="6">
                <el-form v-model="props.form">
                  <el-form-item label="每个作品的评审人数：">
                    <el-input-number v-model="props.form.reviewNumber" :min="0" :max="50"/>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" @click="addReviewNumber">保存</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" :offset="6">
                <el-form>
                  <el-form-item label="每位评委评审任务数：">
                    <el-input-number v-model="recommendNumber" :min="0" :max="50"/>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="2">
                <el-button type="primary" @click="saveRecommendNum">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-divider>评审模板设置</el-divider>
            <p>请为当前赛事设置评审模板</p>
            <el-tree
                :data="trackList"
                default-expand-all
                :expand-on-click-node="false">
              <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span>{{ data.name }}</span>
              <span>
                <el-tag size="small" type = 'success' v-if="node.level === 3 && data.hasTemplate">已设置</el-tag>
                <el-button size="small" type="info" :icon="Edit" circle v-if="node.level === 3" style="margin-left: 8px"
                           @click="pushEditTemplate(data.id)"/>
              </span>
            </span>
              </template>
            </el-tree>
          </div>
        </el-col>
        <el-col :span="2"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import {getCurrentInstance, onMounted} from "vue";
import {Edit} from '@element-plus/icons-vue'
import {getTrackInfoWithoutCategory} from "../../../api/match/track/track";
import {queryRecommendNum, submitRecommendNum, updateMatch} from "../../../api/match/history/match";


const props = defineProps({
  form: [Object]
})

function addReviewNumber() {
  updateMatch(props.form).then(res => {
    if (res) {
      proxy.$message.success(res.msg)
    } else {
      proxy.$message.error(res.msg)
    }
  })
}

const trackList = ref([])
const recommendNumber = ref(0)


const {proxy} = getCurrentInstance()

const router = useRouter()


/** 查询赛道组别类别列表 */
function getList() {
  getTrackInfoWithoutCategory().then(res => {
    trackList.value = res.data
  })
}

//修改按钮
function pushEditTemplate(id) {
  router.push("/match/editTemplate?group_id=" + id)
}

function getRecommendNum() {
  queryRecommendNum().then(res => {
    recommendNumber.value = res.data
  })
}

function saveRecommendNum() {
  submitRecommendNum({quota:recommendNumber.value}).then(res=>{
    if(res.code === 200){
      proxy.$message.success(res.msg)
    } else {
      proxy.$message.error(res.msg)
    }
  })
}

onMounted(() => {
  getList()
  getRecommendNum()
})

</script>

<style scoped>

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;

}
</style>
