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
          <img :src="item.url" alt="" style="width: 100%;height: 100%">
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
      <h1 style="text-align: center">院系动态</h1>
      <el-row>
        <el-col :offset="17">
          <router-link to="/home/news"><span style="font-size: small">更多→</span></router-link>
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

    <!--大赛相关-->
    <div style="width: 100%;height: 1400px">
      <h1 style="text-align: center">大赛相关</h1>
      <el-row>
        <el-col :span="12" :offset="6">
          <el-card>
            <el-row>
              <!--大赛流畅时间,联系方式,资料下载 -->
              <el-col :span="8" style="padding-right: 10px">
                <h3>时间安排</h3>
                <el-timeline>
                  <el-timeline-item
                      v-for="(activity, index) in activities"
                      :key="index"
                      :icon="activity.icon"
                      :type="activity.type"
                      :color="activity.color"
                      :size="activity.size"
                      :hollow="activity.hollow"
                      :timestamp="activity.timestamp">
                    {{ activity.content }}
                  </el-timeline-item>
                </el-timeline>
                <el-divider/>
                <h3>联系方式</h3>
                <el-descriptions :column="1">
                  <el-descriptions-item label="邮编：">
                    {{ matchInfo.postcode }}
                  </el-descriptions-item>
                  <el-descriptions-item label="邮箱：">
                    {{ matchInfo.email }}
                  </el-descriptions-item>
                  <el-descriptions-item label="地址：">
                    {{ matchInfo.address }}
                  </el-descriptions-item>
                </el-descriptions>
                <el-divider/>
                <h3>资料下载</h3>
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
                <h3>相关信息</h3>
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
                    <template v-for="item in matchInfo.tracks">
                      <b>{{ item.name }}</b>：{{ item.groups }}
                      <br>
                      <br>
                    </template>
                  </el-descriptions-item>
                  <el-descriptions-item label="参赛类别">
                    <template v-for="item in matchInfo.tracks">
                      <b>{{ item.name }}</b>：{{ item.categories }}
                      <br>
                      <br>
                    </template>
                  </el-descriptions-item>
                  <el-descriptions-item label="奖项设置" :span="2" label-align="center">
                    <template v-for="item in matchInfo.tracks">
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
const carouselList = ref([
  {
    id: '1',
    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F5f1b4b1640a5427c1d32a621c644b46081e9712e.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666445822&t=446f1b5f9c006da08e2015e48cf9bbb7',
    link: '#',
    sort: 1
  },
  {
    id: '2',
    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F55a9ea8c2665e3cfff013a7bda63d87316599089.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666445822&t=737845acfc6bad92fb4782400e1f587b',
    link: '#',
    sort: 2
  },
])


import MatchNewsPre from '@/components/home/MatchNewsPre'
//大赛动态列表
const matchNewsList = ref([
  {
    id: '1',
    title: '发顺丰爽肤水还得回趟合议庭个人提供人挺好',
    picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-427690dc45a015c017307b1fda57f578_r.jpg%3Fsource%3D1940ef5c&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666452216&t=51c26447773fef1a3c71a0f0df144b36',
    createTime: '2022-09-22 14:12:14'
  },
  {
    id: '2',
    title: '发顺丰爽肤水还得回趟合议庭个人提供人挺好',
    picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-427690dc45a015c017307b1fda57f578_r.jpg%3Fsource%3D1940ef5c&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666452216&t=51c26447773fef1a3c71a0f0df144b36',
    createTime: '2022-09-22 14:12:14'
  },
  {
    id: '3',
    title: '发顺丰爽肤水还得回趟合议庭个人提供人挺好',
    picture: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic2.zhimg.com%2Fv2-427690dc45a015c017307b1fda57f578_r.jpg%3Fsource%3D1940ef5c&refer=http%3A%2F%2Fpic2.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666452216&t=51c26447773fef1a3c71a0f0df144b36',
    createTime: '2022-09-22 14:12:14'
  }
])


//大赛时间流程信息
const activities = [
  {
    content: '开始报名',
    timestamp: '2018-04-12',
    size: 'large',
    type: 'primary',
    color: '#0bbd87',
  },
  {
    content: '报名截止',
    timestamp: '2018-04-03 20:46',
    color: '#0bbd87',
  },
  {
    content: '院级评审开始',
    timestamp: '2018-04-03 20:46',
    size: 'large',
    color: '#0bbd87',
  },
  {
    content: '院级评审结束',
    timestamp: '2018-04-03 20:46',
    type: 'primary',
    color: '#0bbd87',
  },
  {
    content: '校级评审开始',
    timestamp: '2018-04-03 20:46',
  },
  {
    content: '校级评审结束',
    timestamp: '2018-04-03 20:46',
  }
]

//大赛基本信息
const matchInfo = {
  organizingCommittee: "大赛设立组织委员会（简称大赛组委会），由教育部和重庆市人民政府主要负责同志担任主任，教育部和重庆市分管领导担任副主任，教育部高等教育司主要负责同志担任秘书长，有关部门（单位）负责人作为成员，负责大赛的组织实施。",
  address: "耳朵hi噢if寄给我批输入及评估我居然敢为即为所wig将文件柜我加个",
  postcode: "166562",
  email: "88888888@qq.com",
  expertCommittee: "大赛设立专家委员会，负责项目评审等工作。",
  competitionNotice: null,
  reviewRules: null,
  studentOperationManual: null,
  competitionGuide: null,
  collegeSchoolOperationManual: null,
  businessCooperationInvitation: null,
  competitionReviewManual: null,
  tracks: [
    {
      name: '高教主赛道',
      groups: '研究生组：创意组、初创组、成长组',
      categories: '新工科类、新医科类、新农科类、新文科类',
      awardContent: '中国大陆参赛项目设金奖150个、银奖350个、铜奖1000个，中国港澳台地区参赛项目设金奖5个、银奖15个、铜奖另定，国际参赛项目设金奖50个、银奖100个、铜奖350个；设置最佳创意奖、最佳带动就业奖、最具商业价值奖等若干单项奖；获得金奖项目的指导教师为“优秀创新创业导师”（限前五名）。'
    },
    {
      name: '青年红色筑梦之旅赛道',
      groups: '公益组、创意组、创业组',
      categories: '“互联网+”现代农业、“互联网+”制造业、“互联网+”信息技术服务、“互联网+”文化创意服务、“互联网+”社会服务',
      awardContent: '设置金奖50个、银奖100个、铜奖350个；设置乡村振兴奖、最佳公益奖等单项奖；获得金奖项目的指导教师为“优秀创新创业导师”（限前五名）。'
    },
    {
      name: '职教赛道',
      groups: '创意组、创业组',
      categories: '创新类、商业类、工匠类',
      awardContent: '设置金奖50个、银奖100个、铜奖350个；获得金奖项目的指导教师为“优秀创新创业导师”（限前五名）。'
    }
  ],
}

const hasMaterials = computed(()=>{

  return (matchInfo.competitionNotice != null)
      || (matchInfo.reviewRules != null)
      || (matchInfo.studentOperationManual != null)
      || (matchInfo.competitionGuide != null)
      || (matchInfo.collegeSchoolOperationManual != null)
      || (matchInfo.businessCooperationInvitation != null)
      || (matchInfo.competitionReviewManual != null)
})


import {useRouter} from "vue-router";
import {computed} from "vue";

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
