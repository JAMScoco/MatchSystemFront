<template>
   <el-form ref="userRef" :model="user" :rules="rules" label-width="120px">
      <el-form-item label="用户昵称" prop="nickName">
         <el-input v-model="user.nickName" maxlength="30" />
      </el-form-item>
     <el-form-item label="真实姓名" prop="trueName">
       <el-input v-model="user.trueName" maxlength="30" />
     </el-form-item>
     <el-form-item label="学号" prop="sno" v-hasRole="['student']">
       <el-input v-model="user.sno" maxlength="30" />
     </el-form-item>
      <el-form-item label="手机号码" prop="phonenumber">
         <el-input v-model="user.phonenumber" maxlength="11" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
         <el-input v-model="user.email" maxlength="50" />
      </el-form-item>
     <el-form-item label="领域" v-hasRole="['review']">
       <el-input v-model="user.domain" maxlength="30"/>
     </el-form-item>
     <el-form-item label="职称" v-hasRole="['review']">
       <el-input v-model="user.level" maxlength="30"/>
     </el-form-item>
     <el-form-item label="是否为学校职工" prop="isSchool" v-hasRole="['review']">
       <el-radio-group v-model="user.isSchool">
         <el-radio label="0">是</el-radio>
         <el-radio label="1">否</el-radio>
       </el-radio-group>
     </el-form-item>
      <el-form-item label="性别">
         <el-radio-group v-model="user.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
         </el-radio-group>
      </el-form-item>
     <el-form-item label="个人简介">
       <el-input v-model="user.intro" type="textarea" :rows="4" maxlength="500" />
     </el-form-item>
      <el-form-item>
      <el-button type="primary" @click="submit">保存</el-button>
      <el-button type="danger" @click="close">关闭</el-button>
      </el-form-item>
   </el-form>
</template>

<script setup>
import { updateUserProfile } from "@/api/system/user";
import {getCurrentInstance} from "vue";

const props = defineProps({
  user: {
    type: Object
  }
});

const { proxy } = getCurrentInstance();

const rules = ref({
  nickName: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
  trueName: [{ required: true, message: "真实姓名不能为空", trigger: "blur" }],
  email: [{ required: true, message: "邮箱地址不能为空", trigger: "blur" }, { type: "email", message: "请输入正确的邮箱地址", trigger: ["blur", "change"] }],
  phonenumber: [{ required: true, message: "手机号码不能为空", trigger: "blur" }, { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: "请输入正确的手机号码", trigger: "blur" }],
});

/** 提交按钮 */
function submit() {
  proxy.$refs.userRef.validate(valid => {
    if (valid) {
      updateUserProfile(props.user).then(response => {
        proxy.$modal.msgSuccess("修改成功");
      });
    }
  });
}
/** 关闭按钮 */
function close() {
  proxy.$tab.closePage();
}
</script>
