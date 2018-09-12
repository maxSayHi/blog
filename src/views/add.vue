<template>
    <Row>
        <div class="layout">
          <h2> 选择用户</h2>  
        <div class="plat_margin" style="margin-left: 20px">
            平台：
             <input type="text" v-model="phoneSear" placeholder="请输入用户手机号">
             <Button type="primary" @click="query">查询</Button>
        </div>
         
        <Table @on-row-click="rowClick" :columns="columns1" :data="data1" style="margin-top:10px" ></Table>
        <Page :total="dataCount" :page-size="pageSize" show-total class="pageing" @on-change="changepage">

       </Page> 
    </div>
    </Row>
</template>
<script>
import { eventBus } from "../main.js";
let baseurl = require("../libs/base").getBusinessURL;
export default {
  name: "add",
  data() {
    return {
      pageNum: 0,
      phoneSear: "",
      ajaxHistoryData: [],
      dataCount: 0,
      pageSize: 5,
      data1: [],
      columns1: [
        {
          title: "组名称",
          key: "groupName"
        },
        {
          title: "创建时间",
          key: "createTime"
        }
        // {
        //   title: "是否勾选",
        //   key: "function_check",
        //   render: (h, params) => {
        //     return h("Checkbox", {
        //       props: {
        //         type: "primary",
        //         size: "small"
        //       },
        //       style: {
        //         marginRight: "5px"
        //       },
        //       on: {
        //         click: () => {
        //           console.log("点击的位置：" + params.index);
        //           this.show(params.index);
        //         }
        //       }
        //     });
        //   }
        // }
      ],
      value1: "",
      value2: ""
    };
  },

  methods: {
    rowClick(data, index) {
      eventBus.$emit("setGroup", { id: data.id, name: data.groupName });
      this.$Modal.remove();
    },
    value1Change: function() {
      var obj = this;
      this.$emit("value1", obj.value1);
    },

    value2Change: function() {
      var obj = this;
      this.$emit("value2", obj.value2);
    },

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

    changepage(index) {
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.data1 = this.ajaxHistoryData.slice(_start, _end);
    },
    //根据手机号 得到所查询的手机号
    query: function() {
      var self = this;
      var token = localStorage.getItem("token");
      var phone = self.phoneSear;
      this.$http
        .get(baseurl + "user/listByPhone?phone=" + phone, {
          headers: { Authorization: token },
          credentials: true
        })
        .then(res => {
          console.log("result is here" + res.data);
          var temArr = new Array();
          for (var a = 0; a < res.data.data.length; a++) {
            var obj = new Object();
            obj["userName"] = res.data.data[a].name;
            obj["userPhone"] = res.data.data[a].telphone;
            obj["Ssoid"] = res.data.data[a].Ssoid;
            temArr.push(obj);
          }
          this.data1 = temArr;
          this.handleListApproveHistory();
          // this.ajaxHistoryData = testData.histories;
        })
        .catch(function(response) {
          console.log(response);
        });
    },

    //  得到系统中的所有用户
    getAllUser: function() {
      var self = this;
      var token = localStorage.getItem("token");
      this.$http
        .get(baseurl + "user/list", {
          headers: { Authorization: token },
          credentials: true
        })
        .then(res => {
          console.log("result is here" + res.data.data);
          var temArr = new Array();
          for (var a = 0; a < res.data.data.length; a++) {
            var obj = new Object();
            obj["userName"] = res.data.data[a].name;
            obj["userPhone"] = res.data.data[a].telphone;
            obj["Ssoid"] = res.data.data[a].Ssoid;
            temArr.push(obj);
          }

          this.data1 = temArr;
          this.handleListApproveHistory();
          // this.ajaxHistoryData = testData.histories;
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    queryAll() {
      var self = this;
      var token = localStorage.getItem("token");
      this.$http
        .get(
          baseurl + "queryUserGroup",
          {
            params: {
              pageNum: this.pageNum,
              pageLimit: 8
            },
            credentials: true
          },
          {
            headers: { Authorization: token }
            // emulateJSON: true
          }
        )
        .then(response => {
          this.data1 = response.data.data;
        });
    }
    // getUserByPhone
  },
  // 生命周期方法
  created() {
    // this.getAllUser();
    this.queryAll();
    // eventBus.$on("setGroup", target => {
    //   console.log("on" + target);
    // });
  }
};
</script>