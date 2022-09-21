<template>
  <div style="height: 150px"></div>
  <el-row>
    <el-col :span="7"></el-col>
    <el-col :span="8" v-if="hasMatch">

    </el-col>
    <el-col :span="8" v-else>
      <el-form ref="ruleFormRef" :rules="rules" :model="form" class="demo-form-inline" label-width="200px">
        <el-form-item label="大赛名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入大赛名称"/>
        </el-form-item>
        <el-form-item label="大赛logo">
          <ImageUpload :model-value="form.logo"/>
        </el-form-item>
        <el-form-item label="大赛时间" required>
          <el-col :span="11">
            <el-form-item prop="startTime">
              <el-date-picker
                  v-model="form.startTime"
                  type="date"
                  value-format="YYYY-MM-DD"
                  placeholder=""
                  style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">~</span>
          </el-col>
          <el-col :span="11">
            <el-form-item prop="endTime">
              <el-date-picker
                  v-model="form.endTime"
                  placeholder=""
                  type="date"
                  value-format="YYYY-MM-DD"
                  style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">新增赛事</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="9"></el-col>
  </el-row>
</template>

<script setup>
import {getCurrentInstance, onMounted} from "vue";
import {getCurrentMatch, addMatch} from "@/api/match/history/match";

import ImageUpload from "@/components/ImageUpload";
import {ElLoading} from "element-plus";

const {proxy} = getCurrentInstance()

const startTime = (rules, value, callback) => {
  if (!value) {
    callback(new Error('请选择开始时间'))
  } else {
    if (form.value.endTime) {
      proxy.$refs["ruleFormRef"].validateField('endTime')
    }
    callback()
  }
}
const endTime = (rules, value, callback) => {
  if (!value) {
    callback(new Error('请选择结束时间'))
  } else {
    if (!form.value.startTime) {
      console.log(form.value.startTime)
      callback(new Error('请选择开始时间！'))
    } else if (Date.parse(form.value.startTime) >= Date.parse(value)) {
      callback(new Error('结束时间必须大于开始时间！'))
    }else if(Date.now() >= Date.parse(value)){
      callback(new Error('结束时间必须大于今日！'))
    }
    else {
      callback()
    }
  }
}

const data = reactive({
  form: {},
  rules: {
    name: [{required: true, message: '大赛名称不能为空', trigger: 'blur'},],
    startTime: [
      {
        type: 'date',
        required: true,
        validator: startTime,
        trigger: 'blur'
      },
    ],
    endTime: [
      {
        type: 'date',
        required: true,
        validator: endTime,
        trigger: 'blur'
      },
    ],
  }
});



const hasMatch = ref(false)
const {form, rules} = toRefs(data);

function onSubmit() {
  proxy.$refs["ruleFormRef"].validate(valid => {
    if (valid) {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      addMatch(form.value).then(res => {
        proxy.$modal.msgSuccess("新增赛事成功");
        getCurrentMatch().then(res => {
          hasMatch.value = res.code === 200;
          loading.close()
        })
      })
    }
  })
}

onMounted(() => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  getCurrentMatch().then(res => {
    hasMatch.value = res.data !== undefined;
    loading.close()
  })
})

</script>

<style scoped>

</style>
