<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8">
        <el-row>
          <el-col :span="10">
            <el-button type="primary" icon="Download" @click="downloadFile('学院专业班级信息')">院系专业班级查看
            </el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="success" icon="Upload" @click="schoolInfoVisible = true">院系专业班级导入</el-button>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="10">
            <el-button type="primary" icon="Download" @click="downloadFile('本科生学籍信息')">本科学生信息查看
            </el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="success" icon="Upload" @click="undergraduateVisible = true">本科学生信息导入
            </el-button>
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="10">
            <el-button type="primary" icon="Download" @click="downloadFile('研究生学籍信息')">研究生信息查看</el-button>
          </el-col>
          <el-col :span="3">
            <el-button type="success" icon="Upload" @click="graduateVisible = true">研究生信息导入</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="16">
        <h1>提示：导入文件必须按照模板格式（文件保存格式为:Excel工作簿 *.xlsx）</h1>
        <el-button type="primary" icon="Download" @click="downloadFile('学院专业班级信息导入模板')">
          院系专业班级信息导入模板下载
        </el-button>
        <el-button type="primary" icon="Download" @click="downloadFile('本科学生信息信息导入模板')">
          本科学生信息信息导入模板下载
        </el-button>
        <el-button type="primary" icon="Download" @click="downloadFile('研究生信息导入模板')">研究生信息导入模板下载
        </el-button>
      </el-col>
    </el-row>

    <el-dialog v-model="schoolInfoVisible" center title="导入院系学院专业信息">
      <el-form ref="workRef" :model="schoolInfoForm" label-width="280px">
        <el-form-item label="院系学院专业信息">
          <file-upload :limit="1" v-model="schoolInfoForm.info" :file-type="['xlsx']"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="undergraduateVisible" center title="导入本科在校生信息">
      <el-form ref="workRef" :model="undergraduateForm" label-width="280px">
        <el-form-item label="本科在校生信息">
          <file-upload :limit="1" v-model="undergraduateForm.info" :file-type="['xlsx']"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="submitUndergraduateForm">提交
        </el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="graduateVisible" center title="导入研究生信息">
      <el-form ref="workRef" :model="graduateForm" label-width="280px">
        <el-form-item label="研究生信息">
          <file-upload :limit="1" v-model="graduateForm.info" :file-type="['xlsx']"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="submitGraduateForm">提交
        </el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>

import {getCurrentInstance, reactive, ref} from "vue";
import {importInfo, importUndergraduate, importGraduate, queryFilePath} from "@/api/match/history/match";
import {ElMessage, ElLoading} from 'element-plus'

const schoolInfoVisible = ref(false)
const schoolInfoForm = reactive({})

function submitForm() {
  const loading = ElLoading.service({
    lock: true,
    text: '正在导入中，请勿关闭页面或进行其他操作',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  importInfo(schoolInfoForm).then(res => {
    schoolInfoForm.info = null
    schoolInfoVisible.value = false
    loading.close()
    ElMessage({
      message: '导入成功',
      type: 'success',
    })
  })
}

const undergraduateVisible = ref(false)
const undergraduateForm = reactive({})

function submitUndergraduateForm() {
  const loading = ElLoading.service({
    lock: true,
    text: '正在导入中，请勿关闭页面或进行其他操作',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  importUndergraduate(undergraduateForm).then(res => {
    undergraduateForm.info = null
    undergraduateVisible.value = false
    loading.close()
    ElMessage({
      message: '导入成功',
      type: 'success',
    })
  })
}

const graduateVisible = ref(false)
const graduateForm = reactive({})

function submitGraduateForm() {
  const loading = ElLoading.service({
    lock: true,
    text: '正在导入中，请勿关闭页面或进行其他操作',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  importGraduate(graduateForm).then(res => {
    graduateForm.info = null
    graduateVisible.value = false
    loading.close()
    ElMessage({
      message: '导入成功',
      type: 'success',
    })
  })
}

const {proxy} = getCurrentInstance();

function downloadFile(name) {
  queryFilePath(name).then(res => {
    proxy.$download.resource(res.msg)
  })
}

</script>

<style scoped>

</style>