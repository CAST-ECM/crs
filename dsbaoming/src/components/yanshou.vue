<template>
    <div class="yanshou">
        <Menu mode="horizontal" theme="light" active-name="1">
            <div>
                <MenuItem name="1">
                <Icon type="ios-information-circle-outline" />
                    申请验收
                </MenuItem>
            </div>
        </Menu>
        <br>
        <div class="mainInput"  v-if="flag">
            <Form :label-width="80" ref="searchInfo" :model="searchInfo" :rules="rulesList">
                    <FormItem label="手机号:" prop="tele">
                        <Input placeholder="组队时以队长手机号为准"  clearable style="width: 200px;" v-model="searchInfo.tele"/>
                    </FormItem>
            </Form>
        </div>
        <div class="mainInput"  v-if="othersflag">
            <Form :label-width="80" ref="yanshouInfo" :model="yanshouInfo" :rules="rulesList">
                    <FormItem label="队长手机号:" prop="stuPhone">
                        <Input disabled style="width: 200px;" v-model="yanshouInfo.stuPhone"/>
                    </FormItem>
                    <FormItem label="队长姓名:" prop="stuName">
                        <Input disabled style="width: 200px;" v-model="yanshouInfo.stuName"/>
                    </FormItem>
                    <FormItem label="是否申请验收" prop="isToBeChecked">
                        <Radio-Group v-model="yanshouInfo.isToBeChecked">
                        <Radio label="是"></Radio>
                        <Radio label="否"></Radio>
                        </Radio-Group>
                    </FormItem>
            </Form>
        </div>
        <div class="mainInput"  v-if="freshmanflag">
            <Form :label-width="80" ref="yanshouInfo" :model="yanshouInfo" :rules="rulesList">
                    <FormItem label="手机号:" prop="stuPhone">
                        <Input disabled style="width: 200px;" v-model="yanshouInfo.stuPhone"/>
                    </FormItem>
                    <FormItem label="学生姓名:" prop="stuName">
                        <Input disabled style="width: 200px;" v-model="yanshouInfo.stuName"/>
                    </FormItem>
                    <FormItem label="是否申请验收" prop="isToBeChecked">
                        <Radio-Group v-model="yanshouInfo.isToBeChecked">
                        <Radio label="是"></Radio>
                        <Radio label="否"></Radio>
                        </Radio-Group>
                    </FormItem>
            </Form>
        </div>
        <div class="bottomFooter" v-show="hidshow" v-if="flag">
            <Button size="large" type="primary" v-on:click="back">返回</Button>
            <Button size="large" type="primary" v-on:click="sendTele">提交</Button>
        </div>
        <div class="bottomFooter" v-show="hidshow" v-if="othersflag">
            <Button size="large" type="primary" v-on:click="back">返回</Button>
            <Button size="large" type="primary" v-on:click="sendOthersInfo">提交</Button>
        </div>
        <div class="bottomFooter" v-show="hidshow" v-if="freshmanflag">
            <Button size="large" type="primary" v-on:click="back">返回</Button>
            <Button size="large" type="primary" v-on:click="sendfreshmanInfo">提交</Button>
        </div>
  </div>
