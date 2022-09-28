<template>
  <div>
    <div>
      <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="12">
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


const props = defineProps({
  form: [Object]
})

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
function pushEditTemplate(id){
  router.push("/match/editTemplate?group_id="+id)
}

onMounted(()=>{
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
