<template>
  <div style="background-color: #d6dee7;">
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

    <div style="width: 100%;height: 300px">
      <h1 style="text-align: center">赛事动态</h1>
      <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="12">
          <div style="display: flex;flex-direction: row;justify-content: center">
            <template v-for="(item) in newsList" :key="item.id">
              <MatchNewsPre :news="item"/>
            </template>
          </div>
        </el-col>
        <el-col :span="6"></el-col>
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

const newsList = ref([
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
</style>
