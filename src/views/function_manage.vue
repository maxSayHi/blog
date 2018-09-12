<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
}
</style>
<template>
    <div class="layout">
        <!-- <div class="plat_margin" style="margin-left: 20px">
            平台：
            <Select v-model="model1" style="width:200px;margin:10px">
                <Option v-for="item in platformList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </div>
        <div class="plat_margin" style="margin-left: 20px">
            查询功能：
            <i-input v-model="model2" placeholder="请输入查询功能" style="width: 300px;margin:10px"/>
            <Button type="primary" @click="query()">查询</Button>
            <Button type="primary" @click="testPage()">测试</Button>
        </div> -->
        <Table :columns="columns1" :data="data1"></Table>
        <Page :total="totalNum" :page-size="pageSize" show-total class="paging" @on-change="changepage" style="margin-top: 20px"></Page>
    </div>
</template>
<script>
let baseurl = require("../libs/base").getBusinessURL;

export default {
  data() {
    return {
      totalNum: 0,
      pageNum: 0,
      ajaxHistoryData: [],
      historyData: [],
      // 初始化信息总条数
      dataCount: 0,
      mCurrent: 2,
      // 每页显示多少条
      pageSize: 10,
      platformList: [
        {
          value: "Che001Android",
          label: "1号车Android"
        },
        {
          value: "Che001iOS",
          label: "1号车iOS"
        },
        {
          value: "qylcAndroid",
          label: "轻易理财Android"
        },
        {
          value: "qylciOS",
          label: "轻易理财iOS"
        },

        {
          value: "qyfqAndroid",
          label: "轻易分期Android"
        },
        {
          value: "qyfqiOS",
          label: "轻易分期iOS"
        },
        {
          value: "developmentbusiness",
          label: "展业APP"
        }
      ],
      model1: "轻易理财Android",
      model2: "",
      columns1: [
        {
          title: "功能名称",
          key: "funName"
        },
        {
          title: "功能id",
          key: "funId"
        },
        {
          title: "平台名称",
          key: "pName"
        },
        {
          title: " ",
          key: "function_delete",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      var id = this.data1[params.index].id;
                      var token = localStorage.getItem("token");
                      this.$http
                        .get(
                          baseurl + "function/reldelete",
                          {
                            params: {
                              id: id
                            },
                            headers: { Authorization: token }
                            ,credentials:true
                          }
                        )
                        .then(response => {
                          //删除操作执行成功后，进行查询功能
                          this.getList();
                          this.mCurrent = 1;
                        })
                        .catch(function(response) {
                          console.log(response);
                        });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: []
    };
  },
  methods: {
    testPage: function(e) {
      this.mCurrent = 3;
    },
    query: function(e) {
      var self = this;
      var mPlatform = self.model1;
      var token = localStorage.getItem("token");

      var mFunctionNames = self.model2;
      console.log("pname:ss" + mPlatform + "mFunctionNames" + mFunctionNames);
      this.$http
        .get(
          baseurl +
            "function/searchbypf?pName=" +
            mPlatform +
            "&funame=" +
            mFunctionNames,

          {
            headers: { Authorization: token }
            ,credentials:true
          }
        )
        .then(response => {
          // console.log(response.data);
          if (response.ok && response.data.code == 10000) {
            this.dataCount = response.data.data.length;
            // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
            if (response.data.length < this.pageSize) {
              this.data1 = this.ajaxHistoryData;
            } else {
              var temArr = new Array();
              for (var i = 0; i < response.data.data.length; i++) {
                var obj = new Object();
                obj["function_name"] = response.data.data[i].funName;
                obj["function_id"] = response.data.data[i].funId;
                temArr.push(obj);
              }
              this.data1 = temArr.slice(0, this.pageSize);
              // 保存取到的所有数据
              this.ajaxHistoryData = temArr;
            }
          } else {
            this.$Message.info("查询无果！");
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    changepage(index) {
      //   this.mCurrent = index;
      //   var _start = (index - 1) * this.pageSize;
      //   var _end = index * this.pageSize;
      //   this.data1 = this.ajaxHistoryData.slice(_start, _end);
      this.pageNum = index - 1;
      this.getList();
    },
    getList() {
      var token = localStorage.getItem("token");
      console.log(token);
      var self = this;
      this.$http
        .get(
          baseurl + "function/list",
          {
            params: {
              pageNum: self.pageNum,
            },
            credentials: true,
            headers: { Authorization: token}
          }
        )
        .then(response => {
          if (response.ok && response.data.code == 10000) {
            // this.dataCount = response.data.data.length;
            // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
            this.data1 = response.data.data;
            this.totalNum = response.data.total;
            // if (response.data.length < this.pageSize) {
            //   this.data1 = this.ajaxHistoryData;
            // } else {
            //   var temArr = new Array();
            //   for (var i = 0; i < response.data.data.length; i++) {
            //     var obj = new Object();
            //     obj["function_name"] = response.data.data[i].funName;
            //     obj["function_id"] = response.data.data[i].funId;
            //     temArr.push(obj);
            //   }
            //   this.data1 = temArr.slice(0, this.pageSize);
            //   // 保存取到的所有数据
            //   this.ajaxHistoryData = temArr;
            // }
          } else {
            this.$Message.info("查询无果！");
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    }
  },
  mounted: function() {
    //进入已有功能列表页面，调用查询所有功能接口
    this.getList();
  }
};
</script>