</template>
<script>
export default {
    name:'yanshou',
    data() {
        return {
            flag:true,
            docmHeight:document.documentElement.clientHeight,
            showHeight:'0',//实时屏幕高度
            hidshow:true, //显示或隐藏footer
            isResize:false, //默认屏幕高度是否已获取
            searchInfo:{
                tele:''
            },
            yanshouInfo:{
                stuPhone:'',//记录学生手机号
                stuName:'',//记录学生姓名
                MD5Code:'',//记录学生MD5码
                isToBeChecked:''//记录验收信息
            },
            
            othersflag:false,
            freshmanflag:false,
            rulesList:{
                tele:[
                    {
                        required: true,
                        message: '手机号不可以为空',
                        trigger: 'blur'
                    },
                    {
                        pattern:/^1[3-9]\d{9}$/,
                        message:'手机号格式错误!',
                        trigger:'blur'
                    }
                ],
                stuPhone:[
                    {
                        required: true,
                        message: '手机号不可以为空',
                        trigger: 'blur'
                    },
                    {
                        pattern:/^1[3-9]\d{9}$/,
                        message:'手机号格式错误!',
                        trigger:'blur'
                    }
                ],
                stuName:[
                    {
                        required: true,
                        message: '学生名不可以为空',
                        trigger: 'blur'
                    },
                ],
                isToBeChecked:[
                    {
                        required: true,
                        message: '验收信息不可以为空',
                        trigger: 'blur'
                    },
                ]
            },
        }
    },
    methods:{
            back(){
                this.$router.push({
                    path:'/'
                });
            },
            sendOthersInfo(){
                //提交其他组的验收申请信息
                this.$refs['yanshouInfo'].validate((val)=>{
                    var resultCheck = true;
                    if(this.yanshouInfo.isToBeChecked == '否'){
                        resultCheck = false;
                    }
                    if(val){
                        this.$axios.post(`${this.$url}/othersExam`,{
                            isToBeChecked:resultCheck,
                            Tele:this.yanshouInfo.stuPhone,
                            MD5Code:this.yanshouInfo.MD5Code
                        }).then((response)=>{
                            console.log(response.data)
                            switch (response.data.err_code || response.data.success_code) {
                                case 301:
                                    this.$Message.error('MD5检验错误!');
                                    break;
                                case 302:
                                    this.$Message.error('参数检验错误!');
                                    break;
                                case 200:
                                    this.$Message.success('申请信息提交成功!');
                                    break;
                                case 502:
                                    this.$Message.error('内部服务器出错!');
                                    break;
                                default:
                                    break;
                            }
                        }).catch((err)=>{
                            this.$Message.error('通信错误!');
                        });
                    }else{
                        this.$Message.error('信息有误！');
                        //this.flag = true;
                    }
                });
            },
            sendfreshmanInfo(){
                //提交新生组的验收申请信息
                this.$refs['yanshouInfo'].validate((val)=>{
                    var resultCheck = true;
                    if(this.yanshouInfo.isToBeChecked == '否'){
                        resultCheck = false;
                    }
                    if(val){
                        this.$axios.post(`${this.$url}/freshmanExam`,{
                            isToBeChecked:resultCheck,
                            Tele:this.yanshouInfo.stuPhone,
                            MD5Code:this.yanshouInfo.MD5Code
                        }).then((response)=>{
                            console.log(response.data)
                            switch (response.data.err_code || response.data.success_code) {
                                case 301:
                                    this.$Message.error('MD5检验错误!');
                                    break;
                                case 302:
                                    this.$Message.error('参数检验错误!');
                                    break;
                                case 200:
                                    this.$Message.success('申请信息提交成功!');
                                    break;
                                case 502:
                                    this.$Message.error('内部服务器出错!');
                                    break;
                                default:
                                    break;
                            }
                        }).catch((err)=>{
                            this.$Message.error('通信错误!');
                        });
                    }else{
                        this.$Message.error('信息有误！');
                        //this.flag = true;
                    }
                });
            },
            sendTele(){
                this.$refs['searchInfo'].validate((val)=>{
                                if(val){
                                    this.yanshouInfo.stuPhone = this.searchInfo.tele;
                                    this.$axios.post(`${this.$url}/queryinfobyphone`,{
                                        Tele:this.searchInfo.tele
                                    }).then((response)=>{
                                        console.log(response.data);
                                        if(response.data === 666){
                                            this.$Message.warning('查无此人!');
                                            this.flag = true;
                                        }else{
                                            this.flag = false;
                                            if(!response.data.teamName){
                                                //新生组情况
                                                this.othersflag = false;
                                                this.freshmanflag = true;
                                                this.yanshouInfo.stuName = response.data.studentName;
                                                this.yanshouInfo.MD5Code = response.data.ID;

                                            }else{
                                                //组队时情况
                                                this.othersflag = true;
                                                this.freshmanflag = false;
                                                this.yanshouInfo.stuName = response.data.cName;
                                                this.yanshouInfo.MD5Code = response.data.ID;
                                            }
                                        }
                                    
                                    }).catch((err)=>{
                                        this.$Message.error('通信错误!');
                                        this.flag = true;
                                    })
                                }else{
                                    this.$Message.error('手机号填写有误！');
                                    this.flag = true;
                                }
                    });
            }
    },
    watch: {
        showHeight:function() {        
            if(this.docmHeight > this.showHeight){            
                this.hidshow=false        
            }else{            
                this.hidshow=true        
            }    
        }
    },
    mounted(){
        this.flag = true;
        this.freshmanflag = false;
        this.othersflag = false;
    }
}
</script>
<style scoped>
.yanshou{
    width:100%;
    height: 100%;
    position: relative;
    background: white;
  }
.bottomFooter{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 10%;
        position: fixed;
    }
</style>