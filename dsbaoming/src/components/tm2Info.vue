<template>
        <div class="tm2content">
          <Form :label-width="100" ref="stuInfo" :model="stuInfo" :rules="rulesList">
            <FormItem label="队员二学号:" prop="tm2Num">
                <Input placeholder="请输入队员二学号" style="width: 200px;" v-model="stuInfo.tm2Num"/>
            </FormItem>
            <FormItem label="队员二姓名:" prop="tm2Name">
                <Input placeholder="请输入队员二姓名" style="width: 200px;" v-model="stuInfo.tm2Name"/>
            </FormItem>
            <FormItem label="队员二专业:" prop="tm2MajorDire">
                    <Input placeholder="请输入队员二专业" style="width: 200px;" v-model="stuInfo.tm2MajorDire"/>
                </FormItem>
            <FormItem label="队员二班级号:" prop="tm2Class">
                <Input placeholder="默认为学号前7位(转专业同学以实际所在班级为准)" style="width: 200px;" v-model="stuInfo.tm2Class"/>
            </FormItem>
            <FormItem label="队员二手机号:" prop="tm2Tele">
                <Input placeholder="请填写队员二联系方式" style="width: 200px;" v-model="stuInfo.tm2Tele"/>
            </FormItem>
            <FormItem label="队员二擅长方向:" prop="tm2Prefer">          
                <Select v-model="stuInfo.tm2Prefer" clearable style="width:200px;" placeholder="请选择队员二擅长方向">
                <Option v-for="item in  preferLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
          </Form>
          <br>
          <div class="bottomFooter" v-show="hidshow">
                <Button-group class="btnGroup" shape="circle">
                    <i-button type="primary" v-on:click="backagain">
                        <Icon type="chevron-left"></Icon>
                        上一页
                    </i-button>
                    <i-button type="primary" v-on:click="sendInfoAndJump">
                        提交信息
                        <Icon type="chevron-right"></Icon>
                    </i-button>
                </Button-group>
           </div>
        </div>
        
        </template>
        
        <script>
        export default {
          name: 'tm1Info',
          props:['stu_val'],
          data () {
            return {
              stuInfo:{
                tm2Num:'',//队员二学号
                tm2Class:'',//队员二班级号
                tm2Name:'',//队员二姓名
                tm2Prefer:'',//队员二擅长方向
                tm2Tele:'',//队员二联系方式
                tm2MajorDire:'',//队员二专业
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
                tm2Num: [
                    {
                        pattern: /^[B|Q|H]{1}1[6|7|8|9]\d{6}$/,
                        message: '学号格式有误',
                        trigger: 'blur'
                    }
                ],
                tm2Name:[
                    {
                        pattern: /[\u4e00-\u9fa5]{1,}/,
                        message: '姓名包含非法字符!',
                        trigger: 'blur'
                    }
                ],
                tm2Class:[
                    {
                        pattern: /^[B|Q|H]{1}1[6|7|8|9]\d{4}$/,
                        message: '班级号格式有误',
                        trigger: 'blur'
                    }
                ],
                tm2MajorDire:[
                    {
                        pattern: /[\u4e00-\u9fa5]{1,}/,
                        message: '专业名称中包含非法字符!',
                        trigger: 'blur'
                    }
                ],
                tm2Tele:[
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
            backagain(){
                this.$emit("backback",{
                    comname:'tm2Info'
                })
            },
            sendInfoAndJump(){
                this.$emit('senddatatofather',{
                    flag:'tm2Info',
                    tm2Num:this.stuInfo.tm2Num,
                    tm2Class:this.stuInfo.tm2Class,
                    tm2Name:this.stuInfo.tm2Name,
                    tm2MajorDire:this.stuInfo.tm2MajorDire,
                    tm2Prefer:this.stuInfo.tm2Prefer,
                    tm2Tele:this.stuInfo.tm2Tele,
                })

            }
          },
          created(){  //生命周期里接收参数
            this.stuInfo.tm2Num = this.stu_val.tm2Num;
            this.stuInfo.tm2Name = this.stu_val.tm2Name;
            this.stuInfo.tm2MajorDire = this.stu_val.tm2MajorDire;
            this.stuInfo.tm2Class = this.stu_val.tm2Class;
            this.stuInfo.tm2Prefer= this.stu_val.tm2Prefer;
            this.stuInfo.tm2Tele=this.stu_val.tm2Tele;   
          },
          mounted () {
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
         left: 25%;
            /* transform: translateX(-10%); */
        }
        </style>