<template>
  <div>
    <div style="height: 150px;color: #99a9bf">
      <span v-if="hasMatch">提示：当前已有进行中的赛事，请设置赛事相关信息</span>
      <span v-else>提示：当前没有进行中的赛事，请添加新赛事</span>
    </div>
    <el-row>
      <el-col :span="7"></el-col>
      <el-col :span="8" v-if="hasMatch" style="text-align: center">
        <ImagePreview :src="matchInfo.value.logo" :width="100" :height="100"/>
        <h2> {{ matchInfo.value.name }}</h2>
        <el-row>
          <el-col :span="4"></el-col>
          <el-col :span="7">
            <el-date-picker
                disabled
                v-model="matchInfo.value.startTime"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder=""
                style="width: 100%"
            />
          </el-col>
          <el-col :span="2" class="text-center">
            <span class="text-gray-500">~</span>
          </el-col>
          <el-col :span="7">
            <el-date-picker
                disabled
                v-model="matchInfo.value.endTime"
                placeholder=""
                type="date"
                value-format="YYYY-MM-DD"
                style="width: 100%"
            />
          </el-col>
          <el-col :span="4"></el-col>
        </el-row>
        <el-button type="primary" style="margin-top: 20px" @click="toEditMatch">前往设置</el-button>
      </el-col>
      <el-col :span="8" v-else>
        <el-form ref="ruleFormRef" :rules="rules" :model="form" class="demo-form-inline" label-width="200px">
          <el-form-item label="大赛名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入大赛名称"/>
          </el-form-item>
          <el-form-item label="大赛logo">
            <ImageUpload :limit="1" v-model="form.logo"/>
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
  </div>
</template>

<script setup>
import {getCurrentInstance, onMounted} from "vue";
import {getCurrentMatch, addMatch} from "@/api/match/history/match";

import {ElLoading} from "element-plus";
import {useRouter} from "vue-router";

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
    } else if (Date.now() >= Date.parse(value)) {
      callback(new Error('结束时间必须大于今日！'))
    } else {
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
          if (hasMatch.value) {
            matchInfo.value = res.data
          }
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
    if (hasMatch.value) {
      matchInfo.value = res.data
    }
    loading.close()
  })
})

const matchInfo = reactive({})
const router = useRouter();

function toEditMatch(){
  router.push('/match/editMatch')
}

</script>

<style scoped>

</style>
