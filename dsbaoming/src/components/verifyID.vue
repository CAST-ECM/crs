<template>
    <div class="verifyID">
        <Form ref="verifyid" :model="verifyid" :rules="rulesList" label-position="top" class="inputID">
            <FormItem label="MD5码:" class="inputbox" prop="ID">
                <Input placeholder="请输入MD5码" v-model="verifyid.ID" class="idinput" size="large"/>
            </FormItem>
        </Form>
        <br>
        <div class="bottomFooter" v-show="hidshow">
                <Button-group class="btnGroup" type="primary">
                    <i-button type="primary"  v-on:click="backtoIndex" size="large">
                        <Icon type="ios-arrow-back" />
                        返回
                    </i-button>
                    <i-button type="primary" v-on:click="sendIDAndJump" size="large">
                        提交
                        <Icon type="ios-arrow-forward" />
                    </i-button>
                </Button-group>
        </div>
    </div>
</template>
        
<script>
    export default {
          name: 'verifyID',
          data () {
            return {
                verifyid:{
                  ID:''
                },
                rulesList:{
                  ID:[
                      {
                        required: true,
                        message: 'MD5码不可以为空!',
                        trigger: 'blur'
                      }

                  ]
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
            sendIDAndJump(){
                this.$refs['verifyid'].validate((val)=>{
                    if(val){
                        this.$axios.post(`${this.$url}/identify`,{
                            ID:this.verifyid.ID+''
                        }).then((response)=>{
                            if(response.data!==666){
                                this.$Message.success({
                                    content: 'MD5码验证通过!',
                                    duration: 2
                                });
                                setTimeout(()=>{
                                    // console.log(response.data[0]);
                                    if(!response.data[0].teamName){
                                        // console.log('是新生组');
                                        this.$emit('senddatatofather',{
                                            componentflag:'freshmanpro',
                                            ID:response.data[0].ID    
                                        })
                                        
                                    }else{
                                        this.$emit('senddatatofather',{
                                            componentflag:'otherspro',
                                            ID:response.data[0].ID    
                                        })
                                    }
                                },500)
                                
                            }else{
                                this.$Message.info('MD5码输入有误!');
                            }
                        }).catch((err)=>{
                            console.log(err);
                            
                            this.$Message.error('提交失败！');
                        });
                    }else{
                        this.$Message.error('MD5码不可以为空!');
                    }
                });
            }
          },
          mounted(){  
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
    .inputbox{
        /* background: green; */
        position: absolute;
        left: 50%;
        top: 30%;
        transform: translateX(-50%);
        /* margin-top: 50%; */
        font-size: 30px;
        width: 300px;
        
    }
    .idinput{
        width: 100%;
    }
    .bottomFooter{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 10%;
        position: fixed;
    }
</style>