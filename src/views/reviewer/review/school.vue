<template>
  <div class="app-container">
    <el-form :model="queryParams" @submit.native.prevent ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="作品名称" prop="workName">
        <el-input
            v-model="queryParams.workName"
            placeholder="请输入作品名称"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置搜索条件</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <!--        <el-button-->
        <!--            type="warning"-->
        <!--            plain-->
        <!--            icon="Download"-->
        <!--            @click="handleExport"-->
        <!--            v-hasPermi="['work:score:export']"-->
        <!--        >导出</el-button>-->
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="scoreList" @selection-change="handleSelectionChange">
      <el-table-column type="index" label="序号" width="55" align="center" />
      <el-table-column label="作品名称" align="center" prop="name" />
      <el-table-column label="院系" align="center" prop="deptName" />
      <el-table-column label="院系排名" align="center" prop="departmentSort" />
      <el-table-column label="评审专家" align="center" prop="trueName" width="100"/>
      <el-table-column label="得分" align="center">
        <template #default="scope">
          <el-tag class="mx-1" size="large" type="danger" v-if="scope.row.scoreDetail === null">
            未评分
          </el-tag>
          <div v-else>{{JSON.parse(scope.row.scoreDetail).total}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding" width="250">
        <template #default="scope">
          <el-button
              icon="Link"
              type="primary" plain
              @click="worksInfo(scope.row.workId)"
              v-hasPermi="['review:work:detail']"
          >作品详情</el-button>
          <el-button
              icon="HelpFilled"
              type="primary"
              @click="toDoReview(scope.row.id)"
              v-if="scope.row.scoreDetail === null"
              v-hasPermi="['work:score:edit']"
          >评审</el-button>
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
  </div>
</template>

<script setup name="Score">
import { listScore } from "@/api/works/score";
import {getCurrentInstance, ref} from "vue";
import router from "@/router";

const { proxy } = getCurrentInstance();

const scoreList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    workName: null,
    type: 0,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询评审分值列表 */
function getList() {
  loading.value = true;
  let page = sessionStorage.getItem('index_page')
  if (page !== undefined && page !== null){
    queryParams.value.pageNum = Number(page)
    sessionStorage.removeItem("index_page")
  }
  listScore(queryParams.value).then(response => {
    scoreList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    workId: null,
    userId: null,
    type: null,
    scoreDetail: null,
    delFlag: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null
  };
  proxy.resetForm("scoreRef");
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

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length !== 1;
  multiple.value = !selection.length;
}
function toDoReview(id) {
  sessionStorage.setItem("index_page",queryParams.value.pageNum)
  router.push("/department/doReview?id=" + id)
}

/** 查看详情操作 */
function worksInfo(id) {
  sessionStorage.setItem("index_page",queryParams.value.pageNum)
  router.push("/department/reviewWorkDetail?id=" + id)
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('work/score/export', {
    ...queryParams.value
  }, `score_${new Date().getTime()}.xlsx`)
}

getList();
</script>