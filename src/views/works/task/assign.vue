<template>
  <div class="app-container">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-steps :active="active" align-center>
          <el-step title="第一步" description="设置评审参数"/>
          <el-step title="第二步" description="选择评审专家"/>
          <el-step title="第三步" description="生成评审任务"/>
        </el-steps>
        <div class="content" v-if="active === 1">
          <h2>本次比赛本院待评审作品数量：{{ workCount }}</h2>
          <h2>本次比赛每个作品需要评审数量：{{ reviewCount }}</h2>
          <span>设置每位评审专家预计评审数量：<el-input-number v-model="taskNumber" :step="5" size="large"
                                                              :min="1"/> </span>
          <br>
          <h2>需要评审专家数量（自动计算）：{{ reviewerCount }}</h2>
          <br><br>
          <el-button type="primary" @click="active = 2">下一步</el-button>
        </div>
        <div class="content" v-if="active === 2">
          <h1>请勾选{{ reviewerCount }}名专家</h1>

          <el-table v-loading="loading" :data="reviewerList" height="300" max-height="300"
                    @selection-change="handleSelection">
            <el-table-column type="selection" width="55" align="center"/>
            <el-table-column label="专家姓名" align="center" prop="trueName"/>
            <el-table-column label="手机号码" align="center" prop="phonenumber"/>
            <el-table-column label="所属院系" align="center" prop="deptName" v-hasRole="['school']">
              <template #default="scope">
                {{ scope.row.dept.deptName }}
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

          <h1>已选/应选：{{ selectionReviewer.length }}/{{ reviewerCount }}</h1>
          <el-button @click="active = 1">上一步</el-button>
          <!--          <el-button type="primary" @click="toStep3">生成评审任务</el-button>-->
          <el-button type="primary" @click="toStep3" :disabled="selectionReviewer.length!==reviewerCount">生成评审任务
          </el-button>
        </div>
        <div class="content" v-if="active === 3">
          <h1>评审任务分配预览</h1>
          <el-table style="width: 100%" :data="previewAssignData" border>
            <el-table-column type="index" label="参赛作品序号" width="180"/>
            <template v-for="(item,index) in previewAssignHeader">
              <el-table-column :label="item">
                <template #default="scope">
                  {{ scope.row['score_' + (index + 1)].trueName }}
                </template>
              </el-table-column>
            </template>
          </el-table>
          <el-button @click="backStep2">上一步</el-button>
          <el-button @click="submitAssign">确定生成</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {computed, getCurrentInstance, ref, watch} from "vue";

const {proxy} = getCurrentInstance();
const router = useRouter()


checkCanAssign().then(res => {
  if (res.msg !== 'ok') {
    ElMessageBox.alert(res.msg, "提示", {
      type: 'error',
      showClose: false,
      callback: () => {
        proxy.$tab.closePage(router.currentRoute.value)
        router.push('/index')
      }
    })
  }
})


const active = ref(1)

//待评审作品数量
const workCount = ref(0)
waitReviewWorksDepartment().then(res => {
  workCount.value = res.data.length
})
//每个作品需要评审数量
const reviewCount = ref(5)
getCurrentMatch().then(res => {
  reviewCount.value = res.data.reviewNumber
})
//每个专家任务数量
const taskNumber = ref(50)

//所需专家数量
const reviewerCount = computed(() => {
  let tmp = workCount.value * reviewCount.value
  return Math.ceil(tmp / taskNumber.value)
})

watch(active, (newVal) => {
  if (newVal === 2) {
    getList()
  }
})

import {listReviewer, genAssignData, delPreAssign, checkCanAssign, ensurePreAssign} from "@/api/school/reviewer";
import {waitReviewWorksDepartment} from "@/api/works/work";
import {getCurrentMatch} from "@/api/match/history/match";
import {ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";

const {reviewer_is_school} = proxy.useDict("reviewer_is_school");

const reviewerList = ref([]);
const loading = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    trueName: null,
    deptId: null,
    phonenumber: null
  }
})

const {queryParams, form} = toRefs(data);

/** 查询作品列表 */
function getList() {
  loading.value = true;
  listReviewer(queryParams.value).then(response => {
    reviewerList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

//已选择的评审专家
const selectionReviewer = ref([])

function handleSelection(selection) {
  selectionReviewer.value = selection
}


const previewAssignData = ref([])
const previewAssignHeader = ref([])
const gen_key = ref('')

function toStep3() {

  // 1. 生成数据
  previewAssignHeader.value = []
  previewAssignData.value = []

  let users = []
  selectionReviewer.value.forEach(item => {
    users.push({
      userId: item.userId,
      trueName: item.trueName
    })
  })
  genAssignData(users).then(res => {
    previewAssignHeader.value.push(...res.data.previewAssignHeader)
    previewAssignData.value.push(...res.data.previewAssignData)
    gen_key.value = res.data.key
  })
  active.value = 3
}

function backStep2() {
  if (gen_key.value !== '') {
    delPreAssign(gen_key.value).then(res => {
      gen_key.value = ''
    })
  }
  selectionReviewer.value = []
  active.value = 2
}

function submitAssign() {
  if (gen_key.value !== '') {
    ensurePreAssign(gen_key.value).then(res => {
      proxy.$modal.msgSuccess("评审任务已生成")
      router.push("/task/view")
    })
  }
}

</script>

<style scoped>
.content {
  text-align: center;
  margin-top: 50px;
}

span {
  font-size: x-large;
}
</style>
