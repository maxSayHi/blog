<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    壹号车移动平台
                </p>

                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
// import Cookies from 'js-cookie';
    let baseurl = require("../libs/base").getBusinessURL;
    let baseWeexurl = require("../libs/base").getWeexBusinessURL;

export default {
    data () {
        return {
            form: {
                userName: 'admin',
                password: '000000'
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (!valid) {
                    return;
                }
                var SHA256 = require("crypto-js/sha256");
                var password = SHA256('che001mobile');
                console.log("request is"+baseurl+"login?AdminName="+this.form.userName+"&AdminPass="+SHA256(this.form.password));
                this.$http.get(baseurl+"login?AdminName="+this.form.userName+"&AdminPass="+SHA256(this.form.password),
                    {
                        credentials: true
                    },
                ).then((response) => {

                    if(response.ok && response.data.code == 10000){
                        
                            // 拿到token
                            var token = response.data.data.token;
                            if (token.length > 0) {
                                
                                localStorage.setItem("token",token);
                            // this.$Message.info(localStorage.token);
                                // 成功后跳转页面
                                // this.$router.push({path:'/main'});
                                this.loginWeex();
                            } else {
                                this.$Message.info(response.data.msg);
                            }
                    } else {
                        this.$Message.info(response.data.msg);
                    }
                }).catch(function (response) {
                    console.log(' catch: ' + JSON.stringify(response));
                });
            });
        },
        loginWeex () {
            this.$refs.loginForm.validate((valid) => {
                var SHA256 = require("crypto-js/sha256");
                var password = SHA256('che001mobile');
                this.$http.get(baseWeexurl+'Weex?action=login&name=admin&pwd=bf4d58ea014fa6593637206c38df1a793b13e0026bf4276f6b10ce785c0d98d7',
                    {
                        credentials: true
                    },
                ).then((response) => {
                    if(response.data.code==0){
                        this.$router.push({path:'/weex_list'});
                    }else {
                        this.$Message.info(response.data.msg);
                    }
                }).catch(function (response) {
                    console.log(' catch: ' + JSON.stringify(response));
                });
            });
        }
    }
};
</script>
