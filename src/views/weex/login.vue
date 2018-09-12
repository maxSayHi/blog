<style scoped>
    .layout{
        display:flex;
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 5%;
    }
</style>
<template>
    <div style="display:flex;align-items: center;justify-content: center;flex-direction: column">
        <div>
            <img src="../../images/che001.png" style="margin: 50px">
            <img src="../../images/weex.svg" style="margin: 50px">
        </div>

        <div class="layout">
            <h1 style="margin-top: 10px">管理员登录</h1>
            <Input placeholder="用户名" style="width: 300px;margin:20px" v-model="name"></Input>
            <Input placeholder="密码" style="width: 300px;margin:20px" type="password" v-model="pwd" @keyup.enter.native="login"></Input>
            <Button type="primary" style="margin-bottom: 20px" @click="login">登录</Button>
        </div>
    </div>

</template>
<script>
    let baseurl = require("../../libs/base").getWeexBusinessURL;
    export default {
        data() {
            return {
                name:'',
                pwd:''
            }
        },
        methods:{
            login(){
                var SHA256 = require("crypto-js/sha256");

                var password = SHA256('che001mobile');

                this.$http.get(baseurl+'Weex?action=login&name='+this.name+'&pwd='+SHA256(this.pwd),
                    {
                        productType: "1",
                        pageNum: 1,
                        pageLimit: 8,
                        credentials: true
                    },
                    {
                        headers: {},
                        emulateJSON: true
                    }
                ).then((response) => {
//                    this.articles = response.data.data.list;
                    console.log('result is here' + response.data.code);
                    if(response.data.code==0){
                        this.$router.push({path:'/main'});
                    }else {
                        this.$Message.info(response.data.msg);
                    }

                }).catch(function (response) {
                    console.log(response)
                });
                //this.$router.push({path:'/main'});
            }
        }
    }
</script>