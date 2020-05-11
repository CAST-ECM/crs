<template>
<div class="maincontent">
  <div class="title">
    <span>比</span>
    <span>赛</span>
    <span>报</span>
    <span>名</span>
    <span>系</span>
    <span>统</span>
  </div>
  <div class="select1">
    <Button type="primary" ghost v-on:click="toFreshmanPage" style="width:100px;" size="large">单人组报名</Button>
  </div>
  <div class="select2">
      <Button type="primary" ghost v-on:click="toOthersPage" style="width:100px;" size="large">多人组报名</Button>
  </div>
  <div class="select3">
      <Button type="primary" ghost v-on:click="tosearchInfo" style="width:100px;" size="large">信息查询</Button>
  </div>
  <div class="select4">
      <Button type="primary" ghost v-on:click="toselectProblems" style="width:100px;" size="large">比赛选题</Button>
  </div>
  <div class="select5">
      <Button type="primary" ghost v-on:click="toCheck" style="width:100px;" size="large">申请验收</Button>
  </div>
  <footer>
      
  </footer>
</div>
 
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: '这里是首页',
      id1: 1,
      id2: 2,
    }
  },
  methods:{
    toFreshmanPage(){
      this.$router.push({
        path:'/FreshmanPage',
      })
      //this.$Message.error('报名时间已经截止!');
    },
    toOthersPage(){
      this.$router.push({
        path:'/othersPage',
      })
     // this.$Message.error('报名时间已经截止!');
    },
    toselectProblems(){
     this.$router.push({
       path:'/choosepro'
     })
      //this.$Message.error('选题系统已经关闭!');
    },
    tosearchInfo(){
      this.$router.push({
       path:'/searchInfo'
     })
    },
    toCheck(){
      // this.$Message.error('抱歉!暂未开放进度反馈系统');
      this.$router.push({
        path:'/yanshou'
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title{
    display: inline-block;
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-family: '微软雅黑',Arial, Helvetica, sans-serif;
    position:absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 10%;
  }
  .title span{
    font-size: 40px;
    color: #fff;
    filter: blur(0.8px);
    letter-spacing: 0.3em;
    text-shadow: 0 0 10px #1e90ff,
      0 0 20px #1e90ff,
      0 0 30px #1e90ff,
      0 0 40px #1e90ff,
      0 0 100px #1e90ff,
      0 0 200px #1e90ff;
    opacity: 1;
  }
  .select1{
    width: 150px;
    text-align: center;
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 25%;
    overflow: hidden;
  }
  .select2{
    width: 150px;
    text-align: center;
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 35%;
    overflow: hidden;
  }
  .select3{
    width: 150px;
    text-align: center;
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 45%;
    overflow: hidden;
  }
  .select4{
    width: 150px;
    text-align: center;
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 55%;
    overflow: hidden;
  }
  .select5{
    width: 150px;
    text-align: center;
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 65%;
    overflow: hidden;
  }  
  footer{
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
    font-size: 10px;

  }
</style>