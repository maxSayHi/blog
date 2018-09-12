<template>
    <div>
        <div class="topBack">

            <div>
                <div style="display: flex;flex-direction: row;color: black">
                    <div style="margin-top: 10px;margin-left: 50px;font-size: 25px">组名称:{{this.$route.query.groupName}}</div>
                </div>
            </div>


            <h1 style="margin-top: 10px;margin-left:50px">查询用户：</h1>

            <div>
                <div style = "display:flex;flex-direction: row;color: #ffffff;height: 45px">
                    <input placeholder="请输入手机号" style="width:400px;height:45px;margin-left:50px;margin-top:0px;border-width:1px" v-model="form.telphone"></input>
                    <Button @click="getUsers()" type="primary">查询</Button>
                </div>
            </div>
        </div>
        <div class="diviLine"></div>
        <div class="bottomBack">
            <div style = "display:flex;flex-direction: row;color: #ffffff">
            <div style="width: 50%"> 
            <Table height="300" border ref="selection" :columns="columns4" :data="data1"  @on-select="clickSelection"></Table>
            </div>
            <div style="width: 50%"> 
            <Table height="300" border :columns="columns7" :data="data6"></Table>
            </div>
            </div>
            <Button @click="handleSelectAll(true)">Set all selected</Button>
            <Button @click="handleSelectAll(false)">Cancel all selected</Button>
        </div>
        <Button @click="updateGroup" type="primary" style = "margin-top:100px;width:200px;height:45px;justify-content: center;align-items: center">确定</Button>
    </div>
</template>

<style>
.topBack {
  background: #f5f7f9;
  margin-top: 20px;
  margin-left: 0px;
  margin-right: 0px;
  height: 250px;
}

.queryBtn {
  margin-top: 0px;
  margin-left: 50px;
  font-size: 34px;
  width: 150px;
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #ffffff;
  background-color: #5e8bf7;
}
.diviLine {
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  height: 1px;
  background-color: gray;
}
.bottomBack {
  margin-top: 0px;
  margin-left: 0px;
  margin-right: 0px;
  height: 300px;
  background-color: #ffffff;
}
</style>

<script>
let baseurl = require("../libs/base").getBusinessURL;
export default {
  data() {
    return {
      groupId: "",

      form: {
        telphone: ""
      },
      groupName: "",
      columns4: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户姓名",
          key: "name"
        },
        {
          title: "手机号码",
          key: "telphone"
        }
      ],
      data1: [],
      columns7: [
        {
          title: "用户姓名",
          key: "name",
        },
        {
          title: "手机号码",
          key: "telphone"
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ],
      data6: []
    };
  },
  methods: {
    getAllofGroup() {
      this.$http
        .get(
          baseurl +
            "getUsersByGroupId" +
            this.form.telphone,
          {
            params: {
              GroupId: this.$route.query.id,
            },credentials:true
          },
          {
            headers: { Authorization: localStorage.token }
          }
        )
        .then(response => {
          if (response.ok && response.data.code === 10000) {
              console.log(6666);
            this.data1 = response.data.data;
            // this.midArr = [response.data.data];
          } else {
            console.log(response.data);
          }
        });
    },
    clickSelection(row, index) {
      this.data6.push(index);
      console.log(this.data6);
      this.data1.splice(index, 1);
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    //查询用户
    getUsers() {
      this.$http
        .get(
          baseurl + "getUsers?telphone=" + this.form.telphone,
          {
            headers: { Authorization: localStorage.token }
            // 请求时自动带上cookie，就不用传token了，在登录接口里，将token返回在了cookie里
            ,credentials:true
          }
        )
        .then(response => {
          if (response.ok && response.data.code === 10000) {
            this.data1 = [response.data.data];
            this.midArr = [response.data.data];
          } else {
            console.log(response.data);
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    remove(index) {
      this.data6.splice(index, 1);
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    //更新组
    updateGroup(name) {
      var self = this;
      var userArr = this.data6;

      let obj = {
        id: this.$route.query.id,
        userArr: userArr
      };
      var token = localStorage.getItem("token");
      this.$http
        .post(baseurl+"updateGroup", obj, {
          headers: { Authorization: token },credentials:true
        })
        .then(
          res => {},
          error => {}
        );
    }
  },
  mounted: function() {
      this.getAllofGroup();
    // console.log(
    //   "接收参数" + this.$route.query.groupName + this.$route.query.id
    // );
  }
};
</script>
