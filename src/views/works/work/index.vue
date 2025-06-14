<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="作品名称" prop="name">
        <el-input
            v-model="queryParams.name"
            placeholder="请输入作品名称"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="作品状态" prop="state">
        <el-select v-model="queryParams.state" placeholder="请选择作品状态">
          <el-option
              v-for="dict in works_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="赛道" prop="trackId">
        <el-select v-model="queryParams.trackId" placeholder="请选择赛道" @change="trackChange">
          <el-option
              v-for="item in optionsTrack"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="组别" prop="groupId">
        <el-select v-model="queryParams.groupId" placeholder="请选择组别">
          <el-option
              v-for="item in optionsGroup"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="类别" prop="categoryId">
        <el-select v-model="queryParams.categoryId" placeholder="请选择类别">
          <el-option
              v-for="item in optionsCategory"
              :key="item.id"
              :label="item.name"
              :value="item.id"
          />
        </el-select>
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
        <el-button icon="Refresh" @click="resetQuery">重置搜索条件</el-button>
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
        >导出到Excel
        </el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="workList">
      <el-table-column type="index" label="序号" width="55" align="center"/>
      <el-table-column label="作品名称" align="center" prop="name"/>
      <el-table-column label="所属院系" align="center" prop="deptName" v-hasRole="['school']"/>
      <el-table-column label="负责人" align="center" prop="trueName"/>
      <el-table-column label="所属赛道" align="center" prop="trackName"/>
      <el-table-column label="所属组别" align="center" prop="groupName"/>
      <el-table-column label="所属类别" align="center" prop="categoryName"/>
      <el-table-column label="作品状态" align="center" prop="state">
        <template #default="scope">
          <dict-tag :options="works_status" :value="scope.row.state"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
              type="primary"
              icon="Finished"
              @click="worksCheck(scope.row)"
              v-hasPermi="['works:work:edit']">审核
          </el-button>
          <el-button
              type="success"
              icon="Warning"
              @click="worksInfo(scope.row.id)"
              v-hasPermi="['works:work:query']">详情
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

    <el-dialog v-model="checkDialogShow" title="审核" width="30%" center @closed="resetCheckWork">
      <p style="text-align: center">请审核该作品的国家平台报名截图是否真实有效（单击图片放大）</p>
      <br>
      <ImagePreview :src="checkWorkData.screenshot"/>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="unpassCheck">不通过</el-button>
        <el-button type="primary" @click="passCheck">通过</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Work">
import {checkWork, listWork} from "@/api/works/work";
import useTracks from "@/hooks/useTracks";
import {getSchoolDepts} from "@/api/system/dept";
import ImagePreview from "@/components/ImagePreview";
import router from "../../../router";

const {proxy} = getCurrentInstance();

const workList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const data = reactive({
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    name: null,
    trackId: null,
    groupId: null,
    categoryId: null,
    state: null,
    deptId: null
  },
});

const {queryParams} = toRefs(data);

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
function worksInfo(id) {
  router.push("/count/workDetail?id=" + id)
}

const checkWorkData = reactive({})
const checkDialogShow = ref(false)

function worksCheck(work) {
  checkWorkData.id = work.id
  checkWorkData.screenshot = work.screenshot
  checkDialogShow.value = true
}

function resetCheckWork() {
  checkDialogShow.value = false
  checkWorkData.id = null
  checkWorkData.screenshot = null
  checkWorkData.state = null
  getList()
}

function unpassCheck(){
  checkWorkData.state = -1
  submitCheck()
}

function passCheck(){
  checkWorkData.state = 1
  submitCheck()
}

function submitCheck(){
  checkWork(checkWorkData).then(res=>{
    proxy.$modal.msgSuccess("操作成功");
    resetCheckWork()
  })
}

const {works_status} = proxy.useDict('works_status')


/** 导出按钮操作 */
function handleExport() {
  proxy.download('works/work/export', {
    ...queryParams.value
  }, `work_${new Date().getTime()}.xlsx`)
}

//赛道组别类别关联下拉框
const {
  trackChange,
  optionsTrack,
  optionsGroup,
  optionsCategory
} = useTracks

//选择院系下拉框相关代码
const departments = ref([])

getSchoolDepts().then(res => {
  departments.value = res.data
})

getList();
</script>
