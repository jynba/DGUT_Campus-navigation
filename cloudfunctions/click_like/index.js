// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const lights = db.collection("lights")
const _ = db.command
//引入数据库操作方法
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    const {OPENID} = cloud.getWXContext();
    //判断传递过来的数据类型，然后使用eval()进行字符串转对象
    if (typeof event.data == 'string') {
      event.data = eval('(' + event.data + ')'),
      event.data2 = eval('(' + event.data2 + ')')
    }
    //使用await延迟调用数据库方法，利用collection和doc前端传递过来的变量，完成数据查找更新
    return await lights.doc(event.doc).update({
      data: {
        //扩展运算符，进行浅拷贝
        ...event.data,//like_nums : _.inc(-1)
        ...event.data2
      },
    })
  } catch (e) {
    console.error(e)
  }
}