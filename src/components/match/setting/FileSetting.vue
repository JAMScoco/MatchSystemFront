<template>
  <div>
    <div>
      <el-row>
        <el-col :span="4"></el-col>
        <el-col :span="16">
          <div>
            <el-button type="primary" @click="openUploadDialog">上传文件</el-button>

          </div>
          <el-table :data="tableDataList" style="width: 100%">
            <el-table-column label="文件类型" width="180">
              <template #default="scope">
                <label>{{ scope.row.name }}</label>
              </template>
            </el-table-column>
            <el-table-column label="文件名称" width="400">
              <template #default="scope">
                <label>{{ scope.row.fileName }}</label>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="small" @click="handleDownload(scope.row)">下载</el-button>
                <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </div>
    <div>
      <el-dialog v-model="dialogFormVisible" title="上传文件" @close="closeDialog">
        <el-form :model="fileFrom">
          <el-form-item label="文件类型" label-width="140px">
            <el-select v-model="fileFrom.fileType" placeholder="请选择文件类型">
              <el-option v-for="item in fileList" :label="item.name" :value="item.fieldName"/>
            </el-select>
          </el-form-item>
          <el-form-item label="文件" label-width="140px">
            <FileUpload v-model="fileFrom.file" :limit="1"/>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmSubmit">确定</el-button
        >
      </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import FileUpload from "@/components/FileUpload/index"
import {defineProps, getCurrentInstance, onMounted, reactive} from "vue";
import {addMatchFile, delMatchFile} from "../../../api/match/history/match";
import {ElMessage} from "element-plus";
import {getRouters} from "../../../api/menu";

const props = defineProps({
  form: [Object],
})
const dialogFormVisible = ref(false)

//上传文件按钮打开对话框
function openUploadDialog() {
  dialogFormVisible.value = true
}


const tableDataList = reactive([])
const fileList = reactive([])
const fileFrom = reactive({})
const {router} = getRouters()
const {proxy} = getCurrentInstance()

//上传文件的确定按钮
function confirmSubmit() {
  fileFrom.matchId = props.form.id
  addMatchFile(fileFrom).then(res => {
    if (res.code === 200) {
      fileList.forEach((item) => {
        if (item.fieldName === fileFrom.fileType) {
          tableDataList.push({
            name: item.name,
            fieldName: item.fieldName,
            fileName: fileFrom.file
          })
        }
      })
      let index = fileList.length;
      while (index--) {
        if (fileList[index].fieldName === fileFrom.fileType) {
          fileList.splice(index, 1);
        }
      }
      ElMessage.success(res.msg)
    } else {
      ElMessage.error(res.msg)
    }
    dialogFormVisible.value = false
  })
}

//关闭对话框的回调函数
function closeDialog() {
  fileFrom.matchId = null
  fileFrom.fileType = null
  fileFrom.file = null
}

function handleDownload(row) {
  console.log(row)
}
/** 删除按钮 */
function handleDelete(row) {
  console.log(row)
  let data = {matchId: props.form.id, fileType: row.fieldName}
  delMatchFile(data).then(res => {
    if (res.code === 200) {
      fileList.push({
        name: row.name,
        fieldName: row.fieldName
      })
      let index = tableDataList.length;
      while (index--) {
        if (tableDataList[index].fieldName === row.fieldName) {
          tableDataList.splice(index, 1);
        }
      }
      ElMessage.success(res.msg)
    } else {
      ElMessage.error(res.msg)
    }
  })
}

onMounted(() => {
  setTimeout(() => {
    if (props.form.competitionNotice === null) {
      fileList.push({
            name: '大赛通知',
            fieldName: 'competitionNotice',
          }
      )
    } else {
      tableDataList.push({
        name: '大赛通知',
        fieldName: 'competitionNotice',
        fileName: props.form.competitionNotice
      })
    }
    if (props.form.reviewRules === null) {
      fileList.push({
            name: '评审规则',
            fieldName: 'reviewRules',
          }
      )
    } else {
      tableDataList.push({
        name: '评审规则',
        fieldName: 'reviewRules',
        fileName: props.form.reviewRules
      })
    }
    if (props.form.studentOperationManual === null) {
      fileList.push({
            name: '学生操作手册',
            fieldName: 'studentOperationManual',
          }
      )
    } else {
      tableDataList.push({
        name: '学生操作手册',
        fieldName: 'studentOperationManual',
        fileName: props.form.studentOperationManual
      })
    }
    if (props.form.competitionGuide === null) {
      fileList.push({
            name: '大赛指南',
            fieldName: 'competitionGuide',
          }
      )
    } else {
      tableDataList.push({
        name: '大赛指南',
        fieldName: 'competitionGuide',
        fileName: props.form.competitionGuide
      })
    }
    if (props.form.collegeSchoolOperationManual === null) {
      fileList.push({
            name: '院级校级操作手册',
            fieldName: 'collegeSchoolOperationManual',
          }
      )
    } else {
      tableDataList.push({
        name: '院级校级操作手册',
        fieldName: 'collegeSchoolOperationManual',
        fileName: props.form.collegeSchoolOperationManual
      })
    }
    if (props.form.businessCooperationInvitation === null) {
      fileList.push({
            name: '商业合作邀请函',
            fieldName: 'businessCooperationInvitation',
          }
      )
    } else {
      tableDataList.push({
        name: '商业合作邀请函',
        fieldName: 'businessCooperationInvitation',
        fileName: props.form.businessCooperationInvitation
      })
    }
    if (props.form.competitionReviewManual === null) {
      fileList.push({
            name: '大赛评审手册',
            fieldName: 'competitionReviewManual',
          }
      )
    } else {
      tableDataList.push({
        name: '大赛评审手册',
        fieldName: 'competitionReviewManual',
        fileName: props.form.competitionReviewManual
      })
    }
  }, 300)
})


</script>
<style scoped>
</style>