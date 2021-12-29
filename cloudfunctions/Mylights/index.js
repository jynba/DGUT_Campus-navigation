// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
const lights=db.collection("lights")
// 云函数入口函数
exports.main = async (event, context) => {
  try{
    const {OPENID} = cloud.getWXContext();
    return await lights.where({
      _openid:OPENID
    }).get();
  }catch(err){
    console.log(err)
    return err
  }
}