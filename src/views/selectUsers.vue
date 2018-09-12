<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
</style>
<template>
    <div class="layout">
        <div class="plat_margin" style="margin-left: 20px">
            平台：
            <Select v-model="model1" style="width:200px;margin:10px">
                <Option v-for="item in platformList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
             <Button type="primary" @click="getReaseList()">查询</Button>
        </div>
         
        <Table :columns="columns1" :data="data1"></Table>
        <Page :total="dataCount" :page-size="pageSize" show-total class="pageing" @on-change="changepage">

       </Page>
       
        <div style="text-align: center">
            <Button type="primary" style="width: 35%;margin-top: 20px;">确定</Button>
        </div>
    </div>
</template>
<style scoped>
  .paging{
      float:right;
      margin-top:10px;
  }
</style>
<script>
    let baseurl = require("../libs/base").getBusinessURL;
    let testData = {
        "histories":[ 
                    {
                     plateform_name:'轻易理财ios',
                     appversion_name:'10010',
                     appversion:'10010',
                     release_time:'2017-9-8',  
                    },
                     {
                        plateform_name:'轻易理财ios',
                        appversion_name:'10010',
                       appversion:'10010',
                       release_time:'2017-9-8',  
                    },
                     {
                        plateform_name:'轻易理财ios',
                        appversion_name:'10010',
                       appversion:'10010',
                       release_time:'2017-9-8',  
                    },
                     {
                        plateform_name:'轻易理财ios',
                        appversion_name:'10010',
                       appversion:'10010',
                       release_time:'2017-9-8',  
                    },
                     {
                        plateform_name:'轻易理财ios',
                        appversion_name:'10010',
                       appversion:'10010',
                       release_time:'2017-9-8',  
                    },
                     {
                        plateform_name:'轻易理财ios',
                        appversion_name:'10010',
                       appversion:'10010',
                       release_time:'2017-9-8',  
                    },
                     {
                        plateform_name:'轻易理财ios',
                        appversion_name:'10010',
                       appversion_name:'10010',
                       release_time:'2017-9-8',  
                    },
                     {
                        plateform_name:'轻易理财ios',
                        appversion_name:'10010',
                       appversion:'10010',
                       release_time:'2017-9-8',  
                    },
                     {
                        plateform_name:'轻易理财ios',
                        appversion_name:'10010',
                       appversion:'10010',
                       release_time:'2017-9-8',  
                    },
                     {
                        plateform_name:'轻易理财ios',
                        appversion_name:'10010',
                       appversion:'10010',
                       release_time:'2017-9-8',  
                    },
                     {
                        plateform_name:'轻易理财ios',
                        appversion_name:'10010',
                       appversion:'10010',
                       release_time:'2017-9-8',  
                    },
            ] 
    }


    export default {
        data() {
            return {
                platformList:[
                    {
                        value: 'che001Android',
                        label: '1号车Android'
                    },
                    {
                        value: 'che001ios',
                        label: '1号车ios'
                    },
                    {
                        value: 'qylcAndroid',
                        label: '轻易理财Android'
                    },
                    {
                        value: 'qylcios',
                        label: '轻易理财ios'
                    },

                    {
                        value: 'qyfqAndroid',
                        label: '轻易分期Android'
                    },
                    {
                        value: 'qyfqios',
                        label: '轻易分期ios'
                    },
                    {
                        value: 'developmentbusiness',
                        label: '展业APP'
                    }
                ],
                model1:'轻易理财Android',
                dataCount:0,
               pageSize:5, 
               data1:[],
                columns1:[
                    {
                        title:'平台名称',
                        key:'plateform_name'
                    },
                    {
                        title:'版本名称',
                        key:'appversion_name'
                    },
                   {
                        title:'发布时间',
                        key:'release_time'
                    },
                     
                    {
                        title:'是否勾选',
                        key:'function_check',
                        render:(h,params)=>{
                            return h('Checkbox',{
                                props:{
                                    type:'primary',
                                    size:'small'
                                },
                                style:{
                                    marginRight:'5px'
                                },
                                on:{
                                    click:()=>{
                                        this.show(params.index)
                                    }
                                }
                            })
                        }
                    },
                    {
                        title:' ',
                        key:'function_delete',
                        render:(h,params)=>{
                            return h('Button',{
                                props:{
                                    type:'error',
                                    size:'small'
                                },
                                style:{
                                    marginRight:'5px'
                                },
                                on:{
                                    click:()=>{
                                        this.$router.push({path:'/reaseDetail'});  
                                    }
                                }
                            },'查看详情')
                        }
                    },
                ],

                data1:[
                     
                ]
            }
        },
        methods: {
            //  获取发布的列表
               getReaseList:function() {
                 var self =this;
                 var token = localStorage.getItem('token');
                this.$http.get(baseurl+"release/list",
                    {
                       headers: {"Authorization":token},
                       credentials:true
                  }
                ).then((res) => {
                    console.log('result is here' + res);
                     var temArr = new Array();
                 for (var a = 0; a < res.data.data.length ;a++){
                      var obj = new Object();
                      obj['plateform_name'] = res.data.data[a].funName ; 
                      obj['appversion_name'] = res.data.data[a].appVersion ;
                      obj['release_time'] = res.data.data[a].createTime ;
                      
                      temArr.push(obj) ;
                    } 
                     
                    }).catch(function (response) {
                    console.log(response)
                });

            }, 
            //
             handleListApproveHistory(){
                  // 保存取到的所有数据
                this.ajaxHistoryData = testData.histories;
                this.dataCount = testData.histories.length;;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(testData.histories.length < this.pageSize){
                    this.data1 = this.ajaxHistoryData;
                }else{
                    this.data1 = this.ajaxHistoryData.slice(0,this.pageSize);
                } 
            },
            changepage(index){
                var _start = ( index - 1 ) * this.pageSize;
                var _end = index * this.pageSize;
                this.historyData = this.ajaxHistoryData.slice(_start,_end);
            }
        },
  

        created(){
             this.handleListApproveHistory();
             this.getReaseList();
        } 
    }
</script>