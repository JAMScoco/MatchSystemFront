<template>
  <div>
    <div>
      <el-tabs
          v-model="activeName"
          type="card"
          class="demo-tabs"
          @tab-click="handleClick"
          style="text-align: center;">
        <div style="height: 100px"></div>
        <el-tab-pane label="基本信息" name='0'>
          <BaseInfoSetting :form="form"/>
          <el-button type="primary" plain @click="nextPage" style="margin: 10px 0">设置下一项</el-button>
        </el-tab-pane>
        <el-tab-pane label="时间设置" name='1'>
          <TimeSetting :form="form"/>
          <el-button type="primary" plain @click="nextPage" style="margin: 10px 0">设置下一项</el-button>
        </el-tab-pane>
        <el-tab-pane label="赛道设置" name='2'>
          <TrackSetting/>
          <el-button type="primary" plain @click="nextPage" style="margin: 10px 0">设置下一项</el-button>
        </el-tab-pane>
        <el-tab-pane label="图片管理" name='3'>
          <ImageSetting :form="form"/>
          <el-button type="primary" plain @click="nextPage" style="margin: 10px 0">设置下一项</el-button>
        </el-tab-pane>
        <el-tab-pane label="文件上传" name='4'>
          <FileSetting :form="form"/>
          <el-button type="primary" plain @click="nextPage" style="margin: 10px 0">设置下一项</el-button>
        </el-tab-pane>
        <el-tab-pane label="评审模板" name='5'>
          <ReviewTemplateSetting :form="form"/>
          <el-button type="primary" plain @click="nextPage" style="margin: 10px 0">设置下一项</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import {onMounted, reactive} from "vue";
import {getCurrentMatch} from "../../../api/match/history/match";
import BaseInfoSetting from "@/components/match/setting/BaseInfoSetting";
import ImageSetting from "../../../components/match/setting/ImageSetting";
import TimeSetting from "../../../components/match/setting/TimeSetting";
import {useRouter} from "vue-router";
import TrackSetting from "../../../components/match/setting/TrackSetting";
import FileSetting from "../../../components/match/setting/FileSetting";
import ReviewTemplateSetting from "../../../components/match/setting/ReviewTemplateSetting";

const activeName = ref('5')

const data = reactive({
  form: {}
})

const {form} = toRefs(data)

//点击标签页执行的方法
const handleClick = (tab, event) => {
  getCurrentMatch().then(res => {
    form.value = res.data
  })
}

//设置下一项
function nextPage() {
  if (activeName.value === '5') {
    activeName.value = '0'
  } else {
    activeName.value = String(Number(activeName.value) + 1)
  }
}

const router = useRouter();
onMounted(() => {
  getCurrentMatch().then(res => {
    if (res.data === undefined) {
      console.log(45454)
      router.push("/match/addMatch")
    } else {
      form.value = res.data
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
