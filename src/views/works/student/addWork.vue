<template>
  <div>
    <el-row style="margin-top: 50px">
      <el-col :span="13" :offset="4">
        <el-row>
          <el-col :span="7" :offset="3">
            <b>负责人姓名：</b> {{ userInfo.trueName }}
          </el-col>
          <el-col :span="7">
            <b> 学号：</b>{{ userInfo.sno }}
          </el-col>
          <el-col :span="7">
            <b>手机号：</b>{{ userInfo.phonenumber }}
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="7" :offset="3">
            <b>身份：</b> {{ userInfo.level }}
          </el-col>
          <el-col :span="7">
            <b> 院系：</b>{{ userInfo.dept == null?'':userInfo.dept.deptName }}
          </el-col>
          <!--          <el-col :span="7">-->
          <!--            <b>手机号：</b>{{ userInfo.phonenumber }}-->
          <!--          </el-col>-->
        </el-row>
        <br>
        <el-form ref="workRef" :model="form" :rules="rules" label-width="180px">
          <el-form-item label=" 作品名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入 作品名称"/>
          </el-form-item>
          <el-form-item label="国家平台报名成功截图" prop="screenshot">
            <image-upload :limit="1" v-model="form.screenshot"/>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label=" 作品赛道" prop="trackId">
                <el-select v-model="form.trackId" placeholder="请选择赛道" @change="trackChange">
                  <el-option
                      v-for="item in optionsTrack"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" 作品组别" prop="groupId">
                <el-select v-model="form.groupId" placeholder="请选择组别">
                  <el-option
                      v-for="item in optionsGroup"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" 作品类别" prop="categoryId">
                <el-select v-model="form.categoryId" placeholder="请选择类别">
                  <el-option
                      v-for="item in optionsCategory"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="作品概述" prop="overview">
            <el-input v-model="form.overview" type="textarea" :rows="7" placeholder="请输入内容"/>
          </el-form-item>
          <el-row :gutter="8">
            <el-col :span="10" :offset="4">
              <b>团队成员：</b>
              <el-button type="primary" @click="addMember">添加成员</el-button>
              <br>
              <br>
              <el-table :data="memberData" style="height: 200px" max-height="200">
                <el-table-column fixed label="姓名" width="100" align="center" prop="name"/>
                <el-table-column label="学号" align="center" prop="sno"/>
                <el-table-column label="专业" align="center" prop="major"/>
                <el-table-column label="手机号" align="center" prop="phone"/>
                <el-table-column fixed="right" label="操作" align="center" width="60">
                  <template #default="scope">
                    <el-button link type="danger" size="small" @click="deleteMember(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="10">
              <b>指导老师：</b>
              <el-button type="primary" @click="addTeacher">添加指导老师</el-button>
              <br>
              <br>
              <el-table :data="teacherData" style="height: 200px" max-height="200">
                <el-table-column label="姓名" align="center" fixed prop="name"/>
                <el-table-column label="职工号码" align="center" prop="number"/>
                <el-table-column label="性别" align="center" prop="gender">
                  <template #default="scope">
                    <dict-tag :options="sys_user_sex" :value="scope.row.gender"/>
                  </template>
                </el-table-column>
                <el-table-column label="职称" align="center" prop="level"/>
                <el-table-column label="专业" align="center" prop="major"/>
                <el-table-column label="手机" align="center" prop="phone"/>
                <el-table-column fixed="right" label="操作" align="center" width="60">
                  <template #default="scope">
                    <el-button link type="danger" size="small" @click="deleteTeacher(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <br>
          <br>
          <el-row>
            <el-col :span="12">
              <el-form-item label="作品报告（商业计划书）" prop="report">
                <file-upload :limit="1" v-model="form.report"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="作品附件（视频、PPT等）" prop="attachment">
                <file-upload :fileSize="100" :limit="1" v-model="form.attachment" :file-type="['mp4','ppt']"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" :rows="4" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
        </el-form>
        <div style="text-align: center">
          <el-button type="primary" @click="submitForm">提交</el-button>
        </div>
      </el-col>
    </el-row>


    <!-- 添加参与成员对话框 -->
    <el-dialog title="添加成员" v-model="memberOpen" width="500px" append-to-body>
      <el-form ref="memberRef" :model="memberForm" :rules="memberRules" label-width="80px">
        <el-form-item label="名字" prop="name">
          <el-input v-model="memberForm.name" placeholder="请输入名字"/>
        </el-form-item>
        <el-form-item label="学号" prop="sno">
          <el-input v-model="memberForm.sno" placeholder="请输入学号"/>
        </el-form-item>
        <el-form-item label="院系" prop="departmentId">
          <el-select v-model="memberForm.departmentId" placeholder="请选择院系">
            <el-option
                v-for="item in departments"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="memberForm.major" placeholder="请输入专业"/>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="memberForm.phone" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="memberForm.remark" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitMember">确 定</el-button>
          <el-button @click="cancelMember">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 添加或修改指导老师对话框 -->
    <el-dialog title="添加指导老师" v-model="teacherOpen" width="500px" append-to-body>
      <el-form ref="teacherRef" :model="teacherForm" :rules="teacherRules" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="teacherForm.name" placeholder="请输入姓名"/>
        </el-form-item>
        <el-form-item label="职工号码" prop="number">
          <el-input v-model="teacherForm.number" placeholder="请输入职工号"/>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="teacherForm.phone" placeholder="请输入手机"/>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="teacherForm.gender" placeholder="请选择性别">
            <el-option
                v-for="dict in sys_user_sex"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职称" prop="level">
          <el-input v-model="teacherForm.level" placeholder="请输入职称"/>
        </el-form-item>
        <el-form-item label="所属院系" prop="departmentId">
          <el-select v-model="teacherForm.departmentId" placeholder="请选择院系">
            <el-option
                v-for="item in departments"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="major">
          <el-input v-model="teacherForm.major" placeholder="请输入专业"/>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="teacherForm.remark" type="textarea" placeholder="请输入内容"/>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitTeacher">确 定</el-button>
          <el-button @click="cancelTeacher">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {addWork, validCommit} from "@/api/works/work";
