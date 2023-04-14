<template>
  <div>
    <el-form ref="userRef" :model="user" :rules="rules" label-width="120px">
      <el-form-item label="用户昵称" prop="nickName">
        <el-input v-model="user.nickName" maxlength="30"/>
      </el-form-item>
      <el-form-item label="真实姓名" prop="trueName">
        <el-input v-model="user.trueName" maxlength="30"
                  :disabled="user.level ==='本科生在读' || user.level ==='研究生硕士在读' || user.level ==='研究生博士在读'"/>
      </el-form-item>
      <el-form-item label="身份" v-hasRole="['student']" prop="level">
        <el-radio-group v-model="user.level" disabled>
          <el-radio label="本科生在读">本科生在读</el-radio>
          <el-radio label="研究生硕士在读">硕士研究生在读</el-radio>
          <el-radio label="研究生博士在读">博士研究生在读</el-radio>
          <el-radio label="往届生">往届生</el-radio>
          <el-radio label="校外生">校外生</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="学号" prop="sno" v-hasRole="['student']" v-if="user.level !== '校外生'">
        <el-input v-model="user.sno" maxlength="30"
                  :disabled="user.level ==='本科生在读' || user.level ==='研究生硕士在读' || user.level ==='研究生博士在读' || user.level ==='往届生'"/>
      </el-form-item>
      <el-row>
        <el-col :span="6">
          <el-form-item label="所属院系" v-hasRole="['student']" prop="deptId">
            <el-select v-model="user.deptId" placeholder="请选择院系" disabled>
              <el-option
                  v-for="item in departments"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="major" label="专业" v-hasRole="['student']" v-if="user.level !== '校外生'">
            <el-input v-model="user.major"
                      :disabled="user.level ==='本科生在读' || user.level ==='研究生硕士在读' || user.level ==='研究生博士在读'"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="domain" label="班级" v-hasRole="['student']"
                        v-if="user.level === '本科生在读' || user.level === '往届生'">
            <el-input v-model="user.domain" :disabled="user.level ==='本科生在读'"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="手机号码" prop="phonenumber">
        <el-input v-model="user.phonenumber" maxlength="11"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="user.email" maxlength="50"/>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="user.sex"
                        :disabled="user.level ==='本科生在读' || user.level ==='研究生硕士在读' || user.level ==='研究生博士在读'">
          <el-radio label="0">男</el-radio>
          <el-radio label="1">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否为学校职工" prop="isSchool" v-hasRole="['review']">
        <el-radio-group v-model="user.isSchool" @change="clearInfo">
          <el-radio label="0">是</el-radio>
          <el-radio label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="职称/职务" prop="level" v-hasRole="['review']">
        <el-input v-model="user.level" maxlength="30"/>
      </el-form-item>
      <el-form-item :label="snoLabel" prop="sno" v-hasRole="['review']">
        <el-input v-model="user.sno"/>
      </el-form-item>
      <el-form-item label="银行卡号" prop="major" v-hasRole="['review']" v-if="user.isSchool === '1'">
        <el-input v-model="user.major"/>
      </el-form-item>
      <el-form-item label="开户行（支行）" v-hasRole="['review']" v-if="user.isSchool === '1'">
        <el-input v-model="user.remark"/>
      </el-form-item>
      <el-form-item :label="domainLabel" v-hasRole="['review']">
        <el-input v-model="user.domain" maxlength="30"/>
      </el-form-item>
      <el-form-item label="个人简介">
        <el-input v-model="user.intro" type="textarea" :rows="4" maxlength="500"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
        <el-button type="danger" @click="close">关闭</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {updateUserProfile} from "@/api/system/user";
import {computed, getCurrentInstance} from "vue";
import {getSchoolDepts} from "@/api/system/dept";
import {useRouter} from "vue-router";

const props = defineProps({
  user: {
    type: Object
  }
});

const {proxy} = getCurrentInstance();
const router = useRouter();

const checkInputValue = (rule, value, callback) => {
  if(props.user.isSchool === '1'){
    if (value === ''|| value === null) {
      return callback(new Error('不能为空'));
    }
    else {
      callback()
    }
  }else {
    callback()
  }
};

const rules = ref({
  nickName: [{required: true, message: "用户昵称不能为空", trigger: "blur"}],
  level: [{required: true, message: "必选", trigger: "blur"}],
  deptId: [{required: true, message: "必选", trigger: "blur"}],
  trueName: [{required: true, message: "真实姓名不能为空", trigger: "blur"}],
  major: [{validator:checkInputValue, trigger: "blur"}],
  domain: [{required: true, message: "不能为空", trigger: "blur"}],
  sno: [{required: true, message: "不能为空", trigger: "blur"}],
  email: [{required: true, message: "邮箱地址不能为空", trigger: "blur"}, {
    type: "email",
    message: "请输入正确的邮箱地址",
    trigger: ["blur", "change"]
  }],
  phonenumber: [{
    required: true,
    message: "手机号码不能为空",
    trigger: "blur"
  }, {pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur"}],
});

/** 提交按钮 */
function submit() {
  proxy.$refs.userRef.validate((valid,errror) => {
    if (valid) {
      updateUserProfile(props.user).then(response => {
        proxy.$modal.msgSuccess("修改成功");
        router.go(0)
      });
    }else {
      console.log(errror)
    }
  });
}

/** 关闭按钮 */
function close() {
  proxy.$tab.closePage();
}

const domainLabel = computed(() => {
  return props.user.isSchool === '0'?'单位/学院':'擅长领域'
})

const snoLabel = computed(() => {
  return props.user.isSchool === '0'?'统一职工号':'身份证号'
})

//选择院系下拉框相关代码
const departments = ref([])

getSchoolDepts().then(res => {
  departments.value = res.data
})

function clearInfo() {
  props.user.domain = ''
  props.user.level = ''
  props.user.remark = ''
  props.user.major = ''
  props.user.sno = ''
}
</script>
