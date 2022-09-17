<template>
  <div>
    <el-row class="head">
      <el-col :span="4"></el-col>
      <el-col :span="16">
        <div class="head_box">
          <div style="display: flex;flex-direction: row">
            <img src="../assets/logo/logo.png"/>
            <span style="margin-top: 10px">全国大学生创业服务网</span>
          </div>
          <div>
            <router-link to="#">首页</router-link>
            <router-link to="#">赛事动态</router-link>
            <router-link to="#">院系动态</router-link>
          </div>
          <div>
            <router-link to="#">登录</router-link>
            <router-link to="#">注册</router-link>
          </div>
        </div>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
    <router-view></router-view>
    <el-row class="foot">
      <el-col :span="4"></el-col>
      <el-col :span="16">
        <div class="foot_box">
          <div>
            <img src="../assets/logo/logo.png"/>
          </div>
          <div>
            <div style="display: flex;flex-direction: row">
              <a href="#">国家24365大学生就业服务平台 </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
              <a href="#">联系我们 </a>
            </div>
            <div>
              <p>版权所有：教育部学生服务与素质发展中心（原全国高等学校学生信息咨询与就业指导中心）</p>
            </div>
          </div>
          <div style="display: flex;flex-direction: row">
            <div>
              <div>
                <img src="../assets/icons/svg/cascader.svg" alt="大创网官方微信平台">
              </div>
              <div>
                <span>大创网官方微信平台</span>
              </div>
            </div>
            <div>
              <div>
                <img src="../assets/icons/svg/cascader.svg" alt="大赛官方微信号">
              </div>
              <div>
                <span>大赛官方微信号</span>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="4"></el-col>
    </el-row>
  </div>
</template>

<script setup>

</script>

<style scoped>

.head {
  height: 50px;
  background-color: #eef1f6;
}

.head_box {
  display: flex;
  flex-direction: row;
}

.foot {
  height: 150px;
  background-color: #909399;
}

.foot_box {
  display: flex;
  flex-direction: row;
}

</style>
