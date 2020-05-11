const Koa = require('koa');
const fs = require('fs');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();
const config = require('./config//default');
const userModel = require('./mysql');
app.use(bodyParser());
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200; 
    } else {
        await next();
    }
});
let rules = {//校验规则对象
    'stuName':/^[\u4e00-\u9fa5]{1,}$/,
    'stuGender':/^[\u4e00-\u9fa5]{0,}$/,
    'stuID':/^[B|Q|H]{1}1[4-9]\d{6}$/,
    'stuMajor':/^[\u4e00-\u9fa5]{1,}$/,
    'stuPhone':/^1[3-9]\d{9}$/,
    'stuEmail':/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    'stuDire':/^[\u4e00-\u9fa5]{1,}$/,
    'others':/^[\n\w\u4e00-\u9fa5]*$/
};
function checkData(values){
    var result = true;
    for(i=0;i<values.length-1;i++){
        if(!values[i]){
            result = false;
            return result;
        }
    }
    if(!rules['stuName'].test(values[0])){
        result = false;
        return result;
    }
    if(!rules['stuGender'].test(values[1])){
        result = false;
        return result;
    }
    if(!rules['stuID'].test(values[2])){
        result = false;
        return result;
    }
    if(!rules['stuMajor'].test(values[3])){
        result = false;
        return result;
    }
    if(!rules['stuPhone'].test(values[4])){
        result = false;
        return result;
    }
    if(!rules['stuEmail'].test(values[5])){
        result = false;
        return result;
    }
    if(!rules['stuDire'].test(values[6])){
        result = false;
        return result;
    }
    if(!values[7]){
        result = true;
        return result;
    }else{
        if(!rules['others'].test(values[7])){
            result = false;
            return result;
        }
    }
    
    return result;
}

//报名信息插入
router.post('/xdslogin',async ctx=>{
    let stuName = ctx.request.body.stuName;
    let stuGender = ctx.request.body.stuGender;
    let stuID = ctx.request.body.stuID;
    let stuMajor = ctx.request.body.stuMajor;
    let stuPhone = ctx.request.body.stuPhone;
    let stuEmail = ctx.request.body.stuEmail;
    let stuDire = ctx.request.body.stuDire;
    let others = ctx.request.body.others;
    let values = [stuName,stuGender,stuID,stuMajor,stuPhone,stuEmail,stuDire,others];
    let result = checkData(values);
    //先做数据安全性检测
    if(!result){
        //数据校验不通过
        ctx.response.body = {
            'status_code':566,
            'err_message':'数据校验不通过!'
        };
    }else{
        let find1Promise = userModel.queryInfoByStuID(stuID);
        let find2Promise = userModel.queryInfoByStuPhone(stuPhone);
        try {
            //根据学号和手机号查重
            let result1 = await find1Promise;
            let result2 = await find2Promise;
            if(result1.length !== 0){
                ctx.response.body ={
                    'status_code':567,
                    'err_message':'该学号已被报名!'
                }
            }
            if(result2.length !== 0){
                ctx.response.body ={
                    'status_code':568,
                    'err_message':'该手机号已被报名!'
                }
            }
            //查重通过
            if(result1.length ==0 && result2.length == 0){
                try {
                    await userModel.insertStuInfo(values);
                    
                    ctx.response.body = {
                        'status_code':200,
                        'success_message':'信息提交成功!'
                    }
                   
                    
                } catch (error) {
                    ctx.response.body = {
                        'status_code':500,
                        'err_message':error
                    }
                }
            }
        } catch (error) {
            ctx.response.body = {
                'status_code':500,
                'err_message':error
            }
        }
    }
    
});


//启动路由
app.use(router.routes()).use(router.allowedMethods());
// 以上为官方推荐方式，allowedMethods用在routes之后，作用是根据ctx.status设置response header
app.listen(config.port,(err)=>{
    if (err) throw err;
    console.log(`listening on port ${config.port}`);
})