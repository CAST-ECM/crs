<template>
    <div class="otherspro">
        <Form ref="otherspro" :model="otherspro" :rules="rulesList" label-position="left">
            <FormItem label="MD5码:"  prop="ID" >
                    <Input v-model="ID"  size="large" style="width:300px;" disabled/>
            </FormItem>
            <FormItem label="赛题:" prop="choosedpro">          
                <Select v-model="otherspro.choosedpro" clearable style="width:200px;" placeholder="请选择赛题" size="large">
                <Option v-for="item in  problemLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
        </Form>
        <br>
        <div class="bottomFooter" v-show="hidshow">
                <Button size="large" type="primary" v-on:click="sendpro">提交赛题</Button>
        </div>
    </div>
   
</template>
<script>


export default {
    name: 'otherspro',
    props:['ID'],
    data(){
        return {
            otherspro:{
                choosedpro:'',
                ID:'',
            },
            problemLists:[
                {
                    value: 'A',
                    label: 'A'
                },
                {
                    value: 'B',
                    label: 'B'
                },
                {
                    value: 'C',
                    label: 'C'
                },
                {
                    value: 'D',
                    label: 'D'
                },
            ],
            docmHeight:document.documentElement.clientHeight,
            showHeight:'0',//实时屏幕高度
            hidshow:true, //显示或隐藏footer
            isResize:false, //默认屏幕高度是否已获取
            rulesList:{
                choosedpro:[
                    {
                        required:true,
                        message:'赛题不可以为空!',
                        trigger:'blur'
                    }
                ],
                ID:[
                    {
                        required:true,
                        message:'MD5码不可以为空!',
                        trigger:'blur'
                    }
                ]
              },
        }
    },
    methods:{
        sendpro(){
            this.$refs['otherspro'].validate((val)=>{
                    if(val){
                        this.$axios.post(`${this.$url}/otherspro`,{
                            ID:this.otherspro.ID+'',
                            problem:this.otherspro.choosedpro
                        }).then((response)=>{
                            if(response.data==true){
                                this.$Message.success('提交成功!');
                                setTimeout(()=>{
                                   this.$router.push({
                                       path:'/'
                                   }) 
                                },1000)
                            }else{
                                this.$Message.error('提交失败!服务器出错!');
                            }
                        }).catch((err)=>{
                            console.log(err);
                            this.$Message.error('提交失败！');
                        })
                    }else{
                        this.$Message.error('选题信息不可以为空!');
                    }
                });
        }
    },
    mounted(){
        this.otherspro.ID = this.ID;
        window.onresize = ()=>{
            return (()=>{
                // 实时屏幕高度                       
                this.showHeight = document.body.clientHeight                 
            })()
        }
    },
    watch:{
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
        left: 50%;
        transform: translateX(-50%);
        bottom: 10%;
        position: fixed;
    }
</style>
      