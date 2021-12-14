// pages/lights_detail/lights_detail.js
const app = getApp()
const db = wx.cloud.database(); //初始化数据库
const mylights = db.collection('lights')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist:[],
    name:"",
    describe:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    mylights.doc(options.id).get().then(res=>{
      //拿到res=option.id后用setData渲染到界面
      // console.log(res)
      this.setData({
        name: res.data.name,
        imglist:res.data.imglist,
        describe: res.data.describe
      })
    })
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