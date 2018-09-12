<template>
 
    <i-form  ref="releaseItem" :model="formItem" :label-width="160" style="margin-top:25px"  >
        <Form-item label="选择平台：">
            <Select  v-model="formItem.model1"   style="width:300px" 
                @on-change='onGetAllFun()'>
                <Option v-for="item in checkbox" :value="item.value" :key="item.value">{{ item.label }}</Option>
           </Select >
          </Form-item>
        <Form-item label="版本名称：">
            <i-input v-model="formItem.versionName"  style="width:300px" placeholder="请输入版本名称" :disabled="verionName_disable"></i-input>
        </Form-item>
       <Form-item label="App版本号：">
            <i-input  v-model="formItem.appversion"   style="width:300px" placeholder="请输入版本号"></i-input>
        </Form-item>
         
        <Form-item label="选择功能：" v-if="formItem.strategy!='location'"> 
            <Checkbox-group  >
                <Checkbox v-model="item.flag"  v-for="item in functions" :value="item.id" :key="item.id" >{{ item.funName }}</Checkbox>
            </Checkbox-group>
        </Form-item> 
        
       <Form-item label="选择用户：" v-if="formItem.strategy!='location'"> 
            {{selected}}
            <i-button type="primary" @click="openModal">请选择用户</i-button>
         </Form-item> 

        <Form-item label="选择地域：" v-if="formItem.strategy=='location'"> 
            <al-cascader v-model="location" level="1"/>
         </Form-item> 

         <Form-item label="策略选择："> 
            <Select  v-model="formItem.strategy" style="width:300px" @on-change='onStrategySelected()'
                >
                <Option v-for="item in strategys" :value="item.value" :key="item.value">{{ item.label }}</Option>
           </Select >
        </Form-item> 
         
        <Form-item>
            <i-button type="primary" @click="onclickBtn('formAddRelease')" >确定</i-button>
            <!-- <i-button type="ghost" @click="onGetAllFun()" style="margin-left: 8px">取消</i-button> -->
        </Form-item>
    </i-form>
</template>
<script>
let baseurl = require("../libs/base").getBusinessURL;
import add from "./add.vue";
import { eventBus } from "../main.js";
export default {
  data() {
    return {
      v1: "",
      v2: "",
      verionName_disable:false,
      selected: "",
      location: "",
      selectedId: 0,
      formItem: {
        versionName: "",
        funcid: "",
        appversion: "",
        model1: "Che001Android",
        strategy: "person",
        checkbox: []
      },
      functions: [
        {
          funName: "Che001Android",
          funId: "1号车Android",
          pName: "",
          id: 1,
          flag: false
        },
        {
          funName: "Che001Android",
          funId: "1号车Android",
          pName: "",
          id: 2,
          flag: false
        }
      ],
      checkbox: [
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
      strategys: [
        {
          value: "person",
          label: "选择人员发布"
        },
        {
          value: "random_percentage",
          label: "随机百分比发布"
        },
        {
          value: "location",
          label: "按地域发布"
        }
      ]
      //  model1: '1号车Android',
    };
  },
  components: {
    add
  },
  methods: {
    getAllofGroup: function(id) {
      this.$http
        .get(baseurl + "getUsersByGroupId", {
          params: {
            GroupId: id,
            credentials: true
          },
          credentials: true
        })
        .then(response => {
          if (response.ok && response.data.code === 10000) {
            // this.data1 = response.data.data;
            // console.log(response.data.data);
            // this.midArr = [response.data.data];
          } else {
            this.$Message.error("请求失败!");
          }
        });
    },
    openModal: function() {
      this.$Modal.confirm({
        scrollable: true,
        okText: "",
        cancelText: " ",
        render: h => {
          return h(add, {
            props: {},
            on: {
              value1: value1 => {
                this.v1 = value1;
              },
              value2: value2 => {
                this.v2 = value2;
              }
            }
          });
        },
        onOk: () => {
          // if (this.v1 == "" || this.v2 == "") {
          //   this.$Message.error("信息填写不完整!");
          // }
          // const msg = this.$Message.loading({
          //   content: "正在保存..",
          //   duration: 0
          // });
          // this.saveLink(msg);
        }
      });
    },

    // 发布的按钮
    onclickBtn(name) {
      var self = this;
      var platName = self.formItem.model1;
      var versionName = self.formItem.versionName;
      var version = self.formItem.appversion;

      let obj = {
        groupId: this.selectedId,
        pName: platName,
        versionName: versionName,
        appVersion: version,
        funcs: [],
        strategy: self.formItem.strategy
      };
      var arrs = self.functions;

      if ("location" === self.formItem.strategy) {
        obj.funcs.push({
          funName: this.location[0].name + "-" + this.location[1].name,
          funId: "",
          pName: "",
          id: 0,
          flag: false
        });
      } else {
        for (var c = 0; c < arrs.length; c++) {
          var objf = self.functions[c];
          console.log("是否选择" + objf.flag);
          if (objf.flag) {
            obj.funcs.push(objf);
          }
        }
      }
      // console.log("" + JSON.stringify(obj));
      var token = localStorage.getItem("token");
      this.$http
        .post(baseurl + "release/create", JSON.stringify(obj), {
          headers: { Authorization: token },
          credentials: true
        })
        .then(
          res => {
            this.$Message.success("添加成功");
          },
          error => {
            console.log(error);
          }
        );
    },
    //  得到所有的功能类
    onGetAllFun() {
      var self = this;
      var pName = self.formItem.model1;
      console.log("pName" + pName);
      //   let obj = {
      //       platform:pName,
      //       versionName:versionName,
      //       appversion:version
      //   };
      var token = localStorage.getItem("token");
      this.$http
        .get(baseurl+"function/search?pName=" + pName, {
          headers: { Authorization: token },
          credentials:true
          //   emulateJSON: true
        })
        .then(
          res => {
            console.log(res);
            if (res.data.code == -1) {
              this.$Message.info("暂时没有添加功能");
              this.functions = [];
              return;
            }

            var temArr = new Array();
            for (var a = 0; a < res.data.data.length; a++) {
              var obj = new Object();
              obj["funName"] = res.data.data[a].funName;
              obj["funId"] = res.data.data[a].funId;
              obj["pName"] = res.data.data[a].pName;
              obj["id"] = res.data.data[a].id;
              obj["flag"] = false;

              temArr.push(obj);
            }
            this.functions = temArr;
          },
          error => {
            console.log(error);
          }
        );
    },
    //  得到发布策略
    onStrategySelected() {
      if("location"===this.formItem.strategy){
        this.formItem.versionName="location"
        this.verionName_disable=true;
      }else{
        this.verionName_disable=false;
      }
    },
    // 测试方法
    test() {
      var self = this;
      var obj = {
        ids: [],
        name: ""
      };

      obj.name = "sd";
      console.log(JSON.stringify(obj));

      var token = localStor;
      age.getItem("token");
      this.$http
        .post(baseurl + "release/addids", obj, {
          headers: { Authorization: token },
          credentials: true
          //  emulateJSON: true
        })
        .then(
          res => {
            console.log(res);
          },
          error => {
            console.log(error);
          }
        );
    },

    clickGetUserPop() {}
  },
  // 生命周期方法
  created() {
    // this.onGetAllFun();
    eventBus.$on("setGroup", target => {
      //   console.log("666666"+target);
      this.selected = target.name;
      this.selectedId = target.id;
      this.getAllofGroup(target.id);
    });
  },
  beforeDestroy() {
    eventBus.$off("setGroup");
    // console.log("create destroyed");
  }
};
</script>
