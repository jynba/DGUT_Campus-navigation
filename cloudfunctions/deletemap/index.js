// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database()
const locations=db.collection("location")
// 云函数入口函数
exports.main = async (event, context) => {
  try{
    const {OPENID} = cloud.getWXContext();
    return await locations.where({
      _openid:OPENID
    }).remove();
  }catch(err){
    console.log(err)
    return err
  }
}