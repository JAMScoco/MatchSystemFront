<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label=" 作品名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入 作品名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="作品状态" prop="state">
        <el-input
          v-model="queryParams.state"
          placeholder="请输入作品状态"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['works:work:export']"
        >导出到Excel</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="workList">
      <el-table-column type="index" label="序号" width="55" align="center" />
      <el-table-column label="作品名称" align="center" prop="name" />
      <el-table-column label="所属赛道" align="center" prop="trackId" />
      <el-table-column label="所属组别" align="center" prop="groupId" />
      <el-table-column label="所属类别" align="center" prop="categoryId" />
      <el-table-column label="作品状态" align="center" prop="state" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
              type="success"
              icon="Warning"
            @click="worksInfo(scope.row)"
            v-hasPermi="['works:work:query']"
          >详情</el-button>
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

<script setup name="Work">
import { listWork } from "@/api/works/work";

const { proxy } = getCurrentInstance();

const workList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    name: null,
    trackId: null,
    groupId: null,
    categoryId: null,
    state: null,
  },
});

const { queryParams} = toRefs(data);

/** 查询作品列表 */
function getList() {
  loading.value = true;
  listWork(queryParams.value).then(response => {
    workList.value = response.rows;
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

/** 查看详情操作 */
function worksInfo(row) {
  console.log(row)
}


/** 导出按钮操作 */
function handleExport() {
  proxy.download('works/work/export', {
    ...queryParams.value
  }, `work_${new Date().getTime()}.xlsx`)
}

getList();
</script>
