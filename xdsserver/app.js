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
    'ID':/([a-f\d]{32}|[A-F\d]{32})/,
    'stuNum':/^[B|Q|H]{1}1[4-9]\d{6}$/,
    'stuClass':/^[B|Q|H]{1}1[4-9]\d{4}$/,
    'stuName':/^[\u4e00-\u9fa5]{1,}$/,
    'stuPrefer':/^[\u4e00-\u9fa5]{1,}$/,
    'stuTele':/^1[3-9]\d{9}$/,
    'stuMajor':/^[\u4e00-\u9fa5]{1,}$/,
    'freshmanproblem':/^[A|B|C|D|E|F|G|H]{1}/,
    'othersproblem':/^[A|B|C|D]{1}/
};
function checkFreshmanData(values){
    var result = false;
    //非空检测
    for(i=0;i<values.length-1;i++){
        if(!values[i]){
            return result;
        }
    }
    //规则检测
    if(!rules['ID'].test(values[0])){
        return result;
    }
    if(!rules['stuNum'].test(values[1])){
        return result;
    }
    if(!rules['stuClass'].test(values[2])){
        return result;
    }
    if(!rules['stuName'].test(values[3])){
        return result;
    }
    if(!rules['stuPrefer'].test(values[4])){
        return result;
    }
    if(!rules['stuTele'].test(values[5])){
        return result;
    }
    if(!rules['stuMajor'].test(values[6])){
        return result;
    }
    return (result=true);
}

