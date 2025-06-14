<template>
  <div style="border: 1px solid #ccc">
    <Editor
        style="height: 1000px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        @onCreated="handleCreated"
    />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {getNews} from "@/api/school/news";
import {useRouter} from "vue-router";
const router = useRouter()

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

// 模拟 ajax 异步获取内容
onMounted(() => {
  const newsId = router.currentRoute.value.params.newsId
  getNews(newsId).then(res=>{
    console.log(res)
    valueHtml.value = res.data.content
  })
})

const editorConfig = { readOnly :'true' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

</script>

<style scoped>

</style>
