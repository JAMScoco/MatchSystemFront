<template>
  <div>
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="16" style="text-align: center">
        <el-form ref="formRefTime" :rules="rules" :model="form" label-width="200px">
          <el-row style="margin-bottom: 20px">
            <el-col :span="11">
              <el-form-item label="大赛开始时间" prop="startTime">
                <el-date-picker
                    v-model="form.startTime"
                    type="date"
                    value-format="YYYY-MM-DD"
                    placeholder=""
                    style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="2">~</el-col>
            <el-col :span="11"><el-form-item label="大赛结束时间" prop="endTime">
              <el-date-picker
                  v-model="form.endTime"
                  type="date"
                  value-format="YYYY-MM-DD"
                  placeholder=""
                  style="width: 100%"
              />
            </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 20px">
            <el-col :span="11">
              <el-form-item label="作品开始提交时间" prop="startSubmitTime">
                <el-date-picker
                    v-model="form.startSubmitTime"
                    type="date"
                    value-format="YYYY-MM-DD"
                    placeholder=""
                    style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="2">~</el-col>
            <el-col :span="11">
              <el-form-item label="作品结束提交时间" prop="endSubmitTime">
                <el-date-picker
                    v-model="form.endSubmitTime"
                    type="date"
                    value-format="YYYY-MM-DD"
                    placeholder=""
                    style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 20px">
            <el-col :span="11">
              <el-form-item label="院系评审专家开始评审时间" prop="startReviewTimeDepartment">
                <el-date-picker
                    v-model="form.startReviewTimeDepartment"
                    type="date"
                    value-format="YYYY-MM-DD"
                    placeholder=""
                    style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="2">~</el-col>
            <el-col :span="11">
              <el-form-item label="院系评审专家结束评审时间" prop="endReviewTimeDepartment">
                <el-date-picker
                    v-model="form.endReviewTimeDepartment"
                    type="date"
                    value-format="YYYY-MM-DD"
                    placeholder=""
                    style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 20px">
            <el-col :span="11">
              <el-form-item label="校级评审专家开始评审时间" prop="startReviewTimeSchool">
                <el-date-picker
                    v-model="form.startReviewTimeSchool"
                    type="date"
                    value-format="YYYY-MM-DD"
                    placeholder=""
                    style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="2">~</el-col>
            <el-col :span="11">
              <el-form-item label="校级评审专家结束评审时间" prop="endReviewTimeSchool">
                <el-date-picker
                    v-model="form.endReviewTimeSchool"
                    type="date"
                    value-format="YYYY-MM-DD"
                    placeholder=""
                    style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-button type="primary" @click="submitTime">保存</el-button>
        </el-form>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
  </div>
</template>

<script setup>
import {defineProps, getCurrentInstance} from "vue";
import {updateMatch} from "../../../api/match/history/match";
import {ElMessage} from "element-plus";

const props = defineProps({
  form:[Object],
})

const {proxy} = getCurrentInstance()

const startTime = (rules, value, callback) => {
  console.log(777)
  if (!value) {
    callback(new Error('请选择大赛开始时间'))
  } else {
    if (props.form.endTime) {
      proxy.$refs["formRefTime"].validateField('endTime')
    }
    console.log('ffsfs')
    callback()
  }
}
const endTime = (rules, value, callback) => {
  console.log(555)
  if (!value) {
    callback(new Error('请选择大赛结束时间'))
  } else {
    if (!props.form.startTime) {
      callback(new Error('请选择大赛开始时间！'))
    } else if (Date.parse(props.form.startTime) >= Date.parse(value)) {
      callback(new Error('大赛结束时间必须大于大赛开始时间！'))
    } else if (Date.now() >= Date.parse(value)) {
      callback(new Error('大赛结束时间必须大于今日！'))
    } else {
      callback()
    }
  }
}
const startSubmitTime = (rules,value,callback)=>{
  console.log(444)
  if (!value) {
    callback(new Error('请选择作品开始提交时间'))
  } else {
    if(!props.form.endTime){
      callback(new Error('请选择大赛结束时间时间！'))
    }else if(Date.parse(props.form.endTime) <= Date.parse(value)){
      callback(new Error('作品开始提交时间必须小于大赛结束时间！'))
    }else if(Date.parse(props.form.startTime) >= Date.parse(value)){
      callback(new Error('作品开始提交时间必须大于大赛开始时间！'))
    }else if (props.form.endSubmitTime) {
      proxy.$refs["formRefTime"].validateField('endSubmitTime')
    }
    callback()

  }
}

