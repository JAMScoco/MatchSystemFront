<template>
  <div>
    <div>
      <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="12">
          <div>
            <el-row>
              <el-col :span="20">
                <el-form v-model="props.form">
                  <el-form-item label="每个作品的评审人数：">
                    <el-input-number v-model="props.form.reviewNumber" :min="0" :max="20"/>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" @click="addReviewNumber">保存</el-button>
              </el-col>
            </el-row>
          </div>
          <div>
            <p>请为当前赛事设置评审模板</p>
            <el-tree
                :data="trackList"
                default-expand-all
                :expand-on-click-node="false">
              <template #default="{ node, data }">
            <span class="custom-tree-node">
              <span>{{ data.name }}</span>
              <span>
                <el-button size="small" type="info" :icon="Edit" circle v-if="node.level === 3" style="margin-left: 8px"
                           @click="pushEditTemplate(data.id)"/>
              </span>
            </span>
              </template>
            </el-tree>
          </div>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import {getCurrentInstance, onMounted} from "vue";
import {Edit} from '@element-plus/icons-vue'
import {getTrackInfoWithoutCategory} from "../../../api/match/track/track";
import {updateMatch} from "../../../api/match/history/match";


const props = defineProps({
  form: [Object]
})

function addReviewNumber() {
  updateMatch(props.form).then(res => {
    console.log(res)
    if (res) {
      console.log(333)
      proxy.$message.success(res.msg)
    } else {
      console.log(666)
      proxy.$message.error(res.msg)
    }
  })
}

const trackList = ref([])
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

onMounted(() => {
  getList()
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
