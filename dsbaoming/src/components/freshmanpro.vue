<template>
    <div class="freshmanpro">
        <Form ref="freshmanpro" :model="freshmanpro" :rules="rulesList" label-position="left">
                <FormItem label="MD5码:"  prop="ID" >
                    <Input v-model="ID"  size="large" style="width:300px;" disabled/>
                </FormItem>
                <FormItem label="赛题:" prop="choosedpro">          
                <!-- <Select v-model="freshmanpro.choosedpro" style="width:300px;" placeholder="请选择赛题" size="large" transfer="true">
                <Option v-for="item in  problemLists" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select> -->
                <el-select v-model="freshmanpro.choosedpro" placeholder="请选择赛题">
                <el-option
                    v-for="item in problemLists"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                     {{ item.label }}
                </el-option>
                   
                </el-select>
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
    name: 'freshmanpro',
    props:['ID'],
    data(){
        return {
            freshmanpro:{
                choosedpro:'',
                ID:'',
            },
            problemLists:[
                {
                    value: 'A',
                    label: '其他组A题'
                },
                {
                    value: 'B',
                    label: '其他组B题'
                },
                {
                    value: 'C',
                    label: '其他组C题'
                },
                {
                    value: 'D',
                    label: '其他组D题'
                },
                {
                    value: 'E',
                    label: '新生组E题'
                },
                {
                    value: 'F',
                    label: '新生组F题'
                },
                {
                    value: 'G',
                    label: '新生组G题'
                },
                {
                    value: 'H',
                    label: '新生组H题'
                },
            ],
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
              docmHeight:document.documentElement.clientHeight,
              showHeight:'0',//实时屏幕高度
              hidshow:true, //显示或隐藏footer
              isResize:false, //默认屏幕高度是否已获取
        }
    },
    methods:{
        sendpro(){
            this.$refs['freshmanpro'].validate((val)=>{
                    if(val){
                        this.$axios.post(`${this.$url}/freshmanpro`,{
                            ID:this.freshmanpro.ID+'',
                            problem:this.freshmanpro.choosedpro
                        }).then((response)=>{
                            if(response.data.status_code == 500){
                                this.$Message.error('服务器内部故障!');
                            }else if(response.data.status_code == 566){
                                this.$Message.error('数据校验不通过!');
                            }else{
                                this.$Message.success('提交成功!');
                                setTimeout(()=>{
                                   this.$router.push({
                                       path:'/'
                                   }) 
                                },1000)
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
        this.freshmanpro.ID = this.ID;
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
        left: 50%;
        transform: translateX(-50%);
        bottom: 10%;
        position: fixed;
    }
</style>
      