const endSubmitTime = (rules,value,callback)=>{
  console.log(222)
  if (!value) {
    callback(new Error('请选择作品结束提交时间'))
  } else {
    if (!props.form.startSubmitTime) {
      callback(new Error('请选择作品开始提交时间！'))
    } else if(Date.parse(props.form.startSubmitTime) >= Date.parse(value)){
      callback(new Error('作品结束提交时间必须大于作品开始提交时间！'))
    } else if(Date.parse(props.form.endTime) <= Date.parse(value)){
      callback(new Error('作品结束提交时间必须小于大赛结束时间！'))
    }else if (props.form.startReviewTimeDepartment) {
      proxy.$refs["formRefTime"].validateField('startReviewTimeDepartment')
    }
    callback()

  }
}

const startReviewTimeDepartment = (rules,value,callback)=>{
  console.log(111)
  if (!value) {
    callback(new Error('请选择院系评审专家开始评审时间'))
  } else {
    if(!props.form.endSubmitTime){
      callback(new Error('请选择作品结束提交时间！'))
    }else if(Date.parse(props.form.endSubmitTime) >= Date.parse(value)){
      callback(new Error('院系评审专家开始评审时间必须大于作品结束提交时间！'))
    }else if(Date.parse(props.form.endTime) <= Date.parse(value)){
      callback(new Error('院系评审专家开始评审时间必须小于大赛结束时间！'))
    }else if (props.form.endReviewTimeDepartment) {
      proxy.$refs["formRefTime"].validateField('endReviewTimeDepartment')
    }
    callback()

  }
}

const endReviewTimeDepartment = (rules,value,callback)=>{
  console.log(888)
  if (!value) {
    callback(new Error('请选择院系评审专家结束评审时间'))
  } else {
    if (!props.form.startReviewTimeDepartment) {
      callback(new Error('请选择院系评审专家开始评审时间！'))
    } else if(Date.parse(props.form.startReviewTimeDepartment) >= Date.parse(value)){
      callback(new Error('院系评审专家结束评审时间必须大于院系评审专家开始评审时间！'))
    } else if(Date.parse(props.form.endTime) <= Date.parse(value)){
      callback(new Error('院系评审专家结束评审时间必须小于大赛结束时间！'))
    }else if (props.form.startReviewTimeSchool) {
      proxy.$refs["formRefTime"].validateField('startReviewTimeSchool')
    }
      callback()

  }
}

const startReviewTimeSchool = (rules,value,callback)=>{
  console.log(999)
  if (!value) {
    callback(new Error('请选择校级评审专家开始评审时间'))
  } else {
    if(!props.form.endReviewTimeDepartment){
      callback(new Error('请选择院系评审专家结束评审时间！'))
    }else if(Date.parse(props.form.endReviewTimeDepartment) >= Date.parse(value)){
      callback(new Error('校级评审专家开始评审时间必须大于院系评审专家结束评审时间！'))
    }else if(Date.parse(props.form.endTime) <= Date.parse(value)){
      callback(new Error('校级评审专家开始评审时间必须小于大赛结束时间！'))
    }else if (props.form.endReviewTimeSchool) {
      proxy.$refs["formRefTime"].validateField('endReviewTimeSchool')
    }
      callback()

  }
}

const endReviewTimeSchool = (rules,value,callback)=>{
  console.log(666)
  if (!value) {
    callback(new Error('请选择校级评审专家结束评审时间'))
  } else {
    if (!props.form.startReviewTimeSchool) {
      callback(new Error('请选择校级评审专家开始评审时间！'))
    } else if(Date.parse(props.form.startReviewTimeSchool) >= Date.parse(value)){
      callback(new Error('校级评审专家结束评审时间必须大于校级评审专家开始评审时间！'))
    } else if(Date.parse(props.form.endTime) <= Date.parse(value)){
      callback(new Error('校级评审专家结束评审时间必须小于大赛结束时间！'))
    }else {
      callback()
    }
  }
}

const data = reactive({
  rules: {
    startTime: [{type: 'date', required: true, validator: startTime, trigger: 'blur'}],
    endTime:[{type: 'date', required: true, validator: endTime, trigger: 'blur'}],
    startSubmitTime:[{type: 'date', required: true, validator: startSubmitTime, trigger: 'blur'}],
    endSubmitTime:[{type: 'date', required: true, validator: endSubmitTime, trigger: 'blur'}],
    startReviewTimeDepartment:[{type: 'date', required: true, validator: startReviewTimeDepartment, trigger: 'blur'}],
    endReviewTimeDepartment:[{type: 'date', required: true, validator: endReviewTimeDepartment, trigger: 'blur'}],
    startReviewTimeSchool:[{type: 'date', required: true, validator: startReviewTimeSchool, trigger: 'blur'}],
    endReviewTimeSchool:[{type: 'date', required: true, validator: endReviewTimeSchool, trigger: 'blur'}]
  }
})
const {rules} = toRefs(data)

function submitTime(){
  proxy.$refs["formRefTime"].validate( valid =>{
    if(valid){
      updateMatch(props.form).then(res=>{
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