<template>
  <div>
    <el-row>
      <el-col :span="6"></el-col>
      <el-col :span="12" style="text-align: center">
        <el-form ref="formRefInfo" :rules="rules" :model="form" label-width="120px">
          <el-form-item label="大赛名称" prop="name">
            <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item label="承办方" prop="email">
            <el-input v-model="form.email"/>
          </el-form-item>
          <el-form-item label="联系电话" prop="postcode">
            <el-input v-model="form.postcode"/>
          </el-form-item>
          <el-form-item label="大赛组委会" prop="organizingCommittee">
            <el-input type="textarea" rows="6" v-model="form.organizingCommittee"/>
          </el-form-item>
          <el-form-item label="专家委员会" prop="expertCommittee">
            <el-input type="textarea" rows="6" v-model="form.expertCommittee"/>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address"/>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="submitInfo(form)">保存</el-button>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script setup>
import {updateMatch} from "../../../api/match/history/match";
import {ElMessage} from "element-plus";
import {reactive,getCurrentInstance} from "vue";
import {defineProps} from "vue";

const props = defineProps({
  form:[Object],
})

const {proxy} = getCurrentInstance()

const data = reactive({
  rules: {
    name: [{required: true, message: '大赛名称不能为空', trigger: 'blur'}],
    organizingCommittee: [{required: true, message: '大赛组委会不能为空', trigger: 'blur'}],
    address: [{required: true, message: '地址不能为空', trigger: 'blur'}],
    postcode: [{required: true, message: '邮编不能为空', trigger: 'blur'}],
    email: [{required: true, message: '大赛邮箱不能为空', trigger: 'blur'}],
    expertCommittee: [{required: true, message: '专家委员会不能为空', trigger: 'blur'}]
  }
})

const {rules} = toRefs(data)

//基本信息保存按钮
function submitInfo(data) {
  proxy.$refs["formRefInfo"].validate(valid => {
    if (valid) {
      // 更新赛事
      updateMatch(data).then(res => {
        if (res.code === 200) {
          ElMessage({
            message: res.msg,
            type: 'success',
          })
        } else {
          ElMessage({
            message: res.msg,
            type: 'error',
          })
        }
      })
    }
  })
}

</script>

<style scoped>

</style>