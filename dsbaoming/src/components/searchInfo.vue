<template>
  <div id="searchInfo">
    <Menu mode="horizontal" theme="light" active-name="1">
    <div>
        <MenuItem name="1">
        <Icon type="ios-information-circle-outline" />
            信息查询
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
  <div class="showInfo1" v-if="flag1">
    <!-- <p>MD5码: {{freshmanInfo.ID}}</p>
    <p>姓名: {{freshmanInfo.studentName}}</p>
    <p>已选题目:{{freshmanInfo.selectedPro || '无'}}</p> -->
    <table cellspacing="0" cellpadding="0">
      <tbody>
        <tr>
          <td align="right">MD5码</td>
          <td align="center">{{freshmanInfo.ID}}</td>
        </tr>
        <tr>
          <td align="right">姓名</td>
          <td align="center">{{freshmanInfo.studentName}}</td>
        </tr>
        <tr>
          <td align="right">已选题目</td>
          <td align="center">{{freshmanInfo.selectedPro || '无'}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="showInfo2" v-if="flag2">
    <table cellspacing="0" cellpadding="0">
      <tr>
        <td align="right">MD5码</td>
        <td align="center">{{othersInfo.ID}}</td>
      </tr>
      <tr>
        <td align="right">队伍名称</td>
        <td align="center">{{othersInfo.teamName}}</td>
      </tr>
      <tr>
        <td align="right">队长姓名</td>
        <td align="center">{{othersInfo.cName}}</td>
      </tr>
      <tr>
        <td align="right">队员一姓名</td>
        <td align="center">{{othersInfo.tm1Name}}</td>
      </tr>
      <tr>
        <td align="right">队员二姓名</td>
        <td align="center">{{othersInfo.tm2Name || '无'}}</td>
      </tr>
      <tr>
        <td align="right">已选题目</td>
        <td align="center">{{othersInfo.selectedPro||'无'}}</td>
      </tr>
    </table>
  </div>
  <br>
  <div class="bottomFooter" v-show="hidshow" v-if="flag1">
      <Button size="large" type="primary" v-on:click="back">返回</Button>
      
  </div>
  <br>
  <div class="bottomFooter" v-show="hidshow" v-if="flag2">
      <Button size="large" type="primary" v-on:click="back">返回</Button>
      
  </div>
  <br>
  <div class="bottomFooter" v-show="hidshow" v-if="flag">
      <Button size="large" type="primary" v-on:click="back">返回</Button>
      <Button size="large" type="primary" v-on:click="sendTele">提交</Button>
  </div>
  </div>
</template>

<script>
export default {
  name: 'searchInfo',
  data(){
      return{
        msg:'本组件用来根据新生手机号或队长手机号查询信息',
        searchInfo:{
          tele:''
        },
        freshmanInfo:{
          ID:'',
          selectedPro:'',
          studentName:''
        },
        othersInfo:{
          ID:'',
          teamName:'',
          cName:'',
          tm1Name:'',
          tm2Name:'',
          selectedPro:''
        },
        flag:true,
        flag1:false,
        flag2:false,
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
            

        },
        docmHeight:document.documentElement.clientHeight,
        showHeight:'0',//实时屏幕高度
        hidshow:true, //显示或隐藏footer
        isResize:false, //默认屏幕高度是否已获取
      }
  },
  methods:{
    back(){
      this.$router.push({
        path:'/'
      });
    },
    sendTele(){
      this.$refs['searchInfo'].validate((val)=>{
                    if(val){
                        this.$axios.post(`${this.$url}/queryinfobyphone`,{
                            Tele:this.searchInfo.tele
                        }).then((response)=>{
                          let data = response.data.data;
                          if(response.data.status_code == 500){
                             this.$Message.error('数据验证失败!');
                          }
                          // console.log(data);
                          // if()
                          if(data!='404'){
                            if(data[0].teamName){
                              // console.log('组队的');
                              this.flag = false;
                              this.flag1 = false;
                              this.flag2 = true;
                              this.othersInfo.ID = data[0].ID;
                              this.othersInfo.teamName = data[0].teamName;
                              this.othersInfo.cName = data[0].cName;
                              this.othersInfo.tm1Name = data[0].tm1Name;
                              this.othersInfo.tm2Name = data[0].tm2Name || '';
                              this.othersInfo.selectedPro = data[0].selectedPro || '';
                            }else{
                              // console.log('个人');
                              this.flag = false;
                              this.flag1 = true;
                              this.flag2 = false;
                              this.freshmanInfo.ID =data[0].ID;
                              this.freshmanInfo.studentName = data[0].studentName,
                              this.freshmanInfo.selectedPro = data[0].selectedPro || '';
                            }
                            
                          }else{
                            this.$Message.error('未查询到相关信息!');
                            this.flag = true;
                            this.flag1 = false;
                            this.flag2 = false;
                          }
                          
                        }).catch((err)=>{
                            console.log(err);
                            this.$Message.error('提交失败！');
                            this.flag = true;
                            this.flag1 = false;
                            this.flag2 = false;
                        })
                    }else{
                        this.$Message.error('手机号填写有误！');
                        this.flag = true;
                        this.flag1 = false;
                        this.flag2 = false;
                        
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
    this.flag1 = false;
    this.flag2 = false;
  }
}
</script>

<style scoped>
  #searchInfo{
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
    .showInfo1{
      /* border: 1px solid green; */
      position: absolute;
      width: 100%;
      height: 200px;
      font-size: 12px;
      /* text-align: center; */
      top: 40%;
    }
    .showInfo1 table{
      /* border: 1px solid red; */
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
      width: 300px;
    }
    .showInfo1 table td{
      border: 1px solid gray;
    }
    .showInfo2{
      /* border: 1px solid green; */
      position: absolute;
      width: 100%;
      height: 200px;
      font-size: 12px;
      /* text-align: center; */
      top: 40%;
    }
    .showInfo2 table{
      /* border: 1px solid red; */
      left: 50%;
      position: absolute;
      transform: translateX(-50%);
      width: 300px;
      border: 0;

    }
    .showInfo2 table td{
      border: 1px solid gray;
      
    }
</style>
