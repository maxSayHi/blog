<template>
    <i-form ref="formItem" :model="formItem" :label-width="80">
        <Form-item label="选择平台：">
            <Select v-model="model1" style="width:300px">
                <Option v-for="item in checkbox" :value="item.value" :key="item.value">{{ item.label }}</Option>
           </Select>
          </Form-item>
        <Form-item label="功能名称：">
            <i-input v-model="funcname" style="width:300px" placeholder="请输入功能" @on-change="value1Change"></i-input>
        </Form-item>
       <Form-item label="版 本 号 ：">
            <i-input v-model="funcversion" style="width:300px" placeholder="请输入版本号" @on-change="value2Change"></i-input>
        </Form-item>
         
        <Form-item label="功能 ID：">
            <i-input v-model="funcid" style="width:300px" placeholder="请输入功能ID" @on-change="value3Change"></i-input>
        </Form-item> 
        <Form-item>
            <i-button type="primary" @click="onclickBtn()" >提交</i-button>
            <i-button type="ghost" style="margin-left: 8px" @click="cancle()">重置</i-button>
        </Form-item>
    </i-form>
</template>
<script>
let baseurl = require("../libs/base").getBusinessURL;
    export default {
        data () {
            return {
                formItem: {
                    checkbox: [],
                   },
                 checkbox: [
                    {
                        value: 'Che001Android',
                        label: '1号车Android'
                    },
                    {
                        value: 'Che001iOS',
                        label: '1号车iOS'
                    }, 
                    {
                        value: 'qylcAndroid',
                        label: '轻易理财Android'
                    },
                   {
                        value: 'qylciOS',
                        label: '轻易理财iOS'
                    },
                     
                    {
                        value: 'qyfqAndroid',
                        label: '轻易分期Android'
                    },
                    {
                        value: 'qyfqiOS',
                        label: '轻易分期iOS'
                    },
                    {
                        value: 'developmentbusiness',
                        label: '展业APP'
                    }
                ], 
                model1: '',
                funcname: '',
                funcid: '',
                funcversion:''
            }
        },
        methods:{
            value1Change:function() {
                var obj = this;
                this.$emit('funcname', obj.funcname)
            },
            value2Change:function() {
                var obj = this;
                this.$emit('funcversion', obj.funcversion)
            },
            value3Change:function() {
                var obj = this;
                this.$emit('funcid', obj.funcid)
            },
            cancle(){
                this.funcname = "";
                this.funcversion = "";
                this.funcid = "";
                this.model1 = "";
            },
             onclickBtn(){
                 var self = this;
                 var mPlatform = self.model1;
                 var mFuncName = self.funcname;
                 var mFunctionVersion = self.funcversion;
                 var mFunctionId = self.funcid;
                 var token = localStorage.getItem('token')

                 let obj = {
                     pName:mPlatform,
                     funName:mFuncName,
                     appVersion:mFunctionVersion,
                     funId:mFunctionId,
                 };
                console.log(" response: " + JSON.stringify(obj)); 
                 this.$http.post(baseurl+"function/add?",JSON.stringify(obj),
                         {
                             headers: {"Authorization":token}
                             ,credentials:true
                         }
                     )
                     .then(response => {
                         console.log(" response: " + JSON.stringify(response));

                         if (response.ok && response.data.code == 10000) {
                             this.$Message.info("添加成功！")
//                             this.funcname = "";
//                             this.funcversion = "";
//                             this.funcid = "";
//                             this.model1 = "";
                         } else {
                             this.$Message.info("添加失敗，請稍後重試！")
                         }
                     })
                     .catch(function(response) {
                         console.log(" catch: " + JSON.stringify(response));
                     });
             },
        }
    }
</script>