import useTracks from "@/hooks/useTracks";
import {getSchoolDepts} from "@/api/system/dept";

const {proxy} = getCurrentInstance();

//选择院系下拉框相关代码
const departments = ref([])

getSchoolDepts().then(res => {
  departments.value = res.data
})

//参与成员操作相关代码
const memberData = reactive([])

function addMember() {
  resetMember()
  memberOpen.value = true;
}

function deleteMember(row) {
  let tmp = memberData.filter(item => {
    return row !== item
  })
  memberData.splice(0)
  memberData.push(...tmp)
}

const memberOpen = ref(false)
const memberForm = ref([])
const memberRules = ref({
  name: [
    {required: true, message: "名字不能为空", trigger: "blur"}
  ],
  sno: [
    {required: true, message: "学号不能为空", trigger: "blur"}
  ],
  departmentId: [
    {required: true, message: "请选择院系", trigger: "blur"}
  ],
  major: [
    {required: true, message: "专业不能为空", trigger: "blur"}
  ],
  phone: [
    {required: true, message: "手机号不能为空", trigger: "blur"}
  ],
})

function submitMember() {
  proxy.$refs["memberRef"].validate(valid => {
    if (valid) {
      let data = {
        ...memberForm.value
      }
      memberData.push(data)
      cancelMember()
    }
  });
}

// 成员取消按钮
function cancelMember() {
  memberOpen.value = false;
  resetMember();
}

// 表单重置
function resetMember() {
  memberForm.value = {
    id: null,
    name: null,
    sno: null,
    departmentId: null,
    major: null,
    phone: null,
    delFlag: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null
  };
  proxy.resetForm("memberRef");
}

