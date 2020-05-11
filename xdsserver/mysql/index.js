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




//根据ID更新新生组选题信息
let updateFreshmanPro = function(values){//values是一个数组，包含选题信息和MD5码
  let _sql = "UPDATE freshman SET selectedPro=? WHERE ID=?"
  return query(_sql,values);
}

//基本查询函数，查询字段为学号
let queryInfoByStuID = function(stuID){
  let _sql = `SELECT stuID FROM stuinfo WHERE stuID="${stuID}";`
  return query(_sql);
}
//基本查询函数，查询字段为手机号
let queryInfoByStuPhone = function(stuPhone){
  let _sql = `SELECT stuPhone FROM stuinfo WHERE stuPhone="${stuPhone}";`
  return query(_sql);
}
//插入学生信息
let insertStuInfo = function(values){
  let _sql = `INSERT INTO stuinfo(stuName,stuGender,stuID,stuMajor,stuPhone,stuEmail,stuDire,others) VALUES(?,?,?,?,?,?,?,?)`;
  return query(_sql,values);
}
module.exports = {
    query,
    queryInfoByStuID,
    queryInfoByStuPhone,
    insertStuInfo

}