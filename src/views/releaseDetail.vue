/** 发布的详情*** */

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
}
</style>
<template>
 

    <div class="layout">

      <Tabs type="card" class="" value="发布详情">
        <TabPane :label="leftTitle" name="name1">
            <Table :columns="columns1" :data="data1">
            </Table>
            <Page :total="dataCount" :page-size="pageSize" show-total class="pageing" @on-change="changepage">
            </Page>
        </TabPane>
        <TabPane label="发布功能" name="name2">
              <Table :columns="columns2" :data="data2">
            </Table>
            <Page :total="dataCount2" :page-size="pageSize" show-total class="pageing" @on-change="changepage2">
            </Page>
         </TabPane>
         
        </Tabs> 
    </div>
</template>
<style scoped>
.paging {
  float: right;
  margin-top: 10px;
}
</style>

<script>
let baseurl = require("../libs/base").getBusinessURL;

export default {
  data() {
    return {
      leftTitle:"发布人员",
      id: "",
      ajaxHistoryData: [],
      ajaxHistoryData2: [],
      dataCount: 0,
      dataCount2: 0,
      pageSize: 5,
      data1: [],
      data2: [],

      columns1: [
        {
          title: "用户名",
          key: "userName"
        },
        {
          title: "手机号",
          key: "userPhone"
        }
      ],
      columns2: [
        {
          title: "功能",
          key: "funName"
        },
        {
          title: "功能id",
          key: "funId"
        }
      ]
    };
  },

  methods: {
    //
    handleListApproveHistory() {
      // 保存取到的所有数据
      this.ajaxHistoryData = this.data1;
      this.dataCount = this.data1.length;
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (this.data1.length < this.pageSize) {
        this.data1 = this.ajaxHistoryData;
      } else {
        this.data1 = this.ajaxHistoryData.slice(0, this.pageSize);
      }
    },

    handleListApproveHistory2() {
      // 保存取到的所有数据
      this.ajaxHistoryData2 = this.data2;
      this.dataCount2 = this.data2.length;
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (this.data2.length < this.pageSize) {
        this.data2 = this.ajaxHistoryData2;
      } else {
        this.data2 = this.ajaxHistoryData2.slice(0, this.pageSize);
      }
    },

    changepage(index) {
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.data1 = this.ajaxHistoryData.slice(_start, _end);
    },

    changepage2(index) {
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.data2 = this.ajaxHistoryData2.slice(_start, _end);
    },

    getParams() {
      // 取到路由带过来的参数
      var routerParams = this.$route.query.item.id;
      // 将数据放在当前组件的数据内
      this.id = routerParams;
      console.log("传递的参数是:------" + routerParams);
      this.getReaseDetail();
    },
    getReaseDetail: function() {
      var self = this;
      var token = localStorage.getItem("token");
      this.$http
        .get(
          baseurl+"release/releaseDetail",
          {
            params: {
              rid: self.id,
              gid:this.$route.query.item.groupId,
              pName:this.$route.query.item.pName,
              version:this.$route.query.item.appVersion,
              strategy:this.$route.query.item.versionName,
            },credentials:true
          }
        )
        .then(res => {
          console.log("result is here" + res.data);
          var temArr = new Array();
          for (var a = 0; a < res.data.data.uers.length; a++) {
            var obj = new Object();
            obj["userName"] = res.data.data.uers[a].name;
            obj["userPhone"] = res.data.data.uers[a].telphone;
            temArr.push(obj);
          }

          var temArr2 = new Array();
          for (var a = 0; a < res.data.data.functions.length; a++) {
            var obj = new Object();
            obj["funName"] = res.data.data.functions[a].funName;
            obj["funId"] = res.data.data.functions[a].funId;
            temArr2.push(obj);
          }
          this.data1 = temArr;
          this.data2 = temArr2;
          console.log("result is here" + this.data1);
          console.log("result is here" + this.data2);
          this.handleListApproveHistory();
          this.handleListApproveHistory2();
        })
        .catch(function(response) {
          console.log(response);
        });
    }
  },

  created() {
    this.getParams();
    if("location"===this.$route.query.item.versionName){
      this.leftTitle = "发布地域";
    }else if(0===this.$route.query.item.groupId){
      this.leftTitle = "随机分组";
    }
  }
};
</script>