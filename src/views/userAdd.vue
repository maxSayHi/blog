// 用户列表

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
            <Select v-model="publish_platform" style="width:200px;margin:10px" @on-change="selected">
                <Option v-for="item in platformList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
             <Button type="primary" @click="query">查询</Button>
        </div>
         
        <Table :columns="columns1" :data="data1"></Table>
        <div style="text-align: center">
            <Button type="primary" style="width: 35%;margin-top: 20px;" @click="present">确定</Button>
        </div>
    </div>
</template>
<script>
    let baseurl = require("../libs/base").getBusinessURL;

    export default {
        data() {
            return {
                platformList:[
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
                model1:'轻易理财Android',
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
                    {
                        plateform_name:'轻易理财iOS',
                        appversion_name:'10010',
                       appversion_name:'10010',
                       release_time:'2017-9-8',  
                    
                    },
                    {
                        plateform_name:'轻易理财iOS',
                        appversion_name:'10010',
                       appversion_name:'10010',
                       release_time:'2017-9-8', 
                    },
                    {
                         plateform_name:'轻易理财iOS',
                        appversion_name:'10010',
                       appversion_name:'10010',
                       release_time:'2017-9-8', 
                    },
                    {
                        plateform_name:'轻易理财iOS',
                        appversion_name:'10010',
                       appversion_name:'10010',
                       release_time:'2017-9-8', 
                    }
                ]
            }
        },
        methods: {
            present:function (e) {

            },
            query:function (e) {

            },




            getList() {
                console.log("baseurl is "+baseurl);
//                this.$http.get('http://localhost:8080', data => {
////                    this.$set('news', data.stories);
//                    console.log('6666');
//                    this.$Message.info('这是一条普通的提醒'+data.body);
//                });
                var self =this;
                this.$http.get(baseurl+'Weex?action=list&platform=publish',
                    {
                        params:{
                            productType: "1",
                            pageNum: self.pageNum,
                            pageLimit: 8,
                            credentials: true
                        }
                    },
                    {
                        headers: {},
                        emulateJSON: true,
                    }
                ).then((response) => {
                    console.log('result is here' + response.data);

                    if('needlogin'===response.data){
                        this.$router.push({path:'/'});
                        return;
                    }
                    this.data1=response.data.data;
                    this.totalNum = response.data.totalNum


                }).catch(function (response) {
                    console.log(response)
                });

            },
            moment: function () {
                return moment();
            },
            page: function (e) {
//                this.$Message.info('上传成功！'+e);
                this.pageNum=e-1;
                this.getList();
            },
            show:function (index) {
//                this.$Message.info(index+' 路径是'+this.data1[index].path);
                var self =this;
                this.$Modal.info({
                    title: "路径是",
                    content: self.data1[index].path
                });
            }
        },
        mounted: function () {
            this.getList();
        }
    }
</script>