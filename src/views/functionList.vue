<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
</style>
<template>
    <div class="layout">
        <div @click="getList">发布版本列表</div>
        <Table :columns="columns1" :data="data1">
        </Table>
        <Page :total="totalNum" style="position: absolute;right: 0;margin-top: 10px" @on-change="page"></Page>
    </div>
</template>
<script>
    let baseurl = require("../libs/base").getBusinessURL;
    export default {
        data() {
            return {
                columns1: [
                    {
                        title: 'id',
                        key: 'id',
                        width:80
                    },
                    {
                        title: '平台名称',
                        key: 'platform'
                    },
                    {
                        title: '功能',
                        key: 'versionName'
                    },
                    {
                        title: '版本号',
                        key: 'version'

                    },
                    {
                        title: '发布日期',
                        key: 'publishTime'
                    },
                   {
                        title: '发布状态',
                        key: 'publishStatus'
                    },
                     
                    {
                        title: '全量发布',
                        key: 'fullSend',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View')
                            ]);
                        }
                    },
                    {
                        title: '撤回',
                        key: 'backSend',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View')
                            ]);
                        }
                    },
                    {
                        title: '详情',
                        key: 'detailSend',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, 'View')
                            ]);
                        }
                    },
                    

                ],
                data1: [
                ],
                totalNum:0,
                pageNum:0,

            }
        },
        methods: {
            //请求所有发布的功能列表
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
                            pageLimit: 8
                        },credentials:true
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