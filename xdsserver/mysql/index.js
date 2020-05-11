var mysql = require('mysql');
var config = require('../config/default.js');
var pool=mysql.createPool({
    host    : config.database.HOST,
    user    : config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let query = function( sql, values ) {
    return new Promise(( resolve, reject ) => {
      pool.getConnection(function(err, connection) {
        if (err) {
          reject( err )
        } else {
          connection.query(sql, values, ( err, rows) => {
            if ( err ) {
              reject( err )
            } else {
              resolve( rows )
            }
            connection.release()
          })
        }
      })
    })
}
//新生组增加报名信息
let insertFreshmanInfo = function(values){
  let _sql = `INSERT INTO freshman(ID,studentNum,studentClass,studentName,prefer,tele,majorDire) VALUES(?,?,?,?,?,?,?)`;
  return query(_sql,values);
}
//老生组增加报名信息
let insertOthersInfo = function(values){
  let _sql = `INSERT INTO others(ID,teamName,cNum,cClass,cName,cPrefer,cTele,cMajorDire,tm1Num,tm1Class,tm1Name,tm1Prefer,tm1Tele,tm1MajorDire,tm2Num,tm2Class,tm2Name,tm2Prefer,tm2Tele,tm2MajorDire) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  return query(_sql,values);
}
//根据ID查询新生组信息
let queryFreshmanInfoByID = function(ID){
  let _sql = `SELECT * FROM freshman WHERE ID = "${ID}";`;
  return query(_sql);
}

//根据ID查询老生组信息
let queryOthersInfoByID = function(ID){
  let _sql = `SELECT * FROM others WHERE ID = "${ID}";`;
  return query(_sql);
}


//根据学号查询学生信息,防止重复报名
let queryInfoByStuNum = function(studentNum){
  let _sql = `SELECT ID FROM freshman WHERE studentNum = "${studentNum}" 
               union
               SELECT ID FROM others WHERE cNum ="${studentNum}" OR tm1Num = "${studentNum}" OR tm2Num = "${studentNum}" 
              ;`;
  return query(_sql);
}
//根据手机号查询学生信息，防止手机号重复
let queryInfoByPhone = function(tele){
  let _sql = `SELECT ID FROM freshman WHERE tele = "${tele}" 
              union
              SELECT ID FROM others WHERE cTele ="${tele}" OR tm1Tele= "${tele}" OR tm2Tele="${tele}";`;
  return query(_sql);
}

//根据学号查询新生的报名信息
let queryFreshmanInfoALLByStuNum = function(studentNum){
  let _sql = `SELECT * FROM freshman WHERE studentNum = "${studentNum}";`;
  return query(_sql);
}
//根据手机号查询新生的报名信息
let queryFreshmanInfoALLByPhone = function(tele){
  let _sql = `SELECT * FROM freshman WHERE tele = "${tele}";`;
  return query(_sql);
}

//根据学号查询老生的报名信息
let queryothersInfoALLByStuNum = function(studentNum){
  let _sql = `SELECT * FROM others WHERE cNum = "${studentNum}";`;
  return query(_sql);
}
//根据手机号查询老生的报名信息
let queryothersInfoALLByPhone = function(tele){
  let _sql = `SELECT * FROM others WHERE cTele = "${tele}";`;
  return query(_sql);
}
//根据学号更新新生组选题信息
let updateFreshmanProByNum= function(values){
  let _sql = "UPDATE freshman SET selectedPro=? WHERE studentNum=?";
  return query(_sql,values);
}
//根据ID更新新生组选题信息
let updateFreshmanProByID = function(values){//values是一个数组，包含选题信息和MD5码
  let _sql = "UPDATE freshman SET selectedPro=? WHERE ID=?";
  return query(_sql,values);
}
//根据ID更新老生组选题信息
let updateOthersProByID = function(values){
  let _sql = "UPDATE others SET selectedPro=? WHERE ID=?";
  return query(_sql,values);
}
//根据ID更新新生组验收信息
let updateFreshmanCheckByID = function(values){
  let _sql =  "UPDATE freshman SET ischeck=? WHERE ID=?";
  return query(_sql,values);
}
//根据ID更新老生组验收信息
let updateOthersCheckByID = function(values){
  let _sql =  "UPDATE others SET ischeck=? WHERE ID=?";
  return query(_sql,values);
}
module.exports = {
  insertFreshmanInfo,
  insertOthersInfo,
  queryFreshmanInfoByID,
  queryOthersInfoByID,
  updateFreshmanProByID,
  updateFreshmanProByNum,
  updateOthersProByID,
  queryInfoByStuNum,
  queryInfoByPhone,
  queryFreshmanInfoALLByStuNum,
  queryFreshmanInfoALLByPhone,
  queryothersInfoALLByStuNum,
  queryothersInfoALLByPhone,
  updateFreshmanCheckByID,
  updateOthersCheckByID

}