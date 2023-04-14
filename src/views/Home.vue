<template>
  <div class="content">
    <el-row class="head">
      <el-col :span="4" :offset="2">
        <div style="display: flex;flex-direction: row">
          <img src="../assets/logo/logo.png" style="height: 50px;width: 50px;margin-top: 5px;margin-right: 10px"/>
          <h3 style="margin-top: 20px;white-space: nowrap;">长江大学大学生创新创业大赛管理系统</h3>
        </div>
      </el-col>
      <el-col :span="2" :offset="2">
        <router-link to="/home/index"><h2 style="text-align: center">首页</h2></router-link>
      </el-col>
      <el-col :span="2">
        <router-link to="/home/news"><h2>大赛动态</h2></router-link>
      </el-col>
      <el-col :span="2">
        <router-link to="/home/news"><h2>学院动态</h2></router-link>
      </el-col>

      <el-col :span="1" :offset="6" style="text-align: center;">
        <p style="margin-top: 20px"><router-link to="/login">登录</router-link></p>
      </el-col>
      <el-col :span="1"  style="text-align: center;">
        <p style="margin-top: 20px"><router-link to="/register">注册</router-link></p>
      </el-col>
      <el-col :span="2"  style="text-align: center;">
        <p style="margin-top: 20px"><router-link to="/login">管理入口</router-link></p>
      </el-col>
    </el-row>
    <router-view></router-view>
    <el-row class="foot">
      <el-col :span="2" :offset="5">
        <img src="../assets/images/profile.jpg" style="height: 70px;width: 70px;margin-top: 40px"/>
      </el-col>
      <el-col :span="7">
        <div style="margin-top: 35px;">
          <a href="https://www.yangtzeu.edu.cn/" target="_blank">长江大学创新创业官网</a>|
          <a href="https://www.yangtzeu.edu.cn/" target="_blank">长江大学 </a>|
          <a href="https://www.yangtzeu.edu.cn/" target="_blank">联系我们 </a>
          <p style="font-size: small">版权所有：教育部学生服务与素质发展中心（原全国高等学校学生信息咨询与就业指导中心）</p>
          <p style="font-size: small">京ICP备xxxxxxx号-1京公网安备xxxxxxxxxxxxxx号</p>
        </div>
      </el-col>
      <el-col :span="2" style="text-align: center">
        <img src="../assets/images/profile.jpg" style="height: 80px;width: 80px;margin-top: 25px"/>
        <p style="font-size: small;margin-top: 2px">大赛官方微信平台</p>
      </el-col>
      <el-col :span="2" style="text-align: center">
        <img src="../assets/images/profile.jpg" style="height: 80px;width: 80px;margin-top: 25px"/>
        <p style="font-size: small;margin-top: 2px">大赛官方微信号</p>
      </el-col>
    </el-row>
    <el-backtop :right="100" :bottom="100"/>
  </div>
</template>

<script setup>

</script>

<style scoped>

.head {
  height: 64px;
  background-color: #f2f2f2;
}

.foot {
  height: 150px;
  background-color: #312c2c;
  color: white;
}

.content{
  overflow-x: hidden;
}

</style>
