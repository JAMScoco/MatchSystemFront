<template>
  <div>
    <div>
      <el-tabs
          v-model="activeName"
          type="card"
          class="demo-tabs"
          @tab-click="handleClick"
      >
        <el-tab-pane label="基本信息" name="first">
          <div>
            <el-row>
              <el-col :span="6"></el-col>
              <el-col :span="12">
                <el-form :model="form" label-width="120px">
                  <el-form-item label="大赛名称">
                    <el-input v-model="form.name"/>
                  </el-form-item>
                  <el-form-item label="大赛组委会">
                    <el-input v-model="form.organizingCommittee"/>
                  </el-form-item>
                  <el-form-item label="地址">
                    <el-input v-model="form.address"/>
                  </el-form-item>
                  <el-form-item label="邮编">
                    <el-input v-model="form.postcode"/>
                  </el-form-item>
                  <el-form-item label="大赛投诉邮箱">
                    <el-input v-model="form.email"/>
                  </el-form-item>
                  <el-form-item label="专家委员会">
                    <el-input v-model="form.expertCommittee"/>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="6"></el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="时间设置" name="second">时间设置</el-tab-pane>
        <el-tab-pane label="赛道设置" name="third">赛道设置</el-tab-pane>
        <el-tab-pane label="图片管理" name="fourth">图片管理</el-tab-pane>
        <el-tab-pane label="文件上传" name="fifth">文件上传</el-tab-pane>
        <el-tab-pane label="评审模板" name="sixth">评审模板</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import {getCurrentMatch} from "../../../api/match/history/match";

const router = useRouter()

const data = reactive({
  form: {}
})

const {form} = toRefs(data)

const handleClick = (tab,event) => {
  console.log(tab.props.label);
  console.log(event.type)
  if(tab.props.label === '基本信息' && event.type === 'click'){
    getCurrentMatch().then(res => {
      form.value = res.data
    })
  }
}

onMounted(() => {
  getCurrentMatch().then(res => {
    if (res.data === undefined) {
      router.push("/match/addMatch")
    }
  })
})

</script>

<style scoped>

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
