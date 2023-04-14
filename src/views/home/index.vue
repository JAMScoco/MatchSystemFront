<template>
  <div style="background-color: #f2f2f2;width: 100%">
    <!--轮播图-->
    <swiper
        :slidesPerView="1"
        :spaceBetween="30"
        :loop="true"
        :pagination="{
            clickable: true,
        }"
        :navigation="true"
        :modules="modules"
        class="mySwiper"
    >
      <swiper-slide v-for="(item) in carouselList" :key="item.id">
        <a :href="item.link">
          <img :src="'/dev-api'+item.url" alt="" style="width: 100%;height: 100%">
        </a>
      </swiper-slide>
    </swiper>

    <!--赛事动态-->
    <div style="width: 100%;height: 400px">
      <h1 style="text-align: center">赛事动态</h1>
      <el-row>
        <el-col :offset="17">
          <router-link to="/home/news"><span style="color: dodgerblue;font-size: small">更多→</span></router-link>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <div style="display: flex;flex-direction: row;justify-content: center">
            <template v-for="(item) in matchNewsList" :key="item.id">
              <MatchNewsPre :news="item"/>
            </template>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--院系动态-->
    <div style="width: 100%;height: 400px;background-color: #1c84c6;padding-top: 20px;color: white">
      <h1 style="text-align: center">学院动态</h1>
      <el-row>
        <el-col :offset="17">
          <router-link to="/home/news"><span style="font-size: small">更多→</span></router-link>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12" :offset="6">
          <div style="display: flex;flex-direction: row;justify-content: center">
            <template v-for="(item) in departmentNewsList" :key="item.id">
              <MatchNewsPre :news="item"/>
            </template>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--大赛相关-->
    <div style="width: 100%;height: 1400px">
      <h1 style="text-align: center">大赛相关</h1>
      <el-row>
        <el-col :span="20" :offset="2">
          <el-card>
            <el-row>
              <!--大赛流畅时间,联系方式,资料下载 -->
              <el-col :span="8" style="padding-right: 10px">
                <h2>时间安排</h2>
                <el-timeline>
                  <el-timeline-item
                      v-for="(activity, index) in matchTimes"
                      :key="index"
                      :type="activity.type"
                      :color="activity.color"
                      :size="activity.size"
                      :timestamp="activity.timestamp">
                    {{ activity.content }}
                  </el-timeline-item>
                </el-timeline>
                <el-divider/>
                <h2>联系方式</h2>
                <el-descriptions :column="1">
                  <el-descriptions-item label="联系电话：">
                    {{ matchInfo.postcode }}
                  </el-descriptions-item>
                  <el-descriptions-item label="承办方：">
                    {{ matchInfo.email }}
                  </el-descriptions-item>
                  <el-descriptions-item label="地址：">
                    {{ matchInfo.address }}
                  </el-descriptions-item>
                </el-descriptions>
                <el-divider/>
                <h2>资料下载</h2>
                <div v-if="hasMaterials" class="material_download">
                  <div v-if="matchInfo.competitionNotice != null" class="material_download_item">
                    <a href="#">大赛通知</a>
                  </div>
                  <div v-if="matchInfo.reviewRules != null" class="material_download_item">
                    <a href="#">评审规则</a>
                  </div>
                  <div v-if="matchInfo.studentOperationManual != null" class="material_download_item">
                    <a href="#">学生操作手册</a>
                  </div>
                  <div v-if="matchInfo.competitionGuide != null" class="material_download_item">
                    <a href="#">大赛指南</a>
                  </div>
                  <div v-if="matchInfo.collegeSchoolOperationManual != null" class="material_download_item">
                    <a href="#">院级校级操作手册</a>
                  </div>
                  <div v-if="matchInfo.businessCooperationInvitation != null" class="material_download_item">
                    <a href="#">商业合作邀请函</a>
                  </div>
                  <div v-if="matchInfo.competitionReviewManual != null" class="material_download_item">
                    <a href="#">大赛评审手册</a>
                  </div>
                </div>
                <el-empty v-else description="暂无" style="width: 100%;height: 200px;"/>
              </el-col>

              <!--大赛信息展示-->
              <el-col :span="16">
                <h2>相关信息</h2>
                <el-descriptions
                    direction="vertical"
                    :column="2"
                    border>
                  <el-descriptions-item label="大赛委员会">
                    <br>
                    {{ matchInfo.organizingCommittee }}
                    <br>
                    <br>
                  </el-descriptions-item>
                  <el-descriptions-item label="专家委员会">
                    {{ matchInfo.expertCommittee }}
                  </el-descriptions-item>
                  <el-descriptions-item label="参赛组别">
                    <template v-for="item in matchTracks">
                      <b>{{ item.name }}</b>：{{ item.groups }}
                      <br>
                      <br>
                    </template>
                  </el-descriptions-item>
                  <el-descriptions-item label="参赛类别">
                    <template v-for="item in matchTracks">
                      <b>{{ item.name }}</b>：{{ item.categories }}
                      <br>
                      <br>
                    </template>
                  </el-descriptions-item>
                  <el-descriptions-item label="奖项设置" :span="2" label-align="center">
                    <template v-for="item in matchTracks">
                      <b>{{ item.name }}</b>：{{ item.awardContent }}
                      <br>
                      <br>
                    </template>
                  </el-descriptions-item>
                </el-descriptions>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
import {Pagination, Navigation} from "swiper";

const modules = ref([Pagination, Navigation])
//轮播图列表
const carouselList = ref([])


import MatchNewsPre from '@/components/home/MatchNewsPre'
//大赛动态列表
const matchNewsList = ref([])
//院系动态列表
const departmentNewsList = ref([])

//大赛时间流程信息
const matchTimes =ref([])

//大赛基本信息
const matchInfo = ref({})

//主页赛道显示信息
const matchTracks =ref([])


import {computed, onMounted} from "vue";
const hasMaterials = computed(()=>{

  return (matchInfo.competitionNotice != null)
      || (matchInfo.reviewRules != null)
      || (matchInfo.studentOperationManual != null)
      || (matchInfo.competitionGuide != null)
      || (matchInfo.collegeSchoolOperationManual != null)
      || (matchInfo.businessCooperationInvitation != null)
      || (matchInfo.competitionReviewManual != null)
})

import {getIndexInfo} from "@/api/home";
onMounted(()=>{
  getIndexInfo().then(res =>{
    var {matchInfo:info,carouselList:carousels,matchNewsList:matchNews,departmentNewsList:departmentNews,matchTimes:times,matchTracks:tracks} = res.data
    matchInfo.value = info
    carouselList.value = carousels
    matchNewsList.value = matchNews
    departmentNewsList.value = departmentNews
    matchTimes.value = times
    matchTracks.value = tracks
  })
})


import {useRouter} from "vue-router";

const router = useRouter()

function toNews() {
  console.log(router)
  router.push('/home/news')
}
</script>

<style scoped>
.mySwiper {
  height: 700px;
}

h3 {
  text-align: center;
  margin-bottom: 30px;
}

/*资料下载布局样式*/
.material_download {
  margin-top: 50px;
  text-decoration: underline;
  font-size: small;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-items: start;
}

.material_download_item {
  height: 50px;
  width: 50%;
  text-align: center
}

.labelText {
  font-weight: bold;
  background-color: red;
}

</style>
