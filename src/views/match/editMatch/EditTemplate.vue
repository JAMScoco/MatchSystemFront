<template>
  <div>
    <div class="app-container">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
              type="primary"
              plain
              icon="Plus"
              @click="handleAdd"
              v-hasPermi="['match:history:edit']">新增
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button
              type="danger"
              plain
              icon="Delete"
              :disabled="multiple"
              @click="handleDelete"
              v-hasPermi="['match:history:edit']">删除
          </el-button>
        </el-col>
        <el-col :span="1.5">
        </el-col>
      </el-row>
      <el-table v-loading="loading" :data="templateList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column label="评审要点" align="center" prop="keyPoints"/>
        <el-table-column label="分值" align="center" prop="score"/>
        <el-table-column label="备注" align="center" prop="remark"/>
        <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-button
                type="text"
                icon="Edit"
                @click="handleUpdate(scope.row)"
                v-hasPermi="['match:history:edit']"
            >修改
            </el-button>
            <el-button
                type="text"
                icon="Delete"
                @click="handleDelete(scope.row)"
                v-hasPermi="['match:history:edit']"
            >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <!-- 添加或修改评审模板对话框 -->
      <el-dialog :title="title" v-model="open" width="500px" append-to-body>
        <el-form ref="templateRef" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="评审要点" prop="keyPoints">
            <el-input v-model="form.keyPoints" placeholder="请输入评审要点" />
          </el-form-item>
          <el-form-item label="评审内容" prop="content">
            <el-input v-model="form.content" type="textarea" rows="7"/>
          </el-form-item>
          <el-form-item label="分值" prop="score">
            <el-input-number v-model="form.score" :min="1" :max="100" :step="10" placeholder="请输入分值" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
    <div style="text-align: center">
      <el-button type="primary" plain @click="close">返回</el-button>
    </div>
  </div>
</template>

<script setup>
import {
  addTemplate,
  delTemplate,
  getTemplate,
  listTemplate,
  updateTemplate
} from "../../../api/match/template/template";

const router = useRouter()
const group_id = router.currentRoute.value.query.group_id

const { proxy } = getCurrentInstance();

const templateList = ref([]);
const open = ref(false);
const loading = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  rules: {
    keyPoints: [
      { required: true, message: "评审要点不能为空", trigger: "blur" }
    ],
    content: [
      { required: true, message: "评审内容不能为空", trigger: "blur" }
    ],
    score: [
      { required: true, message: "分值不能为空", trigger: "blur" }
    ],
  }
});

const { form, rules } = toRefs(data);


/** 查询评审模板列表 */
function getList() {
  loading.value = true;
  let template = {groupId:group_id}
  listTemplate(template).then(response => {
    templateList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    groupId: null,
    keyPoints: null,
    content: null,
    score: 20,
    delFlag: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null
  };
  proxy.resetForm("templateRef");
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加评审模板";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getTemplate(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改评审模板";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["templateRef"].validate(valid => {
    if (valid) {
      form.value.groupId = group_id
      if (form.value.id != null) {
        updateTemplate(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addTemplate(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除所选评审模板的数据项？').then(function() {
    return delTemplate(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

function close() {
  sessionStorage.setItem('activeName','5')
  proxy.$tab.closePage(router.currentRoute.value)
  router.push('/match/editMatch')
}


getList();
</script>

<style scoped>

</style>
