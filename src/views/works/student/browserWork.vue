<template>
  <div>
    <div style="text-align: center;margin-top: 50px">
      <el-button type="primary" @click="changeWorks">我要修改</el-button>
    </div>

    <WorkInfo :form="form"/>
  </div>
</template>

<script setup>
import WorkInfo from '@/components/work/workInfo'
import {apiChangeWorks, currentWorkInfo} from "@/api/works/work";
import {ElMessageBox,ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {getCurrentInstance,ref} from "vue";

const {proxy} = getCurrentInstance()

const form = ref({})

const router = useRouter()

function changeWorks() {
  ElMessageBox.confirm('修改作品需要重新提交作品，且管理员已审核通过的作品无法修改，是否继续？', "提示", {
    type: 'warning',
    confirmButtonText: '我需要修改',
    cancelButtonText: '取消'
  }).then(()=>{
    apiChangeWorks(form.value.id).then(res=>{
      if (res.msg === 'ok'){
        ElMessageBox.alert("申请修改成功，请在提交作品页面重新提交", "提示", {
          type: 'success',
          showClose: false,
          callback: () => {
            proxy.$tab.closePage(router.currentRoute.value)
            router.push('/index')
          }
        })
      }else {
        ElMessageBox.alert(res.msg, "提示", {
          type: 'error',
          showClose: false,
          callback: () => {
            proxy.$tab.closePage(router.currentRoute.value)
            router.push('/index')
          }
        })
      }
    })
  }).catch(()=>{
    ElMessage({
      type: 'info',
      message: '操作取消',
    })
  })



}

currentWorkInfo().then(res=>{
  if (res.msg === 'ok'){
    form.value = res.data
  }else {
    ElMessageBox.alert(res.msg, "提示", {
      type: 'error',
      showClose: false,
      callback: () => {
        proxy.$tab.closePage(router.currentRoute.value)
        router.push('/index')
      }
    })
  }
})
</script>

<style scoped>

</style>
