// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Imglist:[
      "https://mmbiz.qpic.cn/mmbiz_png/ymce5HAJXsrAqcgjc2PiaVgKdpvkGVcUDBtpulCvlfej9twl7B3U2M9p1GLUtnTgMicbQHSOMGcN2V5DXe8GggNg/0?wx_fmt=png",
      "/image/yy.jpg"
    ],
    art:{}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options.id)

     if(options.id=='1'){
      that.setData({
        art:{
          title:"网安学院召开期中教学工作师生座谈会",
          image:"https://css.dgut.edu.cn/word/1637290396337/word/media/image1.jpeg",
          body:"11月15日上午，我院召开期中教学师生座谈会。座谈会由学院教学副院长罗达主持，各专业班级的班委代表参加会议。软件工程系主任刘文果、软件工程系副主任张福勇、网络工程系主任周坤晓、网络空间安全系副主任李新出席会议。",
          id:"1"
        }
      })
     }
     if(options.id==2){
      that.setData({
        art: {
          title:"活力机关：机关第七届三人篮球赛圆满落幕",
          image:"https://www.dgut.edu.cn/__local/4/61/11/3BDCB54B318FE9BB0AA514FE109_37DE0E19_1C332.jpg",
          body:"11月18日，机关党委、机关分工会主办的机关第七届三人篮球赛圆满落幕。经过激烈角逐，男子组尖刀队夺得本次比赛冠军、双工联队亚军、高建尖兵队季军；女子和中层以上干部组定点投篮尖刀队、双工联队并列夺得冠军。比赛受到了学校领导及广大机关教职员工欢迎。学校党委书记成洪波作为高建尖兵队队员参加了三个场次比赛，并在决赛后向冠军队颁奖。",
          id:"2"
        }
      })
     }
     else{
      that.setData({
        art:{
          title:"网安学院召开期中教学工作师生座谈会",
          image:"https://css.dgut.edu.cn/word/1637290396337/word/media/image1.jpeg",
          body:"11月15日上午，我院召开期中教学师生座谈会。座谈会由学院教学副院长罗达主持，各专业班级的班委代表参加会议。软件工程系主任刘文果、软件工程系副主任张福勇、网络工程系主任周坤晓、网络空间安全系副主任李新出席会议。",
          id:"1"
        }
      })
     }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})