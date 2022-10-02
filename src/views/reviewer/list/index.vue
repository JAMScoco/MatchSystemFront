<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="专家姓名" prop="trueName">
        <el-input
            v-model="queryParams.trueName"
            placeholder="请输入评审专家姓名"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="phonenumber">
        <el-input
            v-model="queryParams.phonenumber"
            placeholder="请输入评审专家手机号码"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>

      <el-form-item v-hasRole="['school']" label="院系" prop="deptId">
        <el-select v-model="queryParams.deptId" placeholder="请选择院系">
          <el-option
              v-for="item in departments"
              :key="item.deptId"
              :label="item.deptName"
              :value="item.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-col :span="1.5">
          <el-button
              type="primary"
              plain
              icon="Plus"
              @click="handleAdd"
              v-hasPermi="['works:work:edit']"
          >新增
          </el-button>
        </el-col>
        <el-button
            type="warning"
            plain
            icon="Download"
            @click="handleExport"
            v-hasPermi="['works:work:export']"
        >导出到Excel
        </el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="reviewerList">
      <el-table-column type="index" label="序号" width="55" align="center"/>
      <el-table-column label="专家姓名" align="center" prop="trueName"/>
      <el-table-column label="手机号码" align="center" prop="phonenumber"/>
      <el-table-column label="所属院系" align="center" prop="deptName" v-hasRole="['school']">
        <template #default="scope">
          {{ scope.row.dept.deptName }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
              type="primary"
              icon="Edit"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['works:work:edit']">
            修改
          </el-button>
          <el-button
              type="primary"
              icon="Refresh"
              @click="resetPwd(scope.row)"
              v-hasPermi="['works:work:edit']">
            重置密码
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
        v-show="total>0"
        :total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getList"
    />

    <!--新增或修改评审专家对话框-->
    <el-dialog :title="title" v-model="open" width="600px" append-to-body>
      <h3 v-if="title === '添加评审专家'" style="text-align: center;color: red">新增专家初始密码为:{{initPwd}}</h3>
      <el-form :model="form" :rules="rules" ref="reviewerRef" label-width="120px">
        <el-form-item label="姓名" prop="trueName">
          <el-input v-model="form.trueName" placeholder="请输入评审专家姓名" maxlength="30"/>
        </el-form-item>
        <el-form-item label="手机号码" prop="phonenumber">
          <el-input v-model="form.phonenumber" placeholder="请输入评审专家手机号码" maxlength="11"/>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
        </el-form-item>
        <el-form-item label="是否为在校职工">
          <el-select v-model="form.isSchool" placeholder="请选择">
            <el-option
                v-for="dict in reviewer_is_school"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="领域">
          <el-input v-model="form.domain" maxlength="100"/>
        </el-form-item>
        <el-form-item label="职称">
          <el-input v-model="form.level" maxlength="100"/>
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
</template>

<script setup>
import {getSchoolDepts} from "@/api/system/dept";
import {addReviewer, listReviewer, updateReviewer} from "@/api/school/reviewer";
import {resetUserPwd} from "@/api/system/user";
import {getConfigKey} from "@/api/system/config";

const {proxy} = getCurrentInstance();

const {reviewer_is_school} = proxy.useDict("reviewer_is_school");

const reviewerList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    trueName: null,
    deptId: null,
    phonenumber: null
  },
  rules: {
    trueName: [{required: true, message: "姓名不能为空", trigger: "blur"}, {
      min: 2,
      max: 30,
      message: "姓名长度必须介于 2 和 30 之间",
      trigger: "blur"
    }],
    email: [{ type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
    phonenumber: [{required: true, message: "手机号码不能为空", trigger: "blur"},{pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur"}]
  }
});

const {queryParams, form, rules} = toRefs(data);

/** 重置操作表单 */
function reset() {
  form.value = {
    userId: undefined,
    trueName: undefined,
    phonenumber: undefined,
    domain: undefined,
    level: undefined,
    isSchool: undefined,
  }
  proxy.resetForm("userRef")
}

/** 取消按钮 */
function cancel() {
  open.value = false;
  reset()
}

/** 新增按钮操作 */
function handleAdd() {
  reset()
  open.value = true;
  title.value = "添加评审专家";
}

function handleUpdate(row) {
  reset()
  form.value = {
    userId: row.userId,
    trueName: row.trueName,
    phonenumber: row.phonenumber,
    domain: row.domain,
    level: row.level,
    isSchool: row.isSchool,
  }
  open.value = true;
  title.value = "修改评审专家";
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["reviewerRef"].validate(valid => {
    if (valid) {
      if (form.value.userId !== undefined) {
        updateReviewer(form.value).then(res =>{
          proxy.$modal.msgSuccess("修改成功")
          cancel()
          getList()
        })
      } else {
        addReviewer(form.value).then(res =>{
          proxy.$modal.msgSuccess("添加成功")
          cancel()
          getList()
        })
      }
    }
  });
}

function resetPwd(row){
  proxy.$prompt('请输入"' + row.trueName + '"的新密码', "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    closeOnClickModal: false,
    inputPattern: /^.{5,20}$/,
    inputErrorMessage: "用户密码长度必须介于 5 和 20 之间",
  }).then(({ value }) => {
    resetUserPwd(row.userId, value).then(res => {
      proxy.$modal.msgSuccess("修改成功，新密码是：" + value)
    });
  }).catch(() => {});
}

const initPwd = ref("")

getConfigKey("sys.user.initPassword").then(res=>{
  initPwd.value = res.msg
})



/** 查询作品列表 */
function getList() {
  loading.value = true;
  listReviewer(queryParams.value).then(response => {
    reviewerList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('system/reviewer/export', {
    ...queryParams.value
  }, `work_${new Date().getTime()}.xlsx`)
}


//选择院系下拉框相关代码
const departments = ref([])

getSchoolDepts().then(res => {
  departments.value = res.data
})

getList()
</script>

<style scoped>

</style>
