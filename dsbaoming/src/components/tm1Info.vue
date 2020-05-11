<template>
    <div class="tm1content">
          <Form :label-width="110" ref="stuInfo" :model="stuInfo" :rules="rulesList">
            <FormItem label="队员一学号:" prop="tm1Num">
                <Input placeholder="请输入队员一学号" style="width: 200px;" v-model="stuInfo.tm1Num"/>
            </FormItem>
            <FormItem label="队员一姓名:" prop="tm1Name">
                <Input placeholder="请输入队员一姓名" style="width: 200px;" v-model="stuInfo.tm1Name"/>
            </FormItem>
            <FormItem label="队员一专业:" prop="tm1MajorDire">
                    <Input placeholder="请输入队员一专业" style="width: 200px;" v-model="stuInfo.tm1MajorDire"/>
                </FormItem>
            <FormItem label="队员一班级号:" prop="tm1Class">
                <Input placeholder="默认为学号前7位(转专业同学以实际所在班级为准)" style="width: 200px;" v-model="stuInfo.tm1Class"/>
            </FormItem>
            <FormItem label="队员一手机号:" prop="tm1Tele">
                <Input placeholder="请填写队员一联系方式" style="width: 200px;" v-model="stuInfo.tm1Tele"/>
            </FormItem>
            <FormItem label="队员一擅长方向:" prop="tm1Prefer">          
                <Select v-model="stuInfo.tm1Prefer" clearable style="width:200px;" placeholder="请选择队员一擅长方向">
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
                        下一页
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
                tm1Num:'',//队员一学号
                tm1Class:'',//队员一班级号
                tm1Name:'',//队员一姓名
                tm1MajorDire:'',//队员一专业
                tm1Prefer:'',//队员一擅长方向
                tm1Tele:'',//队员一手机号
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
                tm1Num: [
                    {
                        required: true,
                        message: '学号不可以为空',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^[B|Q|H]{1}1[6|7|8|9]\d{6}$/,
                        message: '学号格式有误',
                        trigger: 'blur'
                    }
                ],
                tm1Name:[
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
                tm1Class:[
                    {
                        required: true,
                        message: '班级号不可以为空',
                        trigger: 'blur'
                    },
                    {
                        pattern: /^[B|Q|H]{1}1[6|7|8|9]\d{4}$/,
                        message: '班级号格式有误',
                        trigger: 'blur'
                    }
                ],
                tm1MajorDire:[
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
                tm1Prefer:[
                    {
                        required: true,
                        message: '擅长方向不可以为空',
                    }
                ],
                tm1Tele:[
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
            backagain(){
                this.$emit("backback",{
                    comname:'tm1Info'
                })
            },
            sendInfoAndJump(){
                this.$refs['stuInfo'].validate((val)=>{
                    if(val){
                    this.$emit('senddatatofather',{
                    flag:'tm1Info',
                    tm1Num:this.stuInfo.tm1Num,
                    tm1Class:this.stuInfo.tm1Class,
                    tm1Name:this.stuInfo.tm1Name,
                    tm1MajorDire:this.stuInfo.tm1MajorDire,
                    tm1Prefer:this.stuInfo.tm1Prefer,
                    tm1Tele:this.stuInfo.tm1Tele,
                        })
                    }else{
                        this.$Message.error('信息填写有误，请检查!');
                    }
                });
                

            }
          },
          mounted(){  //生命周期里接收参数
            this.stuInfo.tm1Num = this.stu_val.tm1Num;
            this.stuInfo.tm1Name = this.stu_val.tm1Name;
            this.stuInfo.tm1MajorDire = this.stu_val.tm1MajorDire;
            this.stuInfo.tm1Class = this.stu_val.tm1Class;
            this.stuInfo.tm1Prefer= this.stu_val.tm1Prefer;
            this.stuInfo.tm1Tele=this.stu_val.tm1Tele; 
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