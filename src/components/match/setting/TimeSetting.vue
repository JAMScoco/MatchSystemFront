<template>
  <div>
    <el-row>
      <el-col :span="4"></el-col>
      <el-col :span="16" style="text-align: center">
        <el-form ref="formRefTime" :rules="rules" :model="form" label-width="180px">
          <el-row>
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
          <el-row>
            <el-col :span="11">
              <el-form-item label="开始提交作品时间" prop="startSubmitTime">
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
              <el-form-item label="结束提交作品时间" prop="endSubmitTime">
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
          <el-row>
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
          <el-row>
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
        </el-form>
        <el-button type="primary" @click="submitInfo(form)">保存</el-button>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
  </div>
</template>

<script setup>

const data = reactive({
  form:{},
  rules:[]
})

const {form,rules} = toRefs(data)

</script>

<style scoped>

</style>