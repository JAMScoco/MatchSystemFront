<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="100px">
      <el-form-item label="大赛名称" prop="name">
        <el-input
            v-model="queryParams.name"
            placeholder="请输入大赛名称"
            clearable
            @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="大赛开始时间" prop="startTime">
        <el-date-picker clearable
                        v-model="queryParams.startTime"
                        type="date"
                        value-format="YYYY-MM-DD"
                        placeholder="请选择大赛开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="大赛结束时间" prop="endTime">
        <el-date-picker clearable
                        v-model="queryParams.endTime"
                        type="date"
                        value-format="YYYY-MM-DD"
                        placeholder="请选择大赛结束时间">
        </el-date-picker>
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
            v-hasPermi="['match:history:export']"
        >导出为Excel
        </el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="matchList">
      <el-table-column label="序号" type="index" width="55"/>
      <el-table-column label="大赛名称" align="center" prop="name"/>
      <el-table-column label="大赛logo" align="center" prop="logo" width="100">
        <template #default="scope">
          <image-preview :src="scope.row.logo" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="大赛开始时间" align="center" prop="startTime" width="150">
        <template #default="scope">
          <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大赛结束时间" align="center" prop="endTime" width="150">
        <template #default="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
              type="text"
              icon="Warning"
              @click="handleInfo(scope.row)"
              v-hasPermi="['match:history:query']"
          >详情
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

    <!-- 赛事详情对话框 -->
    <el-dialog :title="title" v-model="open" width="600px" append-to-body>
      <el-form ref="matchRef" :disabled="true" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="大赛名称" prop="name">
          <el-input v-model="form.name" placeholder=""/>
        </el-form-item>
        <el-row>
          <el-col :span="8">
            <el-form-item label="大赛logo">
              <ImagePreview :src="form.logo" :width="50" :height="50"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="官方二维码">
              <ImagePreview :src="form.qrCode" :width="50" :height="50"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="大赛时间" prop="startTime">
          <el-col :span="11">
            <el-date-picker
                v-model="form.startTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder=""
                style="width: 100%"
            />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">~</span>
          </el-col>
          <el-col :span="11">
            <el-date-picker
                v-model="form.endTime"
                placeholder=""
                type="date"
                value-format="YYYY-MM-DD"
                style="width: 100%"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="大赛组委会">
          <el-input :rows="4" v-model="form.organizingCommittee" type="textarea" placeholder=""/>
        </el-form-item>
        <el-form-item label="专家委员会">
          <el-input :rows="4" v-model="form.expertCommittee" type="textarea" placeholder=""/>
        </el-form-item>
        <el-form-item label="大赛地址">
          <el-input v-model="form.address" placeholder=""/>
        </el-form-item>
        <el-form-item label="邮政编码">
          <el-input v-model="form.postcode" placeholder=""/>
        </el-form-item>
        <el-form-item label="投诉邮箱">
          <el-input v-model="form.email" placeholder=""/>
        </el-form-item>
        <el-form-item label="作品报名时间">
          <el-col :span="11">
            <el-date-picker
                v-model="form.startSubmitTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder=""
                style="width: 100%"
            />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">~</span>
          </el-col>
          <el-col :span="11">
            <el-date-picker
                v-model="form.endSubmitTime"
                placeholder=""
                type="date"
                value-format="YYYY-MM-DD"
                style="width: 100%"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="院级评审时间">
          <el-col :span="11">
            <el-date-picker
                v-model="form.startReviewTimeDepartment"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder=""
                style="width: 100%"
            />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">~</span>
          </el-col>
          <el-col :span="11">
            <el-date-picker
                v-model="form.endReviewTimeDepartment"
                placeholder=""
                type="date"
                value-format="YYYY-MM-DD"
                style="width: 100%"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="校级评审时间">
          <el-col :span="11">
            <el-date-picker
                v-model="form.startReviewTimeSchool"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder=""
                style="width: 100%"
            />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">~</span>
          </el-col>
          <el-col :span="11">
            <el-date-picker
                v-model="form.endReviewTimeSchool"
                placeholder=""
                type="date"
                value-format="YYYY-MM-DD"
                style="width: 100%"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder=""/>
        </el-form-item>
      </el-form>
      <el-row>
        <el-col :span="6" class="text-center" v-if="form.competitionNotice">
          <el-button type="primary" icon="Download" @click="handleDownload(form.competitionNotice)">大赛通知</el-button>
        </el-col>
        <el-col :span="6" class="text-center" v-if="form.competitionGuide">
          <el-button type="primary" icon="Download" @click="handleDownload(form.competitionGuide)">大赛指南</el-button>
        </el-col>
        <el-col :span="6" class="text-center" v-if="form.reviewRules">
          <el-button type="primary" icon="Download" @click="handleDownload(form.reviewRules)">评审规则</el-button>
        </el-col>
        <el-col :span="6" class="text-center" v-if="form.competitionReviewManual">
          <el-button type="primary" icon="Download" @click="handleDownload(form.competitionReviewManual)">大赛评审手册</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 10px">
        <el-col :span="8" class="text-center" v-if="form.studentOperationManual">
          <el-button type="primary" icon="Download" @click="handleDownload(form.studentOperationManual)">学生操作手册</el-button>
        </el-col>
        <el-col :span="8" class="text-center" v-if="form.collegeSchoolOperationManual">
          <el-button type="primary" icon="Download" @click="handleDownload(form.collegeSchoolOperationManual)">院级校级操作手册</el-button>
        </el-col>
        <el-col :span="8" class="text-center" v-if="form.businessCooperationInvitation">
          <el-button type="primary" icon="Download" @click="handleDownload(form.businessCooperationInvitation)">商业合作邀请函</el-button>
        </el-col>
      </el-row>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="cancel">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {listMatch, getMatch} from "@/api/match/history/match";
import ImagePreview from "@/components/ImagePreview";

const {proxy} = getCurrentInstance();

const matchList = ref([]);
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
    name: null,
    startTime: null,
    endTime: null
  },
  rules: {}
});

const {queryParams, form, rules} = toRefs(data);

/** 查询赛事列表 */
function getList() {
  loading.value = true;
  listMatch(queryParams.value).then(response => {
    matchList.value = response.rows;
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
    name: null,
    logo: null,
    organizingCommittee: null,
    address: null,
    postcode: null,
    email: null,
    expertCommittee: null,
    qrCode: null,
    startSubmitTime: null,
    endSubmitTime: null,
    startReviewTimeDepartment: null,
    endReviewTimeDepartment: null,
    startReviewTimeSchool: null,
    endReviewTimeSchool: null,
    competitionNotice: null,
    reviewRules: null,
    studentOperationManual: null,
    competitionGuide: null,
    collegeSchoolOperationManual: null,
    businessCooperationInvitation: null,
    competitionReviewManual: null,
    reviewNumber: null,
    delFlag: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null,
    startTime: null,
    endTime: null
  };
  proxy.resetForm("matchRef");
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

/** 查看详情按钮操作 */
function handleInfo(row) {
  reset();
  const _id = row.id || ids.value
  getMatch(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "赛事详情";
  });
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('match/history/export', {
    ...queryParams.value
  }, `match_${new Date().getTime()}.xlsx`)
}

function handleDownload(resource){
  proxy.$download.resource(resource)
}

getList();
</script>
