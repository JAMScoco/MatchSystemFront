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
                <el-button size="small" type="primary" :icon="Plus" circle v-if="node.level === 2"
                           @click="showGroupOrCategoryDialog(data)"/>
                <el-button size="small" type="info" :icon="Edit" circle v-if="node.level !== 2" style="margin-left: 8px"
                           @click="showEditDialog(node)"/>
                <el-button size="small" type="danger" :icon="Delete" circle v-if="node.level !== 2"
                           style="margin-left: 8px" @click="remove(node)"/>
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
import {getTrackInfo} from "@/api/match/track/track";
import {onMounted} from "vue";
import {Delete, Edit, Plus} from '@element-plus/icons-vue'

const props = defineProps({
  form: [Object]
})

const trackList = ref([])

/** 查询赛道组别类别列表 */
function getList() {
  getTrackInfo().then(res => {
    trackList.value = res.data
  })
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
