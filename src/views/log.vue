<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
</style>

<template>
    <div class="layout">
        <div @click="getList">操作日志</div>
        <Table :columns="columns1" :data="data1"></Table>
        <Page :total="totalNum" show-sizer style="position: absolute;right: 0;margin-top: 10px" @on-change="page"></Page>
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
                        title: '操作人',
                        key: 'operator'
                    },
                    {
                        title: '操作内容',
                        key: 'event'
                    },
                    {
                        title: '系统版本号',
                        key: 'version'

                    },
                    {
                        title: '操作日期',
                        key: 'publishTime'
                    }
                ],
                data1: [
                ],
                totalNum:0,
                pageNum:0,
            }
        },
        methods: {
            getList() {
                console.log("baseurl is "+baseurl);
//                this.$http.get('http://localhost:8080', data => {
////                    this.$set('news', data.stories);
//                    console.log('6666');
//                    this.$Message.info('这是一条普通的提醒'+data.body);
//                });
                var self =this;
                this.$http.get(baseurl+'logs',
                    {
                        params:{
                            productType: "1",
                            pageNum: self.pageNum,
                            pageLimit: 8
                        },credentials:true
                    }
                ).then((response) => {
                    console.log('result is here' + response.data);

                    if('needlogin'===response.data.data){
                        this.$router.push({path:'/'});
                        return;
                    }
                    this.data1=response.data.data;
                    this.totalNum = response.data.total

                }).catch(function (response) {
                    console.log(response)
                });

            },
            testArray() {
                var self =this;
                this.$http.post(baseurl+'array',
                    {
                        productType: "1",
                        inserts: ["1","2","3"],
                        pageNum: self.pageNum,
                        pageLimit: 8
                    }
                ).then((response) => {
                    console.log('result is here' + response.data);

                    if('needlogin'===response.data.data){
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
            // this.testArray();
        }
    }
</script>