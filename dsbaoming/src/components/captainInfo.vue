<template>
        <div class="captaincontent">
          <Form :label-width="100" ref="stuInfo" :model="stuInfo" :rules="rulesList">
            <FormItem label="队伍名称:" prop="teamName">
                <Input placeholder="请输入队伍名称" style="width: 200px;" v-model="stuInfo.teamName"/>
            </FormItem>
            <FormItem label="队长学号:" prop="cNum">
                <Input placeholder="请输入队长学号" style="width: 200px;" v-model="stuInfo.cNum"/>
            </FormItem>
            <FormItem label="队长姓名:" prop="cName">
                <Input placeholder="请输入队长姓名" style="width: 200px;" v-model="stuInfo.cName"/>
            </FormItem>
            <FormItem label="队长专业:" prop="cMajorDire">
                    <Input placeholder="请输入队长专业" style="width: 200px;" v-model="stuInfo.cMajorDire"/>
                </FormItem>
            <FormItem label="队长班级号:" prop="cClass">
                <Input placeholder="默认为学号前7位(转专业同学以实际所在班级为准)" style="width: 200px;" v-model="stuInfo.cClass"/>
            </FormItem>
            <FormItem label="队长手机号:" prop="cTele">
                <Input placeholder="请填写队长联系方式" style="width: 200px;" v-model="stuInfo.cTele"/>
            </FormItem>
            <FormItem label="队长擅长方向:" prop="cPrefer">          
                <Select v-model="stuInfo.cPrefer" clearable style="width:200px;" placeholder="请选择队长擅长方向">
                <Option v-for="item in  preferLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
          </Form>
          <br>
          <div class="bottomFooter" v-show="hidshow">
                <Button-group class="btnGroup" shape="circle">
                    <i-button type="primary"  v-on:click="backtoIndex">
                        <Icon type="chevron-left"></Icon>
                        返回首页
                    </i-button>
                    <i-button type="primary" v-on:click="sendInfoAndJump">
                        下一页
                        <Icon type="chevron-right"></Icon>
                    </i-button>
                </Button-group>
           </div>
        </div>
        
        </template>
        
        <script>
        export default {
          name: 'captainInfo',
          props:['stu_val'],
          data () {
            return {
              stuInfo:{
                teamName:'',//队伍名称
                cNum:'', //队长学号
                cClass:'',//队长班级号
                cName:'',//队长姓名
                cMajorDire:'',//队长专业
                cPrefer:'',//队长擅长方向
                cTele:'',//队长联系方式
        
              },
              preferLists: [
                            {
                                value: '模拟电路',
                                label: '模拟电路'
                            },
                            {
                                value: '单片机',
                                label: '单片机'
                            },
                            {
                                value: 'FPGA',
                                label: 'FPGA'
                            },
           
                    ],
             rulesList:{
                teamName:[
                    {
                        required: true,
                        message: '队名不可以为空',
                        trigger: 'blur'
                    },
                 ],
                cNum:[
                    {
                        required: true,
                        message: '学号不可以为空',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^[B|Q|H]{1}1[6|7|8]\d{6}$/,
                        message: '学号格式有误',
                        trigger: 'blur'
                    }
                ],
                cName:[
                    {
                        required: true,
                        message: '姓名不可以为空',
                        trigger: 'blur'
                    },
                    {
                        pattern: /[\u4e00-\u9fa5]{1,}/,
                        message: '姓名包含非法字符!',
                        trigger: 'blur'
                    }
                ],
                cClass:[
                    {
                        required: true,
                        message: '班级号不可以为空',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^[B|Q|H]{1}1[6|7|8]\d{4}$/,
                        message: '班级号格式有误',
                        trigger: 'blur'
                    }
                ],
                cMajorDire:[
                    {
                        required: true,
                        message: '专业信息不可以为空',
                        trigger: 'blur'
                    },
                    {
                        pattern: /[\u4e00-\u9fa5]{1,}/,
                        message: '专业名称中包含非法字符!',
                        trigger: 'blur'
                    }
                ],
                cPrefer:[
                    {
                        required: true,
                        message: '擅长方向不可以为空',
                    }
                ],
                cTele:[
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
                

             },
            docmHeight:document.documentElement.clientHeight,
            showHeight:'0',//实时屏幕高度
            hidshow:true, //显示或隐藏footer
            isResize:false, //默认屏幕高度是否已获取
            }
            
          },
          methods: {
            backtoIndex(){
                this.$router.push({
                path:'/',
            })
            },
            sendInfoAndJump(){
                this.$refs['stuInfo'].validate((val)=>{
                    if(val){
                    this.$emit('senddatatofather',{
                    flag:'captainInfo',
                    teamName:this.stuInfo.teamName,//队伍名称
                    cNum:this.stuInfo.cNum, //队长学号
                    cClass:this.stuInfo.cClass,//队长班级号
                    cName:this.stuInfo.cName,//队长姓名
                    cMajorDire:this.stuInfo.cMajorDire,//队长专业
                    cPrefer:this.stuInfo.cPrefer,//队长擅长方向
                    cTele:this.stuInfo.cTele,//队长联系方式
                })
                    }else{
                        this.$Message.error('信息填写有误，请检查!');
                    }
                });
            }
          },
          mounted(){  //生命周期里接收参数
            this.stuInfo.teamName = this.stu_val.teamName;
            this.stuInfo.cNum = this.stu_val.cNum;
            this.stuInfo.cName = this.stu_val.cName;
            this.stuInfo.cMajorDire = this.stu_val.cMajorDire;
            this.stuInfo.cClass = this.stu_val.cClass;
            this.stuInfo.cPrefer= this.stu_val.cPrefer;
            this.stuInfo.cTele=this.stu_val.cTele; 
            window.onresize = ()=>{
                return (()=>{
                    // 实时屏幕高度                       
                        this.showHeight = document.body.clientHeight                 
                    })()
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
            }
        }
        </script>
        
        <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .bottomFooter{
        position: absolute;
        bottom: 30px;
        position: fixed;
    }
    .btnGroup{
         left: 40%;
    }
</style>