//指导老师操作相关代码
const teacherData = reactive([])

function addTeacher() {
  resetMember()
  teacherOpen.value = true;
}

function deleteTeacher(row) {
  let tmp = teacherData.filter(item => {
    return row !== item
  })
  teacherData.splice(0)
  teacherData.push(...tmp)
}

const teacherOpen = ref(false)
const teacherForm = ref([])
const teacherRules = ref({
  name: [
    {required: true, message: "姓名不能为空", trigger: "blur"}
  ],
  number: [
    {required: true, message: "职工号码不能为空", trigger: "blur"}
  ],
  gender: [
    {required: true, message: "性别不能为空", trigger: "change"}
  ],
  level: [
    {required: true, message: "职称不能为空", trigger: "blur"}
  ],
  departmentId: [
    {required: true, message: "请选择院系", trigger: "blur"}
  ],
  phone: [
    {required: true, message: "手机号不能为空", trigger: "blur"}
  ],
})

function submitTeacher() {
  proxy.$refs["teacherRef"].validate(valid => {
    if (valid) {
      let data = {
        ...teacherForm.value
      }
      teacherData.push(data)
      cancelTeacher()
    }
  });
}

// 成员取消按钮
function cancelTeacher() {
  teacherOpen.value = false;
  resetTeacher();
}

// 表单重置
function resetTeacher() {
  teacherForm.value = {
    id: null,
    name: null,
    sno: null,
    departmentId: null,
    major: null,
    phone: null,
    delFlag: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null
  };
  proxy.resetForm("teacherRef");
}

//引入用户性别字典
const {sys_user_sex} = proxy.useDict('sys_user_sex')

//作品表单及提交
const data = reactive({
  form: {},
  rules: {
    name: [
      {required: true, message: " 作品名称不能为空", trigger: "blur"}
    ],
    report: [
      {required: true, message: " 必须上传作品报告", trigger: "blur"}
    ],
    screenshot: [
      {required: true, message: " 必须上传国家平台报名成功截图", trigger: "blur"}
    ],
    overview: [
      {required: true, message: " 作品概述不能为空", trigger: "blur"}
    ],
    trackId: [
      {required: true, message: "请选择赛道", trigger: "blur"}
    ],
    groupId: [
      {required: true, message: "请选择组别", trigger: "blur"}
    ],
    categoryId: [
      {required: true, message: "请选择类别", trigger: "blur"}
    ],
  },

})

const {form, rules} = toRefs(data);

//赛道组别类别关联下拉框
const {
  trackChange,
  optionsTrack,
  optionsGroup,
  optionsCategory
} = useTracks

import {useRouter} from "vue-router";
import {ElMessageBox} from "element-plus";
import {getUserProfile} from "@/api/system/user";

const router = useRouter()

const userInfo = ref({})

/** 提交按钮 */
function submitForm() {
  proxy.$refs["workRef"].validate(valid => {
    if (valid) {
      form.value.memberList = [...memberData]
      form.value.teacherList = [...teacherData]
      addWork(form.value).then(response => {
        proxy.$tab.closePage(router.currentRoute.value)
        proxy.$modal.msgSuccess("提交成功");
        router.push('/index')
      });
    }
  })
}


getUserProfile().then(res => {
  userInfo.value = res.data
})
validCommit().then(res => {
  if (res.msg !== 'valid') {
    ElMessageBox.alert(res.msg, "提示", {
      type: 'error',
      showClose: false,
      callback: () => {
        proxy.$tab.closePage(router.currentRoute.value)
        router.push('/index')
      }
    })
  } else {
    ElMessageBox.alert("作品必须在国家平台报名成功才能在本系统提交，请务必上传国家平台报名成功截图", "提示", {
      type: 'info',
      confirmButtonText: '好的'
    })
  }
})


</script>

<style scoped>

</style>
