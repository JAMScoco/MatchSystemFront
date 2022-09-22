<template>
  <div>
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
      <swiper-slide v-for="(item,index) in carouselList">
        <a :href="item.link">
          <img :src="item.url" alt="" style="width: 100%;height: 100%">
        </a>
      </swiper-slide>
    </swiper>
    <h1 style="text-align: center">赛事动态</h1>
    <el-row>
      <el-col :span="6"></el-col>
      <el-col >
        s
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script setup>
import {Swiper, SwiperSlide} from 'swiper/vue';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import {Pagination, Navigation} from "swiper";
const modules = ref([Pagination, Navigation])

import {useRouter} from "vue-router";

const router = useRouter()

const carouselList = ref([
  {
    id:'1',
    url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F5f1b4b1640a5427c1d32a621c644b46081e9712e.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666445822&t=446f1b5f9c006da08e2015e48cf9bbb7',
    link:'#',
    sort:1
  },
  {
    id:'2',
    url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F55a9ea8c2665e3cfff013a7bda63d87316599089.jpg&refer=http%3A%2F%2Fi0.hdslb.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666445822&t=737845acfc6bad92fb4782400e1f587b',
    link:'#',
    sort:2
  },
])

function toNews() {
  console.log(router)
  router.push('/home/news')
}
</script>

<style scoped>
.mySwiper{
  height: 700px;
}
</style>
