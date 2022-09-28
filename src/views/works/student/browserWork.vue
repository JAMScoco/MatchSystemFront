<template>
  <WorkInfo :form="form"/>
</template>

<script setup>
import WorkInfo from '@/components/work/workInfo'
import {currentWorkInfo} from "@/api/works/work";
import {ElMessageBox} from "element-plus";
import {useRouter} from "vue-router";

const form = ref({})

const router = useRouter()

currentWorkInfo().then(res=>{
  if (res.msg === 'ok'){
    form.value = res.data
  }else {
    ElMessageBox.alert(res.msg, "提示", {
      type: 'error',
      showClose: false,
      callback: () => {
        router.push('/index')
      }
    })
  }
})
</script>

<style scoped>

</style>
