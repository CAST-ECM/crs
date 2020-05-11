<template>
<div class="maincontent">
  <Menu mode="horizontal" theme="light" active-name="1">
    <div>
        <MenuItem name="1">
        <Icon type="ios-flag-outline" />
            多人组报名
        </MenuItem>
    </div>
  </Menu>
  <br>
  <component :is="flag" v-on:senddatatofather="showMsgFromChild" v-on:backback="getback" v-bind:stu_val="stuInfo"></component>

</div>

</template>

<script>
import captainInfo from '@/components/captainInfo'
import tm1Info from '@/components/tm1Info'
import tm2Info from '@/components/tm2Info'
export default {
  name: 'othersPage',
  components: {
    captainInfo,
    tm1Info,
    tm2Info
  },
  data () {
    return {
      flag:'captainInfo',
      stuInfo:{
        md5Code:'',
        teamName:'',//队伍名称
        cNum:'', //队长学号
        cClass:'',//队长班级号
        cName:'',//队长姓名
        cMajorDire:'',//队长专业
        cPrefer:'',//队长擅长方向
        cTele:'',//队长联系方式
        tm1Num:'',//队员一学号
        tm1Class:'',//队员一班级号
        tm1Name:'',//队员一姓名
        tm1MajorDire:'',//队员一专业
        tm1Prefer:'',//队员一擅长方向
        tm1Tele:'',//队员一手机号
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
   
      ]
    }
  },
  methods: {
    showMsgFromChild(data){
      // console.log(data);
      // console.log(data);
      if(data.flag == 'captainInfo'){
        this.stuInfo.teamName = data.teamName;
        this.stuInfo.cNum = data.cNum;
        this.stuInfo.cName = data.cName;
        this.stuInfo.cTele = data.cTele;
        this.stuInfo.cMajorDire = data.cMajorDire;
        this.stuInfo.cClass = data.cClass;
        this.stuInfo.cPrefer = data.cPrefer;
        this.flag = 'tm1Info';
      }
      if(data.flag == 'tm1Info'){
        this.stuInfo.tm1Num = data.tm1Num;
        this.stuInfo.tm1Name = data.tm1Name;
        this.stuInfo.tm1Class = data.tm1Class;
        this.stuInfo.tm1Prefer = data.tm1Prefer;
        this.stuInfo.tm1Tele = data.tm1Tele;
        this.stuInfo.tm1MajorDire = data.tm1MajorDire;
        this.flag = 'tm2Info';
      }
      if(data.flag == 'tm2Info'){
        this.stuInfo.tm2Num = data.tm2Num;
        this.stuInfo.tm2Name = data.tm2Name;
        this.stuInfo.tm2Class = data.tm2Class;
        this.stuInfo.tm2Prefer = data.tm2Prefer;
        this.stuInfo.tm2Tele = data.tm2Tele;
        this.stuInfo.tm2MajorDire = data.tm2MajorDire;
        this.checkData();
      }
    },
    checkData(){
      if(this.stuInfo.cNum == this.stuInfo.tm1Num || this.stuInfo.cNum == this.stuInfo.tm2Num || this.stuInfo.tm1Num == this.stuInfo.tm2Num || this.stuInfo.cTele == this.stuInfo.tm1Tele || this.stuInfo.cTele == this.stuInfo.tm2Tele || this.stuInfo.tm1Tele == this.stuInfo.tm2Tele)
      {
        this.$Message.error('学号或手机号有重复!请检查!');
      }else if(!this.stuInfo.tm2Num || !this.stuInfo.tm2Name || !this.stuInfo.tm2Class  || !this.stuInfo.tm2Prefer || !this.stuInfo.tm2Tele  || !this.stuInfo.tm2MajorDire){
        // console.log(this.stuInfo);
        if(!!this.stuInfo.tm2Num|| !!this.stuInfo.tm2Name  || !!this.stuInfo.tm2Class  || !!this.stuInfo.tm2Prefer  || !!this.stuInfo.tm2Tele  || !!this.stuInfo.tm2MajorDire){
          this.$Message.error('队员二信息不全，请检查！');
        }else{
          this.sendData();
        }
      }else{
        this.sendData();
      }
    },
    sendData(){
      this.stuInfo.md5Code = this.$md5(this.stuInfo.teamName+this.stuInfo.cNum+this.stuInfo.cName+this.stuInfo.cClass+this.stuInfo.cMajorDire
      +this.stuInfo.cPrefer+this.stuInfo.cTele+this.stuInfo.tm1Num+this.stuInfo.tm1Name+this.stuInfo.tm1Class+this.stuInfo.tm1MajorDire
      +this.stuInfo.tm1Prefer+this.stuInfo.tm1Tele+this.stuInfo.tm2Num+this.stuInfo.tm2Name+this.stuInfo.tm2Class+this.stuInfo.tm2MajorDire
      +this.stuInfo.tm2Prefer+this.stuInfo.tm2Tele+'jkispretty');
      console.log(this.stuInfo.md5Code);
      if(!this.stuInfo.tm2Name&&!this.stuInfo.tm2Num&&!this.stuInfo.tm2Class&& !this.stuInfo.tm2Prefer && !this.stuInfo.tm2Tele && !this.stuInfo.tm2MajorDire){
        this.stuInfo.tm2Name = '默认值'+this.stuInfo.cName;
        this.stuInfo.tm2Num  = '默认值'+this.stuInfo.cNum;
        this.stuInfo.tm2Class = '默认值'+this.stuInfo.cClass;
        this.stuInfo.tm2Prefer = '默认值'+this.stuInfo.cPrefer;
        this.stuInfo.tm2Tele = '默认值'+this.stuInfo.cTele;
        this.stuInfo.tm2MajorDire = '默认值'+this.stuInfo.cMajorDire;
      }
      this.$axios.post(`${this.$url}/others`,{
        teamName:this.stuInfo.teamName+'',
        md5Code:this.stuInfo.md5Code+'',
        cNum:this.stuInfo.cNum+'',
        cName:this.stuInfo.cName+'',
        cPrefer:this.stuInfo.cPrefer+'',
        cTele:this.stuInfo.cTele+'',
        cMajorDire:this.stuInfo.cMajorDire+'',
        cClass:this.stuInfo.cClass+'',
        tm1Num:this.stuInfo.tm1Num+'',
        tm1Name:this.stuInfo.tm1Name+'',
        tm1Prefer:this.stuInfo.tm1Prefer+'',
        tm1Class:this.stuInfo.tm1Class+'',
        tm1Tele:this.stuInfo.tm1Tele+'',
        tm1MajorDire:this.stuInfo.tm1MajorDire+'',
        tm2Num:this.stuInfo.tm2Num+'',
        tm2Name:this.stuInfo.tm2Name+'',
        tm2Prefer:this.stuInfo.tm2Prefer+'',
        tm2Class:this.stuInfo.tm2Class+'',
        tm2Tele:this.stuInfo.tm2Tele+'',
        tm2MajorDire:this.stuInfo.tm2MajorDire+'',
      }).then((response)=>{
        var result = response.data;
        console.log(result);
        switch(result.status_code){
          case 200:
            this.$Modal.success({
                title:'报名成功!',
                content: `你们队伍的MD5码为:${this.stuInfo.md5Code},请妥善保管MD5码以方便后续信息修改和选题!`
            });
            break;
          case 566:
            this.$Message.error('数据校验不通过!');
            break;
          case 567:
            this.$Message.error('部分队友学号已被报名');
            break;
          case 568:
            this.$Message.error('部分队友手机号已被报名');
            break;
          case 500:
            this.$Message.error('服务器内部故障!');
            break;
        }
      }).catch((err)=>{
          console.log(err);
          this.$Message.error('提交失败！');
      });
    },
    getback(data){
      // console.log(data);
      if(data.comname == "tm1Info"){
        this.flag = "captainInfo";
      }
      if(data.comname == "tm2Info"){
        this.flag = "tm1Info";
      }
    }
  },
  
  created () {
    
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

</style>