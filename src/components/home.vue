<template>
  <el-container class="home-container">
    <el-header>
      <div class="logo-title">
        <img src="../assets/heima_logo.png" alt="">
        <h2>电商后台管理系统</h2>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <!-- 左侧的menu菜单 -->
      <el-aside :width="iscollapse ? '65px' : '200px'">
        <!-- 折叠展开 menu 的 bar -->
        <div class="toggleBar" @click="iscollapse = !iscollapse">|||</div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#373d41"
          text-color="#fff"
          active-text-color="#409eff"
          router
          unique-opened
          :collapse="iscollapse"
          :collapse-transition="false">
          <!-- 循环创建一级菜单 -->
          <el-submenu
          :index="item.id + ''"
          v-for="(item, i) in menu"
          :key="item.id"
          :class="iscollapse ? 'el_submenu_small': 'el_submenu_large'">
            <template slot="title">
              <!-- 左侧的小图标 -->
              <i :class="['iconfont', iconlist[i]]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 循环创建二级菜单 -->
              <!-- :index 的索引最好不要用 id 点击时可以设置跳转的路由 element-ui 中有一个属性 router 会用到 index -->
            <el-menu-item
            :index="'/' + subitem.path"
            v-for="subitem in item.children"
            :key="subitem.id">
              <i class="el-icon-menu"></i>
              {{subitem.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧的主菜单 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 左侧菜单列表数组，默认为空
      menu: [],
      // 左侧菜单项对应的图标数组
      iconlist: ['icon-users', 'icon-tijikongjian', 'icon-shangpin', 'icon-danju', 'icon-baobiao'],
      // 是否被折叠 element-ui 自带的属性
      iscollapse: false
    }
  },
  methods: {
    logout() {
      // 清除token
      window.sessionStorage.removeItem('token')
      // 强制跳转到登录页面
      this.$router.push('/login')
    },
    // 获取左侧菜单列表
    async getmenus() {
      const {data: res} = await this.$http.get('/menus')
      if (res.meta.status !== 200) return this.$message.error('获取左侧菜单栏失败')
      // 把获取的菜单数据 保存到data中的menus 供页面获取使用
      console.log(res.data)
      this.menu = res.data
    }
  },
  created() {
    this.getmenus()
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding: 0;
  align-items: center;
  user-select: none;

  .logo-title {
    display: flex;
    align-items: center;
    color: #fff;

    h2 {
      font-weight: 200;
      margin-left: 15px;
    }
  }

  .el-button {
    margin-right: 15px;
  }
}
.el-aside {
  background-color: #373d41;
  user-select: none;

  .el-menu-item-group {
    padding: 0;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 8px;
}
.toggleBar {
  color: #fff;
  font-size: 12px;
  line-height: 24px;
  background-color: #4a5064;
  text-align: center;
  // word-spacing对中文不生效
  letter-spacing: 0.2em;
  cursor: pointer;
  user-select: none;
}
.el_submenu_small {
  width: 65px;
}
.el_submenu_large {
  width: 200px;
}
</style>
