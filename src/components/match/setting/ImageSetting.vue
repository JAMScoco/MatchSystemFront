<template>
  <div>
    <div>
      <el-row>
        <el-col :span="1"></el-col>
        <el-col :span="23">
          <div style="font-size: small">
            <el-form ref="formRefImage" :rules="rules" :model="form" label-width="170px">
              <el-row>
                <el-col :span="10">
                  <el-form-item label="大赛logo" prop="email">
                    <ImageUpload v-model="form.logo" :limit="1"/>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="大赛微信公众号二维码" prop="email">
                    <ImageUpload v-model="form.qrCode" :limit="1"/>
                  </el-form-item>
                </el-col>
                <el-col :span="4" style="margin-top: 80px">
                  <el-button type="primary" @click="submitPucture(form)">保存</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div>
            <div style="margin-bottom: 10px">
              <el-row>
                <el-col :span="1">
                  <el-button type="primary" @click="showAddDialog">添加</el-button>
                </el-col>
                <el-col :span="23" style="text-align: center">
                  <span style="font-size: larger">轮播图</span>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-table v-loading="loading" :data="carouselList">
                <el-table-column type="index" label="序号" width="55" align="center"/>
                <el-table-column label="图片url" align="center" prop="url" width="100">
                  <template #default="scope">
                    <image-preview :src="scope.row.url" :width="50" :height="50"/>
                  </template>
                </el-table-column>
                <el-table-column label="链接" align="center" prop="link"/>
                <el-table-column label="图片顺序" align="center" prop="sort"/>
                <el-table-column label="备注" align="center" prop="remark"/>
                <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                  <template #default="scope">
                    <el-button
                        type="text"
                        icon="Edit"
                        @click="handleUpdate(scope.row)"
                        v-hasPermi="['match:history:edit']">修改
                    </el-button>
                    <el-button
                        type="text"
                        icon="Delete"
                        @click="handleDelete(scope.row)"
                        v-hasPermi="['match:history:edit']">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row>
    </div>
    <div>
      <el-dialog v-model="dialogFormVisible" :title="title">
        <el-form ref="carouselRef" :rules="rules" :model="carousel" label-width="180px">
          <el-form-item label="图片url" prop="url">
            <ImageUpload v-model="carousel.url" :limit="1"/>
          </el-form-item>
          <el-form-item label="点击图片后跳转的链接">
            <el-input v-model="carousel.link" placeholder="请输入链接"/>
          </el-form-item>
          <el-form-item label="图片顺序" prop="sort">
            <el-input-number v-model="carousel.sort" placeholder="请输入图片顺序"/>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="carousel.remark" type="textarea" placeholder="请输入内容"/>
          </el-form-item>
        </el-form>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCommit">确定</el-button>
      </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import {defineProps, getCurrentInstance, onMounted, reactive} from "vue";
import {
  addCarousel,
  delCarousel,
  getCarousel,
  listCarousel,
  updateCarousel
} from "../../../api/match/carousel/carousel";
import {ElMessage} from "element-plus";
import {updateMatch} from "../../../api/match/history/match";
import {useRouter} from "vue-router";


const router = useRouter()
const {proxy} = getCurrentInstance()
const dialogFormVisible = ref(false)
const carouselList = ref([]);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  rules: {
    url: [{required: true, message: '图片不能为空', trigger: 'blur'}],
    sort: [{required: true, message: '图片顺序不能为空', trigger: 'blur'}],
  },
  queryParams: {
    pageNum: 1,
    pageSize: 10,
  },
  carousel: {},
})
const {rules,queryParams,carousel} = toRefs(data)

const props = defineProps({
  form:[Object],
})

//添加和修改确定按钮
function handleCommit() {
  if (carousel.value.id === null) {
    confirmAddCarousel()
  } else {
    submitForm()
  }
}

/** 查询发布赛事的轮播图列表 */
function getList() {
  loading.value = true;
  listCarousel(queryParams.value).then(response => {
    carouselList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getCarousel(_id).then(response => {
    carousel.value = response.data;
    dialogFormVisible.value = true;
    title.value = "修改轮播图";
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除发布赛事的轮播图编号为"' + _ids + '"的数据项？').then(function () {
    return delCarousel(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {
  });
}

// 表单重置
function reset() {
  carousel.value = {
    id: null,
    url: null,
    link: null,
    matchId: null,
    sort: 0,
    delFlag: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null
  };
  proxy.resetForm("carouselRef");
}

/** 修改提交按钮 */
function submitForm() {
  updateCarousel(carousel.value).then(response => {
    proxy.$modal.msgSuccess("修改成功");
    dialogFormVisible.value = false;
    getList();
  });
}

//添加轮播图
function confirmAddCarousel() {
  proxy.$refs["carouselRef"].validate(valid => {
    if (valid) {
      addCarousel(carousel.value).then(res => {
        if (res.code === 200) {
          ElMessage({
            message: res.msg,
            type: 'success',
          })
          getList()
        } else {
          ElMessage({
            message: res.msg,
            type: 'error',
          })
        }
      })
    }
  })
  dialogFormVisible.value = false
}

//展示添加轮播图对话框
function showAddDialog() {
  reset()
  title.value = "添加轮播图";
  dialogFormVisible.value = true
}

//图片管理保存按钮
function submitPucture(data) {
  proxy.$refs["formRefImage"].validate(valid => {
    if (valid) {
      // 更新赛事
      updateMatch(data).then(res => {
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

onMounted(()=>{
  getList()
})
</script>

<style scoped>

</style>