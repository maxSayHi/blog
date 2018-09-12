<template>
<div>
   <div class="topBack">
    <h1 style="margin-top: 0px;margin-left:50px">组名称：</h1>
    <input placeholder="请输入组名称" v-model="groupName" style="width:400px;height:45px;margin-left:50px;margin-top:0px;border-width:1px;"></input>
    <h1 style="margin-top: 10px;margin-left:50px">查询用户：</h1>
    <div>
       <div style = "display:flex;flex-direction: row;color: #ffffff;height: 45px">
           <input placeholder="请输入手机号" style="width:400px;height:45px;margin-left:50px;margin-top:0px;border-width:1px" v-model="form.telphone" :rules="rules" ref="userForm"></input>
           <Button @click="getUsers" type="primary" :model="form">查询</Button>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <Upload :action="uploadurl" :on-success="uploadSuccess" :on-error="uploadError" with-credentials=true>
              <Button type="ghost" icon="ios-cloud-upload-outline">批量上传</Button>
          </Upload>
       </div>
    </div>
    </div>
    <div class="diviLine"></div>
    <div class="bottomBack">
        <div style = "display:flex;flex-direction: row;color: #ffffff">
          <Table height="300" border=true ref="selection" :columns="columns4" :data="data1"  @on-select="clickSelection"></Table>
          <Table height="300" border=true :columns="columns7" :data="data6"></Table>
        </div>
        <Button @click="handleSelectAll(true)">Set all selected</Button>
        <Button @click="handleSelectAll(false)">Cancel all selected</Button>
    </div>
     <Button @click="addGroup" type="primary" style = "width:200px;height:45px;justify-content: center;align-items: center;margin-top:100px">确定</Button>
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
      form: {
        telphone: ""
      },
      rules: {
        telphone: [
          { required: true, message: "手机号不能为空", trigger: "blur" }
        ]
      },

      groupName: "",
      columns4: [
        {
          type: "selection",
          title: "",
          width: 80,
          align: "center"
        },
        {
          title: "用户姓名",
          width: 350,
          key: "name"
        },
        {
          title: "手机号码",
          width: 200,
          key: "telphone"
        }
      ],
      data1:[],
      columns7: [
        {
          title: "用户姓名",
          key: "name",
          width: 350,
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.name)
            ]);
          }
        },
        {
          title: "手机号码",
          width: 200,
          key: "telphone"
        },
        {
          title: "操作",
          key: "action",
          width: 80,
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
      data6: [
        // {
        //   name: "John Brown",
        //   telphone: 18
        // },
        // {
        //   name: "Jim Green",
        //   telphone: 24
        // },
        // {
        //   name: "Joe Black",
        //   telphone: 30
        // },
        // {
        //   name: "Jon Snow",
        //   telphone: 26
        // },
        // {
        //   name: "lucy",
        //   telphone: "16811012343"
        // },
        // {
        //   name: "poly",
        //   telphone: "16811012344"
        // }
      ],
      uploadurl:baseurl+"upload/upload"
    };
  },
  methods: {
    clickSelection(row, index) {
      this.data6.push(index);
      console.log(this.data6);
      this.data1.splice(index, 1);
    },
    //查询用户
    getUsers() {
      this.$http
        .get(baseurl + "getUsers?telphone=" + this.form.telphone, {
          headers: { Authorization: localStorage.token }
          ,credentials:true
          // 请求时自动带上cookie，就不用传token了，在登录接口里，将token返回在了cookie里
          // credentials: 'true'
        })
        .then(response => {
          if (response.ok && response.data.code === 10000) {
            this.data1 = [response.data.data];
            console.log(this.data1);
          } else {
            console.log(response.data);
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    uploadSuccess(response){
      console.log(response);
      //   this.$Message.info(response);
        this.data6 = response;
    },
    uploadError(response){
        this.$Message.info(error);
    },
    remove(index) {
      this.data6.splice(index, 1);
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    getUsersByUserGroupName() {
      console.log("222");
      console.log(localStorage.token);

      this.$http
        .post(
          baseurl + "users?groupName=" + this.groupName,
          {
            headers: { Authorization: localStorage.token }
            // 请求时自动带上cookie，就不用传token了，在登录接口里，将token返回在了cookie里
            ,credentials:true
          }
        )
        .then(response => {
          console.log(" response: " + JSON.stringify(response));

          if (response.ok && response.data.code == 10000) {
            // 拿到token
            var users = response.data.data;
            if (users.length > 0) {
              this.data1 = users;
            } else {
              this.$Message.info("该组内没有成员");
            }
          } else {
            this.$Message.info(response.data.msg);
          }
        })
        .catch(function(response) {
          console.log(" catch: " + JSON.stringify(response));
        });
    },

    //添加组
    addGroup(name) {
      var self = this;
      var userArr = new Array();
      for (var i = 0; i < this.data6.length; i++) {
        userArr[i] = this.data6[i];
        console.log(userArr);
      }
      let obj = {
        groupName: this.groupName,
        userArr: userArr
      };

      var token = localStorage.getItem("token");
      this.$http
        .post(baseurl + "addGroup", obj, {
          headers: { Authorization: token }
          ,credentials:true
          // emulateJSON: true
        })
        .then(
          res => {
            // console.log(res);
            this.$Message.success("添加成功")
          },
          error => {
            console.log(error);
            this.$Message.error("添加失败")
          }
        );
    }
  }
};
</script>

