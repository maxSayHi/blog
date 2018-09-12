<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
}
.layout-breadcrumb {
  padding: 10px 15px 0;
}
.layout-content {
  min-height: 720px;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}
.layout-content-main {
  padding: 10px;
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-menu-left {
  background: #464c5b;
}
.layout-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
</style>
<template>
    <div class="layout">
        <Row type="flex">
            <i-col span="5" class="layout-menu-left">
                <Menu @on-select="showList" active-name="0-1" theme="dark" width="auto" :open-names="['0','1']">
                    <div class="layout-logo-left"></div>
                    <!-- Weex发布 --> 
                    <Submenu name="0">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            Weex发布
                        </template>
                        <Menu-item name="0-1">查看已发布版本</Menu-item>
                        <Menu-item name="0-2">发布新版本</Menu-item>
                    </Submenu>

                    <!-- 发布 -->                        
                    
                    <Submenu name="1">
                         <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            Ab发布
                        </template>

                        <Submenu name="2">
                            <template slot="title">发布</template>
                            <Menu-item name="2-1">发布</Menu-item>
                            <Menu-item name="2-2">查看已发布</Menu-item>
                            <!-- <Menu-item name="2-3">发布详情</Menu-item> -->
                            <!-- <Menu-item name="2-4">测试分页</Menu-item> -->
                        </Submenu>

<!-- 发布策略 -->
                     <!-- <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-navigate"></Icon>
                            发布策略
                        </template>
                        <Menu-item name="3-1">选择发布人员</Menu-item>
                        <Menu-item name="3-2">随机发布管理</Menu-item>
                    </Submenu> -->
<!-- 功能管理 -->
                    <Submenu name="4">
                        <template slot="title">
                            功能管理
                        </template>
                        <Menu-item name="4-1">已有功能列表</Menu-item>
                        <Menu-item name="4-2">新增功能</Menu-item>
                         
                    </Submenu>
<!-- 用户组 -->
                      <Submenu name="5">
                        <template slot="title">
                            用户组
                        </template>
                        <Menu-item name="5-1">新增发布组</Menu-item>
                        <Menu-item name="5-2">管理发布组</Menu-item>
                        <!-- <Menu-item name="5-3">修改发布组</Menu-item>  -->
                    </Submenu>
                    <!-- 日志 -->
                      <Submenu name="6">
                        <template slot="title">
                            日志
                        </template>
                        <Menu-item name="6-1">操作日志</Menu-item>
                    </Submenu>
</Submenu>
                    
                     

                </Menu>
            </i-col>
            <i-col span="19">
                <div class="layout-header"></div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item href="#">首页</Breadcrumb-item>
                        <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
                        <Breadcrumb-item>某应用</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <router-view></router-view>
                </div>
                <div class="layout-copy">
                    2013-2018 &copy; che001
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
let baseurl = require("../libs/base").getBusinessURL;
export default {
  methods: {
    showList(name) {
      if (name == "0-1") {
        //                    this.$Message.info('这是一条普通的提醒');
        this.$router.push({ path: "/weex_list" });
      } else if (name == "0-2") {
        this.$router.push({ path: "/weex_publish" });
      } else if (name == "2-1") {
        // 发布功能
        //                    this.$Message.info('这是一条普通的提醒');
        this.$router.push({ path: "/create" });
      } else if (name == "2-2") {
        //发布列表
        this.$router.push({ path: "/releaselist" });
      } else if (name == "2-3") {
        //发布发布详情
        this.$router.push({ path: "/reaseDetail" });
      } else if (name == "2-4") {
        //测试分页
        this.$router.push({ path: "/test" });
      } else if (name == "3-1") {
        //用户列表
        this.$router.push({ path: "/selectUsers" });
      } else if (name == "1-2") {
        this.$router.push({ path: "/list_publish" });
      } else if (name == "1-5") {
        this.$router.push({ path: "/login" });
      } else if (name == "4-1") {
        this.$router.push({ path: "/function_manage" });
      } else if (name == "4-2") {
        this.$router.push({ path: "/addFunction" });
      } else if (name == "6-1") {
        this.$router.push({ path: "/log" });
      } else if (name == "5-1") {
        this.$router.push({ path: "/addGroup" });
      } else if (name == "5-2") {
        this.$router.push({ path: "/mangGroup" });
      } else if (name == "5-3") {
        this.$router.push({ path: "/editGroup" });
      }

      //                this.$router.push({path:'/list_publish'});
    }
  },
  mounted: function() {
    // this.$http
    //   .get(baseurl + "users?groupName=【" + this.groupName, {
    //     // headers: {"Authorization":localStorage.token},
    //     // 请求时自动带上cookie，就不用传token了，在登录接口里，将token返回在了cookie里
    //     credentials: true
    //   })
    //   .then(response => {
    //     console.log(" response: " + JSON.stringify(response));

    //     if (response.ok && response.data.code == 10000) {
    //       // 拿到token
    //       var users = response.data.data;
    //       if (users.length > 0) {
    //         this.data1 = users;
    //       } else {
    //         this.$Message.info("该组内没有成员");
    //       }
    //     } else {
    //       this.$Message.info(response.data.msg);
    //     }
    //   })
    //   .catch(function(response) {
    //     console.log(" catch: " + JSON.stringify(response));
    //   });
  }
};
</script>