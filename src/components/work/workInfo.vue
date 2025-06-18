<template>
  <div>
    <el-row style="margin-top: 50px">
      <el-col :span="13" :offset="4">
        <el-row>
          <el-col :span="7" :offset="3">
            <b>负责人姓名：</b> {{ props.form.trueName }}
          </el-col>
          <el-col :span="7">
            <b> 学号：</b>{{ props.form.sno }}
          </el-col>
          <el-col :span="7">
            <b>手机号：</b>{{ props.form.phonenumber }}
          </el-col>
        </el-row>
        <br>
        <el-row>
          <el-col :span="7" :offset="3">
            <b>身份：</b> {{ props.form.level }}
          </el-col>
          <el-col :span="7">
            <b> 院系：</b>{{ props.form.deptName }}
          </el-col>
          <!--          <el-col :span="7">-->
          <!--            <b>手机号：</b>{{ userInfo.phonenumber }}-->
          <!--          </el-col>-->
        </el-row>
        <br>
        <el-form ref="workRef" :model="props.form" :disabled="props.onlyRead" label-width="180px">
          <el-form-item label="作品名称" prop="name">
            <el-input  v-model="props.form.name"/>
            <el-button v-if="!props.onlyRead" type="primary" style="margin-top: 10px" @click="changeWorksInfo('name',props.form.name)">
              保存名称修改
            </el-button>
          </el-form-item>
          <el-form-item label="国家平台报名成功截图" prop="screenshot">
            <ImagePreview :src="props.form.screenshot" :width="200" :height="200"/>
            <p v-if="!props.onlyRead" style="margin-left: 20px">上传新截图：</p>
            <image-upload v-if="!props.onlyRead" :limit="1" v-model="newScreenShot"/>
            <el-button v-if="!props.onlyRead" type="primary" style="margin-top: 10px" @click="changeWorksInfo('ScreenShot',newScreenShot)">
              保存新截图
            </el-button>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label=" 作品赛道" prop="trackId">
                {{ props.form.trackName }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" 作品组别" prop="groupId">
                {{ props.form.groupName }}
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" 作品类别" prop="categoryId">
                {{ props.form.categoryName }}
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="作品概述" prop="overview">
            <el-input v-model="props.form.overview" :disabled="props.onlyRead" type="textarea" :rows="7"/>
            <el-button v-if="!props.onlyRead" type="primary" style="margin-top: 10px" @click="changeWorksInfo('overview',props.form.overview)">
              保存描述修改
            </el-button>
          </el-form-item>
          <el-row>
            <el-col :span="20" :offset="2">
              <b>团队成员：</b>
<!--              <el-button type="primary" style="margin: 10px" @click="addWorkMember">添加新成员</el-button>-->
              <br>
              <br>
              <el-table :data="props.form.memberList" style="height: 200px" max-height="200">
                <el-table-column fixed label="姓名" width="100" align="center" prop="name"/>
                <el-table-column label="学号" align="center" prop="sno"/>
                <el-table-column label="专业" align="center" prop="major"/>
                <el-table-column label="手机号" align="center" prop="phone"/>
<!--                <el-table-column label="操作">-->
<!--                  <template #default="scope">-->
<!--                    <el-button type="danger" size="small" style="margin-top: 10px"-->
<!--                               @click="deleteWorkMember(scope.row.id)">删除该成员-->
<!--                    </el-button>-->
<!--                  </template>-->
<!--                </el-table-column>-->
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <b>指导老师：</b>
<!--              <el-button type="primary" style="margin: 10px" @click="addWorkMember">添加新指导老师</el-button>-->
              <br>
              <br>
              <el-table :data="props.form.teacherList" style="height: 200px" max-height="200">
                <el-table-column label="姓名" align="center" fixed prop="name"/>
                <el-table-column label="职工号码" align="center" prop="number"/>
                <el-table-column label="性别" align="center" prop="gender">
                  <template #default="scope">
                    <dict-tag :options="sys_user_sex" :value="scope.row.gender"/>
                  </template>
                </el-table-column>
                <el-table-column label="职称" align="center" prop="level"/>
                <el-table-column label="专业" align="center" prop="major"/>
                <el-table-column label="手机" align="center" prop="phone"/>
<!--                <el-table-column label="操作">-->
<!--                  <template #default="scope">-->
<!--                    <el-button type="danger" size="small" style="margin-top: 10px"-->
<!--                               @click="deleteWorkMember(scope.row.id)">删除该成员-->
<!--                    </el-button>-->
<!--                  </template>-->
<!--                </el-table-column>-->
              </el-table>
            </el-col>
          </el-row>
          <br>
          <br>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="props.form.remark" :rows="4" type="textarea"/>
            <el-button v-if="!props.onlyRead" type="primary" style="margin-top: 10px" @click="changeWorksInfo('remark',props.form.remark)">
              保存备注修改
            </el-button>
          </el-form-item>
        </el-form>
        <el-divider/>
        <el-row>
          <el-col :span="10" :offset="2">
              <b>作品报告（商业计划书）：</b>
              <el-button v-if="props.form.report" type="primary" @click="handlePreview(props.form.report)">点击查看</el-button>
              <p v-if="!props.onlyRead" style="margin-left: 20px">上传新计划书：</p>
              <file-upload v-if="!props.onlyRead" :limit="1" :fileSize="30" v-model="newReport" :file-type="['pdf']"/>
              <el-button v-if="!props.onlyRead" type="primary" style="margin-top: 10px" @click="changeWorksInfo('report',newReport)">
                保存新计划书
              </el-button>
          </el-col>

        </el-row>
        <el-divider/>
        <el-row>
          <el-col :offset="2">
            <b>作品附件链接：</b>
            <br>
            <br>
            <el-input :disabled="props.onlyRead" v-model="props.form.attachment"></el-input>
            <el-button v-if="!props.onlyRead" type="primary" style="margin-top: 10px"
                       @click="changeWorksInfo('attachment',props.form.attachment)">保存
            </el-button>
            <el-button type="primary" style="margin-top: 10px" @click="previewAttachment(props.form.attachment)">跳转查看</el-button>
          </el-col>
        </el-row>
        <el-divider/>
        <br>
        <br>
        <br>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

import ImagePreview from "@/components/ImagePreview";
import {getCurrentInstance, ref} from "vue";
import {apiChangeWorksInfo} from "@/api/works/work";
import {ElMessage} from "element-plus";

const {proxy} = getCurrentInstance();

const newScreenShot = ref('')
const newReport = ref('')

//引入用户性别字典
const {sys_user_sex} = proxy.useDict('sys_user_sex')

const props = defineProps({
  form: [Object],
  onlyRead:Boolean
})

function handleDownload(res) {
  proxy.$download.resource(res)
}

function handlePreview(res) {
  proxy.$download.previewPDF(res)
}

function changeWorksInfo(key, value) {
  if (value === '' && key==='report'){
    ElMessage.info('正在上传，请稍等')
    return
  }
  apiChangeWorksInfo(props.form.id, key, value).then(() => {
    location.reload()
  })
}


function previewAttachment(url) {
  window.open(url, '_blank')
}

console.log(proxy);
</script>

<style scoped>

</style>
