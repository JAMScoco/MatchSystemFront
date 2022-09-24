<template>
  <div>
    <div>
      <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="12">
          <p>请为当前赛事设置赛道组别</p>
          <el-button type="primary" @click="showTrackDialog">增加赛道</el-button>
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
    <div>
      <!--添加或修改赛道对话框-->
      <el-dialog :title="title" v-model="open" width="500px">
        <el-form ref="trackRef" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="赛道名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入赛道名称"/>
          </el-form-item>
          <el-form-item label="奖项设置" prop="award">
            <el-input v-model="form.award" type="textarea" rows="6" placeholder="请输入内容"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <div>
      <!-- 添加或修改组别对话框 -->
      <el-dialog :title="title" v-model="openGroupDialog" width="500px">
        <el-form ref="groupRef" :model="group" :rules="rules" label-width="80px">
          <el-form-item label="组别名称" prop="groupName">
            <el-input v-model="group.name" placeholder="请输入组别名称"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="group.remark" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <div>
      <!-- 添加或修改类别对话框 -->
      <el-dialog :title="title" v-model="openCategoryDialog" width="500px">
        <el-form ref="categoryRef" :model="category" :rules="rules" label-width="80px">
          <el-form-item label="类别名称" prop="categoryName">
            <el-input v-model="category.name" placeholder="请输入类别名称"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="category.remark" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>

import {getCurrentInstance, onMounted, reactive} from "vue";
import {addTrack, delTrack, getTrack, getTrackInfo, updateTrack} from "../../../api/match/track/track";
import {Delete, Edit, Plus,} from '@element-plus/icons-vue'
import {addGroup, delGroup, getGroup} from "../../../api/match/group/group";
import {delCategory, getCategory} from "../../../api/match/category/category";
import {ElMessage} from "element-plus";

const {proxy} = getCurrentInstance()

const trackList = ref([]);
const open = ref(false);
const openGroupDialog = ref(false);
const openCategoryDialog = ref(false);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
  },
  rules: {
    name: [{required: true, message: "赛道名称不能为空！", trigger: 'blur'}],
    award: [{required: true, message: "奖项设置不能为空！", trigger: 'blur'}],
    groupName: [{required: true, message: "组别名称不能为空！", trigger: 'blur'}],
    categoryName: [{required: true, message: "类别名称不能为空！", trigger: 'blur'}]

  },
  group: {},
  category: {}
})

const {form, queryParams, rules, group, category} = toRefs(data)

/** 点击增加赛道按钮  */
function showTrackDialog() {
  resetTrackFrom();
  open.value = true;
  title.value = "添加赛道相关信息";
}

/** 查询赛道组别类别列表 */
function getList() {
  getTrackInfo().then(res => {
    trackList.value = res.data
  })
}

//点击添加按钮展示添加对话框
function showGroupOrCategoryDialog(data) {
  if (data.name === '组别') {
    resetGroupFrom()
    openGroupDialog.value = true
    title.value = '添加组别'
  } else {
    resetCategoryFrom()
    openCategoryDialog.value = true
    title.value = '添加类别'
  }
}

//点击修改按钮 展示对话框
function showEditDialog(node) {
  if (node.level === 1) {
    resetTrackFrom();
    getTrack(node.data.id).then(res => {
      form.value = res.data
    })
    open.value = true;
    title.value = "修改赛道相关信息";
  }
  if (node.level === 3) {
    console.log(node)
    if (node.parent.data.name === '组别') {
      resetGroupFrom()
      getGroup(node.data.id).then(res => {
        group.value = res.data
      })
      openGroupDialog.value = true
      title.value = '修改组别'
    } else {
      resetCategoryFrom()
      getCategory(node.data.id).then(res => {
        category.value = res.data
      })
      openCategoryDialog.value = true
      title.value = '修改类别'
    }
  }
}

function addGroupOrCategory() {

}

//处理返回结果
function handleResult(res){
  if (res.code === 200) {
    ElMessage({
      message: res.msg,
      type: 'success',
    })
  } else {
    ElMessage({
      message: res.msg,
      type: 'error',
    })
  }
  getList()
}
//删除按钮
const remove = (node) => {
  if (node.level === 1) {
    delTrack(node.data.id).then(res => {
      handleResult(res)
    })
  }
  if (node.level === 3) {
    console.log(node)
    if (node.parent.data.name === '组别') {
      delGroup(node.data.id).then(res => {
        handleResult(res)
      })
    } else {
      delCategory(node.data.id).then(res=>{
        handleResult(res)
      })
    }
  }

}





// 取消按钮
function cancel() {
  open.value = false
  openGroupDialog.value = false
  openCategoryDialog.value = false
  resetTrackFrom()
  resetGroupFrom()
  resetCategoryFrom()
}

// 赛道表单重置
function resetTrackFrom() {
  form.value = {
    id: null,
    name: null,
    matchId: null,
    award: null,
    remark: null
  };
}

// 组别表单重置
function resetGroupFrom() {
  group.value = {
    id: null,
    name: null,
    matchId: null,
    remark: null
  };
}

// 类别表单重置
function resetCategoryFrom() {
  category.value = {
    id: null,
    name: null,
    matchId: null,
    remark: null
  };
}


/** 提交按钮 */
function submitForm() {
  proxy.$refs["trackRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateTrack(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addTrack(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
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