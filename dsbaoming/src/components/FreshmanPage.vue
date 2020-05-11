<template>
<div class="maincontent">
        <Menu mode="horizontal" theme="light" active-name="1">
            <div>
                <MenuItem name="1">
                <Icon type="ios-flag-outline" />
                    单人组报名
                </MenuItem>
            </div>
        </Menu>
        <br>
        <Form :label-width="80" ref="stuInfo" :model="stuInfo" :rules="rulesList">
            <FormItem label="学号:" prop="studentNum">
                <Input placeholder="请输入学号" style="width: 200px;" v-model="stuInfo.studentNum" type="text"/>
            </FormItem>
            <FormItem label="姓名:" prop="studentName">
                <Input placeholder="请输入姓名" style="width: 200px;" v-model="stuInfo.studentName" type="text"/>
            </FormItem>
            <FormItem label="班级号:" prop="studentClass">
                <Input placeholder="默认为学号前7位" style="width: 200px;" v-model="stuInfo.studentClass"/>
            </FormItem>
            <FormItem label="专业:" prop="majorDire">
                <Input placeholder="请输入你当前所在专业名称" style="width: 200px;" v-model="stuInfo.majorDire"/>
            </FormItem>
            <FormItem label="手机号:" prop="tele">
                <Input placeholder="请输入手机号" style="width: 200px;" v-model="stuInfo.tele"/>
            </FormItem>
            <FormItem label="擅长方向:" prop="prefer">          
                <Select v-model="stuInfo.prefer" style="width:200px;" placeholder="请选择擅长方向">
                    <Option v-for="item in preferLists" :value="item.value" :key="item.value">
                        {{ item.label }}
                    </Option>
                </Select>
            </FormItem>
        </Form>
        <div class="bottomFooter"  v-show="hidshow">
                <Button-group shape="circle" class="btnGroup"  >
                    <Button type="primary" v-on:click="backtoIndex">
                    <Icon type="ios-arrow-back"></Icon>
                        返回首页
                    </Button>
                    <Button type="primary" v-on:click="submitInfo">
                        信息提交
                    <Icon type="ios-arrow-forward"></Icon>
                    </Button>
                </Button-group>
        </div> 
        
</div>
</template>

<script>
export default {
  name: 'FreshmanPage',
  data () {
    return {
      stuInfo:{
            studentNum: '', //学号
            studentClass: '', //班级号
            majorDire: '', //专业
            studentName: '', //学生姓名
            prefer: '', //擅长方向 
            tele: '', //手机号码
            md5Code: '', //唯一码  
        },
        docmHeight:document.documentElement.clientHeight,
        showHeight:'0',//实时屏幕高度
        hidshow:true, //显示或隐藏footer
        isResize:false, //默认屏幕高度是否已获取
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
            studentName:[
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
            studentNum:[
                {
                    required: true,
                    message: '学号不可以为空',
                    trigger: 'blur'
                },
                {
                    pattern: /^[B|Q|H]{1}1[9]\d{6}$/,
                    message: '学号格式有误',
                    trigger: 'blur'
                }
            ],
            studentClass:[
                {
                    required: true,
                    message: '班级号不可以为空',
                    trigger: 'blur'
                },
                {
                    pattern: /^[B|Q|H]{1}1[9]\d{4}$/,
                    message: '班级号格式有误',
                    trigger: 'blur'
                }
            ],
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
            prefer:[
                {
                    required: true,
                    message: '擅长方向不可以为空',
                }
            ],
            majorDire:[
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
            ]

        }
        
    }
  },
  methods:{
      backtoIndex(){
          this.$router.push({
            path:'/',
          })
      },
      processErr(){

      },
      submitInfo(){
          this.$refs['stuInfo'].validate((val)=>{
              if (val) {
                    this.stuInfo.md5Code = this.$md5(this.stuInfo.studentNum+this.stuInfo.studentName+this.stuInfo.majorDire+this.stuInfo.prefer+this.stuInfo.tele+'jkispretty');
                    this.$axios.post(`${this.$url}/freshman`,{
                    studentNum:this.stuInfo.studentNum+'',
                    studentName:this.stuInfo.studentName+'',
                    studentClass:this.stuInfo.studentClass+'',
                    majorDire:this.stuInfo.majorDire+'',
                    tele:this.stuInfo.tele+'',
                    prefer:this.stuInfo.prefer+'',
                    md5Code:this.stuInfo.md5Code+''
                    }).then((response)=>{
                        var result = response.data;
                        console.log(result);
                        switch (result.status_code) {
                            case 200:
                                this.$Modal.success({
                                    title:'报名成功!',
                                    content: `你的认证码为:${this.stuInfo.md5Code},请妥善保管认证码以方便后续信息修改和选题!`
                                });
                                break;
                            case 567:
                                this.$Message.error('该学号已被报名!');
                                break;
                            case 568:
                                this.$Message.error('该手机号已被报名!');
                                break;
                            case 566:
                                this.$Message.error('数据校验不通过!');
                                break;
                            case 500:
                                this.$Message.error('服务器内部故障!');
                                break;    
                        }

                    }).catch((err)=>{
                        console.log(err);
                        this.$Message.error('提交失败！');
                    });
              }else{
                 this.$Message.error('信息填写有误，请仔细检查!');
              }
          });      
      }
  },
  created(){  //生命周期里接收参数
    // this.id = this.$route.query.id,  //接受参数关键代码
    // console.log(this.id)   
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
    .maincontent{
        width: 100%;
        height: 100%;
        position: absolute;
        background: white;
    }
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