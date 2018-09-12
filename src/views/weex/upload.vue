<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }

    .input-form {
        display: flex;
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        flex-direction: column;
        justify-content: center;
        align-items: left;
        margin-top: 5%;
    }
</style>
<template>
    <div class="layout">
        <div>上传新版本</div>
        <div class="input-form">
            <Select v-model="publish_platform" style="width:200px;margin:10px" @on-change="selected">
                <Option v-for="item in platformList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <input v-model="version_code" placeholder="输入版本号" style="margin:10px"/>
            <input v-model="version_name" placeholder="输入版本名称" style="margin:10px"/>
        </div>
        <br/>
        上传类型：
        <RadioGroup v-model="publishType">
            <Radio label="bundle"></Radio>
            <Radio label="imgs"></Radio>
        </RadioGroup>

        <br/>
        <br/>
        是否加密：
        <RadioGroup v-model="encryptType">
            <Radio label="encrypt"></Radio>
            <Radio label="NOencrypt"></Radio>
        </RadioGroup>
        <br/>
        <br/>
        <Upload
                multiple
                with-credentials
                type="drag"
                :data="req_data"
                :action="uploadurl" :on-success="uploadSuccess" :before-upload="beforeCheck">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或将文件拖拽到这里上传</p>
            </div>
        </Upload>

        <Button type="primary" style="margin-bottom: 20px" @click="publish_check">提交</Button>
    </div>
</template>
<script>
    let baseurl = require("../../libs/base").getWeexBusinessURL;
    export default {
        data() {
            return {
                platformList: [
                    {
                        value: 'che001',
                        label: '1号车'
                    },
                    {
                        value: 'ckk',
                        label: '车快快'
                    },
                    {
                        value: 'qylc',
                        label: '轻易理财'
                    },
                    {
                        value: 'qyfq',
                        label: '轻易分期'
                    },
                    {
                        value: 'developmentbusiness',
                        label: '展业APP'
                    }
                ],
                publish_platform: '',
                path:'',
                req_data: {},
                version_name:'',
                version_code:'',
                publishType:'bundle',//上传类型,bundle imgs
                encryptType:'encrypt',//上传类型,bundle imgs
                uploadurl:baseurl+'UploadZipServlet'
            }
        },
        methods: {
            uploadSuccess(response) {
                console.log(response)
                if('needlogin'===response){
                    this.$router.push({path:'/'});
                    return;
                }
                this.path=response.path;
                this.$Message.info('上传成功！');
            },
            getPublishList() {

            },
            getdata() {
                console.log("获取上传数据")
                return {
                    platform: this.publish_platform
                };
            },
            selected(value) {
                this.req_data.platform = value;
            },
            beforeCheck(data) {
                console.log(data);
                if(this.publish_platform===""){
                    this.$Message.info('请选择平台');
                    return false;
                }else if(this.version_code===""){
                    this.$Message.info('请填写版本号');
                    return false;
                }
                this.req_data.version_code=this.version_code;
                this.req_data.version_name=this.version_name;
                return true;
            },
            publish(){
                var temp = this;
                this.$http.post(baseurl+'Weex?action=publish',
                    {
                        version:"2",
                        versionName:temp.version_name,
                        versionCode:temp.version_code,
                        type:temp.publishType,
                        encrypt:temp.encryptType,
                        path:temp.path,
                        platform:temp.publish_platform
                    },
                    {
                        headers: {},
                        emulateJSON: true,
                        credentials: true
                    }
                ).then((response) => {
                    if('needlogin'===response.data){
                        this.$router.push({path:'/'});
                        return;
                    }

                    this.$Message.info('发布成功！');
                    console.log('result is here' + response.data);
                }).catch(function (response) {
                    console.log(response)
                });
            },
            publish_check(){
                var temp = this;

                if(temp.publish_platform===""){
                    this.$Message.info('请选择平台');
                    return;
                }else if(temp.version_name===""){
                    this.$Message.info('请选填写版本名称');
                    return;
                }else if(temp.version_code===""){
                    this.$Message.info('请填写版本号');
                    return;
                }else if(temp.version_code===""){
                    this.$Message.info('请上传weex包');
                    return;
                }

                this.$http.post(baseurl+'Weex?action=publish_check',
                    {
                        versionName:temp.version_name,
                        versionCode:temp.version_code,
                        type:temp.publishType,
                        path:temp.path,
                        platform:temp.publish_platform
                    },
                    {
                        headers: {},
                        emulateJSON: true,
                        credentials: true
                    }
                ).then((response) => {
                    if('needlogin'===response.data){
                        this.$router.push({path:'/'});
                        return;
                    }
                    if("exist"===response.data){
                        temp.$Modal.confirm({
                            title: '请确认',
                            content: '版本已经存在，是否覆盖以前发布？',
                            onOk: () => {
                                temp.publish();
                            },
                            onCancel: () => {

                            }
                        });
                    }else if("ok"===response.data) {
                        temp.publish();
                    }else if(response.data.indexOf('DuplicateFile')!==-1){
                        if("bundle"===temp.publishType){
                            this.$Modal.error({
                            title: "注意",
                            content: '有重复文件，请检查！（'+response.data+')'
                            });

                            return;
                        }else{
                            
                            temp.$Modal.confirm({
                            title: '请确认',
                            content: '图片资源有重复，是否覆盖？（'+response.data+')',
                            onOk: () => {
                                temp.publish();
                            },
                            onCancel: () => {
                                
                            }
                        });
                        }
                    }

                    
                    console.log('result is here' + response.data);
                }).catch(function (response) {
                    console.log(response)
                });
            }
        }
    }
</script>