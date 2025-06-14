<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="modelValue"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
    />
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import {onBeforeUnmount, shallowRef, toRef, watch} from 'vue'
import {getToken} from "@/utils/auth";
import {Toolbar, Editor} from "@wangeditor/editor-for-vue";

const emit = defineEmits();

const props = defineProps({
  modelValue: [String],
})

if (import.meta.env.PROD) {
  console.log(6)
  var modelValue = toRef(props, 'modelValue')
}

watch(() => props.modelValue, value => {
  emit("update:modelValue", value)
})

const uploadImgUrl = ref(import.meta.env.VITE_APP_BASE_API + "/common/upload"); // 上传的图片服务器地址
const headers = ref({Authorization: "Bearer " + getToken()});

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const mode = 'default'

const toolbarConfig = {}
const editorConfig = {
  placeholder: '请输入内容...', MENU_CONF: {
    'uploadImage': {
      server: uploadImgUrl.value,
      fieldName: 'file',
      maxFileSize: 10 * 1024 * 1024, // 10M
      headers: headers.value,
      customInsert(res, insertFn) {                  // JS 语法
        // res 即服务端的返回结果
        console.log(res);
        // 从 res 中找到 url alt href ，然后插入图片
        insertFn(res.url, 'not found', res.url)
      },
    },
    'uploadVideo': {
      server: uploadImgUrl.value,
      fieldName: 'file',
      maxFileSize: 10 * 1024 * 1024, // 10M
      headers: headers.value,
      customInsert(res, insertFn) {                  // JS 语法
        // res 即服务端的返回结果
        console.log(res);
        // 从 res 中找到 url alt href ，然后插入图片
        insertFn(res.url)
      },
    },

  }
}


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
