<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  margin-bottom: 20px;
  padding: 10px;
}
</style>
<template>
    <div class="layout">
        <div class="plat_margin" style="margin-left: 20px">
            平台：
            <Select v-model="formItem.model4" style="width:200px;margin:10px" @on-change="getReaseList()">
                <Option v-for="item in platformList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
             <Button type="primary" @click="getReaseList()">查询</Button>
        </div>
         
        <Table :columns="columns1" :data="data1" style="margin-top:10px" ></Table>
           <div  >
           <Page :total="totalNum" :page-size="pageSize" show-total class="pageing" @on-change="changepage">
       </Page>
           </div>
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
      totalNum: 0,
      pageNum: 0,
      formItem: {
        model4: "Che001Android"
      },
      model4: "轻易理财Android",
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
      ajaxHistoryData: [],
      pageSize: 10,
      data1: [],
      columns1: [
        {
          title: "平台名称",
          key: "pName"
        },
        {
          title: "版本名称",
          key: "versionName"
        },
        {
          title: "版本号",
          key: "appVersion"
        },
        {
          title: "发布时间",
          key: "createTime"
        },
        {
          title: " ",
          key: "function_delete",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "success",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.fullPush(params.index);
                  }
                }
              },
              "全量发布"
            );
          }
        },
        {
          title: " ",
          key: "function_delete",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "success",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.revert(params.index);
                  }
                }
              },
              "撤销"
            );
          }
        },
        {
          title: " ",
          key: "function_delete",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "success",
                  size: "small"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.rePub(params.index);
                  }
                }
              },
              "重新发布"
            );
          }
        },
        {
          title: " ",
          key: "function_delete",
          render: (h, params) => {
            return h(
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
                    this.showDetail(params.index);
                  }
                }
              },
              "查看详情"
            );
          }
        }
      ]
    };
  },

  methods: {
    // 全量发布
    fullPush(index) {
      console.log(index)
      var version = this.data1[index].appVersion;
      var pname = this.data1[index].pName;
      var token = localStorage.getItem("token");
      this.$http
        .get(
          baseurl+"release/fullAmount",{
            params: {
              platform: pname,
              version: version
            },credentials:true
          }
        )
        .then(res => {
          this.$Message.success("设置成功");
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    // 撤销
    revert(index) {
      var version = this.data1[index].appVersion;
      var pname = this.data1[index].pName;
      var token = localStorage.getItem("token");
      this.$http
        .get(
          baseurl+"release/revert",{
            params: {
              platform: pname,
              version: version
            },credentials:true
          }
        )
        .then(res => {
          this.$Message.success("设置成功");
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    // 撤销
    rePub(index) {
      var groupId = this.data1[index].groupId;
      var version = this.data1[index].appVersion;
      var versionName = this.data1[index].versionName;
      var pname = this.data1[index].pName;
      var token = localStorage.getItem("token");
      this.$http
        .get(
          baseurl+"release/rePub",{
            params: {
              platform: pname,
              version: version,
              GroupId:groupId,
              versionName:versionName
            },credentials:true
          }
        )
        .then(res => {
          this.$Message.success("设置成功");
        })
        .catch(function(response) {
          console.log(response);
        });
    },

    showDetail(index) {
      // 查看发布的详情页
      //    this.$router.push({path:'/editGroup',params:{groupName:this.data6[index].groupName}});
      console.log("id" + this.data1[index]);
      this.$router.push({
        path: "/reaseDetail",
        query: { item: this.data1[index] }
      });
    },
    //  获取发布的列表
    getReaseList: function() {
      var self = this;
      var platName = self.formItem.model4;

      var token = localStorage.getItem("token");
      this.$http
        .get(
          baseurl+"release/listByPname",
          {
            params: {
              pname: platName,
              pageNum: self.pageNum
            },
            credentials: true
          }
        )
        .then(res => {
          this.totalNum = res.data.total;
          var resdata = res.data.data;
          for(var i=0;i<resdata.length;i++){
            if(resdata[i].groupId===0&&resdata[i].versionName!=='location'){
              resdata[i].createTime=resdata[i].createTime+"(随机)"
            }
          }
          this.data1 = resdata;
          this.handleListApproveHistory();
        })
        .catch(function(response) {
          console.log(response);
        });
    },

    //
    handleListApproveHistory() {
      // 保存取到的所有数据
      this.ajaxHistoryData = this.data1;
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (this.data1.length < this.pageSize) {
        this.data1 = this.ajaxHistoryData;
      } else {
        this.data1 = this.ajaxHistoryData.slice(0, this.pageSize);
      }
    },

    changepage(index) {
    //   var _start = (index - 1) * this.pageSize;
    //   var _end = index * this.pageSize;
    //   this.data1 = this.ajaxHistoryData.slice(_start, _end);
        this.pageNum=index-1;
        this.getReaseList();
    }
  },
  created() {
    this.getReaseList();
  }
};
</script>