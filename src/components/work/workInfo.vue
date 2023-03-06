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
        <el-form ref="workRef" :model="props.form" disabled label-width="180px">
          <el-form-item label="作品名称" prop="name">
            <el-input v-model="props.form.name"/>
          </el-form-item>
          <el-form-item label="国家平台报名成功截图" prop="screenshot">
            <ImagePreview :src="props.form.screenshot" :width="200" :height="200"/>
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item label=" 作品赛道" prop="trackId">
                <el-select v-model="props.form.trackId">
                  <el-option :label="props.form.trackName"
                             :value="props.form.trackId === undefined? 0:props.form.trackId"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" 作品组别" prop="groupId">
                <el-select v-model="props.form.groupId">
                  <el-option :label="props.form.groupName"
                             :value="props.form.groupId === undefined? 0:props.form.groupId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label=" 作品类别" prop="categoryId">
                <el-select v-model="props.form.categoryId">
                  <el-option :label="props.form.categoryName"
                             :value="props.form.categoryId === undefined? 0:props.form.categoryId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="作品概述" prop="overview">
            <el-input v-model="props.form.overview" type="textarea" :rows="5"/>
          </el-form-item>
          <el-row :gutter="8">
            <el-col :span="10" :offset="4">
              <b>其他成员：</b>
              <br>
              <br>
              <el-table :data="props.form.memberList" style="height: 200px" max-height="200">
                <el-table-column fixed label="姓名" width="100" align="center" prop="name"/>
                <el-table-column label="学号" align="center" prop="sno"/>
                <el-table-column label="专业" align="center" prop="major"/>
                <el-table-column label="手机号" align="center" prop="phone"/>
              </el-table>
            </el-col>
            <el-col :span="10">
              <b>指导老师：</b>
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
              </el-table>
            </el-col>
          </el-row>
          <br>
          <br>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="props.form.remark" :rows="4" type="textarea"/>
          </el-form-item>
        </el-form>
        <el-row>
          <el-col :span="10" :offset="4">
            <template v-if="props.form.report">
              作品报告：
              <el-button type="primary" @click="handleDownload(props.form.report)">点击下载</el-button>
            </template>
          </el-col>
          <el-col :span="10">
            <template v-if="props.form.attachment">
              作品附件：
              <el-button type="primary" @click="handleDownload(props.form.attachment)">点击下载</el-button>
            </template>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>

import ImagePreview from "@/components/ImagePreview";
import {getCurrentInstance} from "vue";

const {proxy} = getCurrentInstance();

//引入用户性别字典
const {sys_user_sex} = proxy.useDict('sys_user_sex')

const props = defineProps({
  form: [Object]
})

function handleDownload(res) {
  proxy.$download.resource(res)
}

</script>

<style scoped>

</style>
