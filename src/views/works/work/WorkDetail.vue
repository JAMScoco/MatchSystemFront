<template>
  <div>
    <WorkInfo :form="form" :only-read="true"/>
    <div style="text-align: center;margin: 30px 0">
      <el-button type="primary" plain @click="turnBack">返回</el-button>
    </div>
  </div>
</template>

<script setup>
import WorkInfo from "../../../components/work/workInfo";
import {useRouter} from "vue-router";
import {getWork} from "../../../api/works/work";
import {getCurrentInstance, reactive} from "vue";
const router = useRouter()
const {proxy} = getCurrentInstance()

const data = reactive({
  form:{}
})

const {form} = toRefs(data)

const id = router.currentRoute.value.query.id

getWork(id).then(res=>{
  form.value = res.data
})

function turnBack(){
  proxy.$tab.closePage(router.currentRoute.value)
  router.back()
}

</script>

<style scoped>

</style>