//新生组报名
router.post('/freshman',async ctx=>{
    let studentNum = ctx.request.body.studentNum;
    let studentName = ctx.request.body.studentName;
    let studentClass = ctx.request.body.studentClass;
    let majorDire = ctx.request.body.majorDire;
    let tele = ctx.request.body.tele;
    let prefer = ctx.request.body.prefer;
    let ID = ctx.request.body.md5Code;
    let values = [ID,studentNum,studentClass,studentName,prefer,tele,majorDire];
    //先做数据安全性检测
    let result = checkFreshmanData(values);
    
    if(!result){
        //数据校验不通过
        ctx.response.body = {
            'status_code':566,
            'err_message':'数据校验不通过!'
        };
    }else{
        //查重
        let find1Promise = userModel.queryInfoByStuNum(studentNum);
        let find2Promise = userModel.queryInfoByPhone(tele);
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
                    await userModel.insertFreshmanInfo(values);
                    
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
function checkOthersData(values){
    var result = false;
    //非空检测
    for(i=0;i<values.length-1;i++){
        if(!values[i]){
            return result;
        }
    }
    //规则检测
    if(!rules['ID'].test(values[0])){
        return result;
    }
    if(!rules['stuNum'].test(values[2]) || !rules['stuNum'].test(values[8]) || !rules['stuNum'].test(values[14])){
        return result;
    }
    if(!rules['stuClass'].test(values[3]) || !rules['stuClass'].test(values[9]) || !rules['stuClass'].test(values[15])){
        return result;
    }
    if(!rules['stuName'].test(values[4]) || !rules['stuName'].test(values[10]) || !rules['stuName'].test(values[16])){
        return result;
    }
    if(!rules['stuPrefer'].test(values[5]) || !rules['stuPrefer'].test(values[11]) || !rules['stuPrefer'].test(values[17])){
        return result;
    }
    if(!rules['stuTele'].test(values[6]) || !rules['stuTele'].test(values[12]) || !rules['stuTele'].test(values[18])){
        return result;
    }
    if(!rules['stuMajor'].test(values[7]) || !rules['stuMajor'].test(values[13]) || !rules['stuMajor'].test(values[19])){
        return result;
    }
    return (result=true);
}
//老生组报名
router.post('/others',async ctx=>{
    let ctxbody = ctx.request.body;
    let ID = ctxbody.md5Code;
    let teamName = ctxbody.teamName;
    let cNum = ctxbody.cNum;
    let cClass = ctxbody.cClass;
    let cName = ctxbody.cName;
    let cPrefer = ctxbody.cPrefer;
    let cTele = ctxbody.cTele;
    let cMajorDire = ctxbody.cMajorDire;
    let tm1Num =ctxbody.tm1Num;
    let tm1Class = ctxbody.tm1Class;
    let tm1Name = ctxbody.tm1Name;
    let tm1Prefer = ctxbody.tm1Prefer;
    let tm1Tele = ctxbody.tm1Tele;
    let tm1MajorDire =ctxbody.tm1MajorDire;
    let tm2Num = ctxbody.tm2Num;
    let tm2Class = ctxbody.tm2Class;
    let tm2Name = ctxbody.tm2Name;
    let tm2Prefer = ctxbody.tm2Prefer;
    let tm2Tele = ctxbody.tm2Tele;
    let tm2MajorDire = ctxbody.tm2MajorDire;
    let values = [ID,teamName,cNum,cClass,cName,cPrefer,cTele,cMajorDire,
                    tm1Num,tm1Class,tm1Name,tm1Prefer,tm1Tele,tm1MajorDire,
                    tm2Num,tm2Class,tm2Name,tm2Prefer,tm2Tele,tm2MajorDire];
    let result = checkOthersData(values);
    if(!result || /[@#\$%\^&\*]+/gi.test(values[1])){
        //数据校验不通过
        ctx.response.body = {
            'status_code':566,
            'err_message':'数据校验不通过!'
        };
    }else{
        //查重
        let find1Promise = userModel.queryInfoByStuNum(cNum);
        let find2Promise = userModel.queryInfoByStuNum(tm1Num);
        let find3Promise = userModel.queryInfoByStuNum(tm2Num);
        let find4Promise = userModel.queryInfoByPhone(cTele);
        let find5Promise = userModel.queryInfoByPhone(tm1Tele);
        let find6Promise = userModel.queryInfoByPhone(tm2Tele);
        try {
            let result1 = await find1Promise;
            let result2 = await find2Promise;
            let result3 = await find3Promise;
            let result4 = await find4Promise;
            let result5 = await find5Promise;
            let result6 = await find6Promise;
            if(result1.length !== 0 || result2.length !== 0 || result3.length !== 0){
                ctx.response.body ={
                    'status_code':567,
                    'err_message':'该学号已被报名!'
                }
            }
             if(result4.length !== 0 || result5.length !== 0 || result6.length !== 0){
                ctx.response.body ={
                    'status_code':568,
                    'err_message':'该手机号已被报名!'
                }
            }
            try {
                    await userModel.insertOthersInfo(values);
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
        } catch (error) {
            ctx.response.body = {
                'status_code':500,
                'err_message':error
            }
        }
    }
});

//根据手机号查询报名信息
router.post('/queryinfobyphone',async ctx=>{
    var tele = ctx.request.body.Tele;
    if(!rules['stuTele'].test(tele)){
        ctx.response.body = {
            'status_code':566,
            'err_message':'数据校验不通过!'
        };
    }else{
        let find1Promise = userModel.queryFreshmanInfoALLByPhone(tele);
        let find2Promise = userModel.queryothersInfoALLByPhone(tele);
        try {
            let result1 = await find1Promise;
            let result2 = await find2Promise;
            if(result1.length !== 0){
                ctx.response.body ={
                    'status_code':200,
                    'data':result1
                }
            }else if(result2.length !== 0){
                ctx.response.body={
                    'status_code':200,
                    'data':result2
                }
            }else{
                ctx.response.body = {
                    'status_code':404,
                    'data':'404'
                }
            }
        } catch (error) {
            ctx.response.body = {
                'error':error.toString(),
                'status_code':500,
                'err_message':'服务器内部故障!'
            };
        }
    }
    
})

//认证码检测
router.post('/identify',async ctx=>{
    var ID = ctx.request.body.ID;
    if(!rules['ID'].test(ID)){
        ctx.response.body = {
            'status_code':566,
            'err_message':'数据校验不通过!'
        };
    }else{
        let find1Promise = userModel.queryFreshmanInfoByID(ID);
        let find2Promise = userModel.queryOthersInfoByID(ID);
        try {
            let result1 = await find1Promise;
            let result2 = await find2Promise;
            if(result1.length !== 0){
                ctx.response.body = {
                    'status_code':200,
                    'data':result1
                }
            }else if(result2.length !== 0){
                ctx.response.body ={
                    'status_code':200,
                    'data':result2
                }
            }else{
                ctx.response.body ={
                    'status_code':404,
                    'data':404
                }
            }
        } catch (error) {
            ctx.response.body = {
                'error':error.toString(),
                'status_code':500,
                'err_message':'服务器内部故障!'
            };
        }
    }
})

//单人组比赛选题
router.post('/freshmanpro',async ctx=>{
    let ID = ctx.request.body.ID;
    let problem = ctx.request.body.problem;
    if(!rules['ID'].test(ID) || !rules['freshmanproblem'].test(problem)){
        ctx.response.body = {
            'status_code':566,
            'err_message':'数据校验不通过!'
        };
    }else{
        values = [problem,ID];
        try {
            await userModel.updateFreshmanProByID(values);
            ctx.response.body = {
                'status_code':200,
                'data':true
            };
        } catch (error) {
            ctx.response.body = {
                'status_code':500,
                'err_message':'服务器内部故障!'
            };
        }
    }
})
//多人组比赛选题
router.post('/otherspro',async ctx=>{
    let ID = ctx.request.body.ID;
    let problem = ctx.request.body.problem;
    if(!rules['ID'].test(ID) || !rules['othersproblem'].test(problem)){
        ctx.response.body = {
            'status_code':566,
            'err_message':'数据校验不通过!'
        };
    }else{
        values = [problem,ID];
        try {
            await userModel.updateOthersProByID(values);
            ctx.response.body ={
                'status_code':200,
                'data':true
            }
        } catch (error) {
            ctx.response.body = {
                'status_code':500,
                'err_message':'服务器内部故障!'
            };
        }
    }
})

//赛题申请验收
router.post('/queryinfobyphone',async ctx=>{
    let tele  = ctx.request.body.Tele;
    if(!rules['stuTele'].test(tele)){
        ctx.response.body = {
            'status_code':566,
            'err_message':'数据校验不通过!'
        };
    }else{
        let find1Promise = userModel.queryFreshmanInfoALLByPhone(tele);
        let find2Promise = userModel.queryothersInfoALLByPhone(tele);
        try {
            let result1 = await find1Promise;
            let result2 = await find2Promise;
            if(result1.length !== 0){
                ctx.response.body = {
                    'status_code':200,
                    'data':result1
                };
            }else if(result2.length !== 0){
                ctx.response.body = {
                    'status_code':200,
                    'data':result2
                };
            }else{
                ctx.response.body = {
                    'status_code':404,
                    'data':404
                };
            }
        } catch (error) {
            ctx.response.body = {
                'status_code':500,
                'err_message':'服务器内部故障!'
            };
        }
    }
})
//单人组申请验收
router.post('/freshmanExam',async ctx=>{
    let ID = ctx.request.body.MD5Code;
    let check = ctx.request.body.isToBeChecked;
    if(!rules['ID'].test(ID) || typeof(check) !== 'boolean'){
        ctx.response.body = {
            'status_code':566,
            'err_message':'数据校验不通过!'
        };
    }else{
        //先看下认证码是否存在
        let find1Promise = userModel.queryFreshmanInfoByID(ID);
        try {
            let result1 = await find1Promise;
            if(result1.length !== 0){
                try {
                    if(check){
                        var values = ['是',ID];
                    }else{
                        var values = ['否',ID];
                    }
                    await userModel.updateFreshmanCheckByID(values);
                    ctx.response.body = {
                        'status_code':200,
                        'err_message':'成功!'
                        
                    };
                } catch (error) {
                    ctx.response.body = {
                        'status_code':500,
                        'err_message':'服务器内部故障!',
                        'error':error.toString()
                    };
                }
            }else{
                ctx.response.body = {
                    'status_code':404,
                    'err_message':'认证码校验失败!'
                };
            }
        } catch (error) {
            ctx.response.body = {
                'status_code':500,
                'err_message':'服务器内部故障!',
                'error':error.toString()
            };
        }
    }
})
//多人组申请验收
router.post('/othersExam',async ctx=>{
    let ID = ctx.request.body.MD5Code;
    let check = ctx.request.body.isToBeChecked;
    if(!rules['ID'].test(ID) || typeof(check) !== 'boolean'){
        ctx.response.body = {
            'status_code':566,
            'err_message':'数据校验不通过!'
        };
    }else{
        //先看下认证码是否存在
        let find1Promise = userModel.queryOthersInfoByID(ID);
        try {
            let result1 = await find1Promise;
            if(result1.length !== 0){
                try {
                    if(check){
                        var values = ['是',ID];
                    }else{
                        var values = ['否',ID];
                    }
                    await userModel.updateOthersCheckByID(values);
                    ctx.response.body = {
                        'status_code':200,
                        'err_message':'成功!'
                    };
                } catch (error) {
                    ctx.response.body = {
                        'status_code':500,
                        'err_message':'服务器内部故障!'
                    };
                }
            }else{
                ctx.response.body = {
                    'status_code':404,
                    'err_message':'认证码校验失败!'
                };
            }
        } catch (error) {
            ctx.response.body = {
                'status_code':500,
                'err_message':'服务器内部故障!'
            };
        }
    }
})
//启动路由
app.use(router.routes()).use(router.allowedMethods());
// 以上为官方推荐方式，allowedMethods用在routes之后，作用是根据ctx.status设置response header
app.listen(config.port,(err)=>{
    if (err) throw err;
    console.log(`listening on port ${config.port}`);
})